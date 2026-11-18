import pytest
from sqlalchemy.exc import SQLAlchemyError

from frontend.app import create_app
from backend import db
from backend.models import Barber, Service


@pytest.fixture()
def client(tmp_path):
    app = create_app(
        {
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "sqlite://",
            "SECRET_KEY": "test-key",
            "UPLOAD_FOLDER": str(tmp_path / "uploads"),
            "API_BASE_URL": "https://barbershop-backend-nqkt.onrender.com/api",
        }
    )
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()


def test_home_serves_frontend_with_database_bootstrap(client):
    with client.application.app_context():
        service = Service(
            name="Classic Cut",
            duration_minutes=30,
            price=25,
            active=True,
        )
        barber = Barber(name="Jordan Barber", initials="JB", rating=4.8)
        barber.services.append(service)
        db.session.add(barber)
        db.session.commit()

    response = client.get("/")

    assert response.status_code == 200
    assert response.mimetype == "text/html"
    assert b'id="cj-bootstrap" type="application/json"' in response.data
    assert b"Classic Cut" in response.data


def test_frontend_uses_configured_api_and_serves_assets(client):
    page = client.get("/")
    script = client.get("/static/js/app.js")

    assert b'window.API_BASE_URL = "https://barbershop-backend-nqkt.onrender.com/api"' in page.data
    assert script.status_code == 200
    assert b"const apiUrl = API_BASE_URL ? `${API_BASE_URL}${path}` : `/api${path}`;" in script.data
    assert b"credentials: API_CREDENTIALS" in script.data


def test_home_shows_storefront_and_notice_when_catalog_is_unavailable(
    client, monkeypatch
):
    def unavailable_catalog():
        raise SQLAlchemyError("database unavailable")

    monkeypatch.setattr("frontend.app.load_catalog", unavailable_catalog)

    response = client.get("/")

    assert response.status_code == 200
    assert b'id="root"' in response.data
    assert b'role="alert"' in response.data
    assert b"The catalog is temporarily unavailable." in response.data
