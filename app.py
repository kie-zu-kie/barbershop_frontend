import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from flask import current_app, render_template
from jinja2 import FileSystemLoader
from sqlalchemy.exc import SQLAlchemyError

PROJECT_ROOT = Path(__file__).resolve().parent.parent
BACKEND_ROOT = PROJECT_ROOT / "backend"
FRONTEND_ROOT = PROJECT_ROOT / "frontend"

load_dotenv(PROJECT_ROOT / ".env")
load_dotenv(FRONTEND_ROOT / ".env")
sys.path.insert(0, str(BACKEND_ROOT))

from backend import create_app as create_backend_app, db
from backend.routes import load_catalog


def create_app(test_config=None):
    app = create_backend_app(test_config)
    api_base_url = app.config.get("API_BASE_URL")
    if api_base_url is None:
        api_base_url = os.environ.get("API_BASE_URL", "")
    app.config["API_BASE_URL"] = str(api_base_url).strip().rstrip("/")
    app.template_folder = str(FRONTEND_ROOT / "templates")
    app.static_folder = str(FRONTEND_ROOT / "static")
    app.jinja_loader = FileSystemLoader(app.template_folder)

    if "pages.home" not in app.view_functions:
        raise RuntimeError("The backend home route is unavailable.")

    def home():
        try:
            bootstrap = load_catalog()
            catalog_error = None
        except SQLAlchemyError:
            db.session.rollback()
            current_app.logger.exception("Could not load storefront catalog")
            bootstrap = {"services": [], "barbers": [], "appointments": []}
            catalog_error = (
                "The catalog is temporarily unavailable. Please try again later."
            )
        return render_template(
            "index.html",
            bootstrap=bootstrap,
            catalog_error=catalog_error,
        )

    app.view_functions["pages.home"] = home
    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=int(os.environ.get("PORT", "5000")),
    )
