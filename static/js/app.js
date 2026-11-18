const { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext, useReducer } = React;

/* ============================== ICONS ============================== */
const Icon = ({ path, size = 18, className = "", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
);
const icons = {
  home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  scissors: <><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><path d="m8.5 8-1.7 1.5M8.5 16l-1.7-1.5M20 5 9 15M20 19 9 13"/></>,
  user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/></>,
  bell: <><path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z"/><path d="M10 18.5a2 2 0 0 0 4 0"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"/></>,
  check: <path d="M5 13l4 4L19 7"/>,
  x: <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
  star: <path d="m12 3 2.8 5.9 6.4.8-4.7 4.5 1.2 6.3L12 17.6 6.3 20.5l1.2-6.3-4.7-4.5 6.4-.8Z"/>,
  chevronLeft: <path d="M15 18l-6-6 6-6"/>,
  chevronRight: <path d="M9 18l6-6-6-6"/>,
  chevronDown: <path d="M6 9l6 6 6-6"/>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
  trash: <><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14"/></>,
  logout: <><path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  pin: <><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></>,
  phone: <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20.5c0 .6-.4 1-1 1C11 21.5 2.5 13 2.5 4.5c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8Z"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
  bag: <><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M2.5 19c1-3 3.4-4.6 6.5-4.6S14.5 16 15.5 19"/><circle cx="17" cy="9" r="2.3"/><path d="M17.5 14.4c1.9.3 3.3 1.6 4 3.6"/></>,
  chart: <><path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/><path d="M3 20h18"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v5h1"/></>,
  spinner: <path d="M12 3a9 9 0 1 0 9 9"/>,
  note: <><path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M15 3v4h4"/><path d="M9 13h6M9 17h6"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  arrowLeft: <><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></>,
};
const Ic = (name, props={}) => <Icon path={icons[name]} {...props} />;

/* ============================== MOCK DATA ============================== */
const DEFAULT_SERVICES = [
  { id: 's1', name: 'Low Fade', duration: 30, price: 28, description: 'Precision scissor or clipper cut, tailored to your style and finished with a hot-towel neck shave.' },
  { id: 's2', name: 'Low Taper Fade', duration: 40, price: 35, description: 'Sharp, seamless fade blended by hand — from bald skin fade to a soft taper.' },
  { id: 's3', name: 'High Fade', duration: 20, price: 18, description: 'Shape and tighten your beard line with straight-razor detailing.' },
  { id: 's4', name: 'High Taper Fade', duration: 45, price: 38, description: 'A traditional straight-razor shave with hot towels and pre-shave oil.' },
  { id: 's5', name: 'Mid Fade', duration: 55, price: 48, description: 'Full haircut paired with a beard trim and line-up — our most popular package.' },
  { id: 's6', name: 'Edgar Cut', duration: 35, price: 32, description: 'Deep-cleansing scalp massage and conditioning treatment.' },
  { id: 's7', name: "Mullet Cut", duration: 25, price: 20, description: 'A relaxed, patient cut for younger guests, ages 12 and under.' },
];

const DEFAULT_BARBERS = [
  { id: 'b1', name: 'Carl Joseph', initials: 'MR', specialty: 'Skin Fades & Tapers', rating: 4.9, reviews: 182, years: 9, bio: 'Marcus built his reputation on razor-sharp fades and a steady hand. Nine years behind the chair, and he still sketches every hairline before he cuts it.', color: 'bg-gold/90', services: ['s1','s2','s3','s5','s6'] },
  { id: 'b2', name: 'Jayson Samante', initials: 'DS', specialty: 'Classic Cuts & Hot Towel Shaves', rating: 4.8, reviews: 141, years: 12, bio: 'A student of old-school barbering, Diego learned the straight razor from his father. Come for the shave, stay for the stories.', color: 'bg-danger/80', services: ['s1','s3','s4','s5','s7'] },
  { id: 'b3', name: 'Zenon Suhayon', initials: 'IC', specialty: 'Modern Styles & Texture Cuts', rating: 5.0, reviews: 97, years: 6, bio: 'Ines trained in London before joining Fade & Steel. She specialises in textured crops and modern silhouettes with clean, wearable lines.', color: 'bg-success/80', services: ['s1','s2','s5','s6','s7'] },
  { id: 'b4', name: 'Mark Johnson', initials: 'OC', specialty: 'Beard Sculpting', rating: 4.7, reviews: 76, years: 8, bio: 'If it grows on your face, Owen has an opinion about it. Precision beard work with an eye for proportion and face shape.', color: 'bg-pending/80', services: ['s2','s3','s4','s5'] },
];
const bootstrapElement = document.getElementById('cj-bootstrap');
const bootstrapData = bootstrapElement ? JSON.parse(bootstrapElement.textContent) : {};
const apiConfigElement = document.getElementById('cj-api-config');
const apiConfig = apiConfigElement ? JSON.parse(apiConfigElement.textContent) : {};
const API_BASE_URL = (apiConfig.apiBaseUrl || '').replace(/\/+$/, '');
const API_CREDENTIALS = API_BASE_URL
  && new URL(API_BASE_URL, window.location.href).origin !== window.location.origin
  ? 'include'
  : 'same-origin';
async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const apiUrl = API_BASE_URL ? `${API_BASE_URL}${path}` : `/api${path}`;
  const response = await fetch(apiUrl, {
    credentials: API_CREDENTIALS,
    ...options,
    headers: {
      ...(options.body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return payload;
}
const SERVICES = Array.isArray(bootstrapData.services)
  ? bootstrapData.services
  : DEFAULT_SERVICES;
const BARBERS = Array.isArray(bootstrapData.barbers)
  ? bootstrapData.barbers
  : DEFAULT_BARBERS;

const WORKING_HOURS = {
  Mon: { off: false, start: '09:00', end: '19:00' },
  Tue: { off: false, start: '09:00', end: '19:00' },
  Wed: { off: false, start: '09:00', end: '19:00' },
  Thu: { off: false, start: '09:00', end: '20:00' },
  Fri: { off: false, start: '09:00', end: '20:00' },
  Sat: { off: false, start: '08:00', end: '17:00' },
  Sun: { off: true, start: '', end: '' },
};

const TIME_SLOTS_TEMPLATE = ['09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];

function isoDate(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
function shiftDate(days){ const d = new Date(TODAY); d.setDate(d.getDate()+days); return isoDate(d.getFullYear(), d.getMonth(), d.getDate()); }
function fmtDate(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function fmtDateLong(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
function fmtTime12(t){
  const [h,m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2,'0')} ${period}`;
}
const formatPrice = price => new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
}).format(Number(price));

const INITIAL_APPOINTMENTS = Array.isArray(bootstrapData.appointments)
  ? bootstrapData.appointments
  : [];

/* ============================== APP CONTEXT ============================== */
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

function statusMeta(status){
  const map = {
    Pending: { color: 'text-pending', bg: 'bg-pending/15', ring: 'ring-pending/30', dot: 'bg-pending' },
    Confirmed: { color: 'text-success', bg: 'bg-success/15', ring: 'ring-success/30', dot: 'bg-success' },
    Completed: { color: 'text-gold-bright', bg: 'bg-gold/15', ring: 'ring-gold/30', dot: 'bg-gold' },
    Cancelled: { color: 'text-cream-muted', bg: 'bg-charcoal-700/60', ring: 'ring-charcoal-600/50', dot: 'bg-cream-muted' },
    'No-show': { color: 'text-danger', bg: 'bg-danger/15', ring: 'ring-danger/30', dot: 'bg-danger' },
  };
  return map[status] || map.Pending;
}

/* ============================== UI PRIMITIVES ============================== */
function Badge({ status }) {
  const m = statusMeta(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${m.bg} ${m.color} ${m.ring}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`}></span>
      {status}
    </span>
  );
}

function Button({ children, variant = 'primary', size = 'md', className = '', icon, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-colors rounded-btn focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'text-sm px-3 py-1.5', md: 'text-sm px-4 py-2.5', lg: 'text-base px-6 py-3' };
  const variants = {
    primary: 'bg-gold text-charcoal-950 hover:bg-gold-bright',
    secondary: 'bg-charcoal-800 text-cream border border-charcoal-600 hover:border-gold/60 hover:text-gold-bright',
    ghost: 'text-cream-muted hover:text-cream hover:bg-charcoal-800',
    danger: 'bg-danger/90 text-cream hover:bg-danger',
    dangerGhost: 'text-danger border border-danger/40 hover:bg-danger/10',
    successGhost: 'text-success border border-success/40 hover:bg-success/10',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {icon}{children}
    </button>
  );
}

function Card({ children, className = '', as = 'div', ...props }) {
  const Tag = as;
  return <Tag className={`bg-charcoal-900 border border-charcoal-700/70 rounded-card ${className}`} {...props}>{children}</Tag>;
}

function Field({ label, children, hint, error, required }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-cream-muted mb-1.5">{label}{required && <span className="text-gold ml-0.5">*</span>}</span>
      {children}
      {hint && !error && <span className="block text-xs text-cream-dim mt-1">{hint}</span>}
      {error && <span className="block text-xs text-danger mt-1">{error}</span>}
    </label>
  );
}

function Input({ className = '', ...props }) {
  return <input className={`w-full rounded-btn px-3.5 py-2.5 text-sm text-cream ${className}`} {...props} />;
}
function Textarea(props) {
  return <textarea className="w-full rounded-btn px-3.5 py-2.5 text-sm text-cream resize-none" {...props} />;
}
function Select({ children, className = '', selectClassName = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select className={`w-full appearance-none rounded-btn px-3.5 py-2.5 text-sm text-cream pr-9 ${selectClassName}`} {...props}>{children}</select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream-muted">{Ic('chevronDown', { size: 16 })}</div>
    </div>
  );
}

function Avatar({ initials, color = 'bg-gold/90', size = 'md', src = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-11 h-11 text-sm', lg: 'w-16 h-16 text-lg', xl: 'w-24 h-24 text-2xl' };
  const backgroundColor = /^#[\da-f]{3,8}$/i.test(color) ? color : undefined;
  return (
    <div style={backgroundColor ? { backgroundColor } : undefined} className={`${sizes[size]} ${backgroundColor ? '' : color} rounded-full flex items-center justify-center font-display font-semibold text-charcoal-950 shrink-0 overflow-hidden`}>
      {src ? <img src={src} alt="" className="w-full h-full object-cover" /> : initials}
    </div>
  );
}

function EmptyState({ icon = 'calendar', title, body, action }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-full bg-charcoal-800 flex items-center justify-center text-gold mb-4">
        {Ic(icon, { size: 24 })}
      </div>
      <p className="font-display text-lg text-cream mb-1">{title}</p>
      <p className="text-sm text-cream-muted max-w-xs mb-5">{body}</p>
      {action}
    </div>
  );
}

function Skeleton({ className }) {
  return <div className={`skeleton rounded-btn ${className}`}></div>;
}

/* ---- Toasts ---- */
const ToastContext = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3800);
  }, []);
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-[100] flex flex-col gap-2 items-end" style={{paddingTop: 'env(safe-area-inset-top, 0px)'}}>
        {toasts.map(t => (
          <div key={t.id} className={`toast-in w-full sm:w-80 flex items-start gap-3 px-4 py-3 rounded-card shadow-lg border bg-charcoal-800 border-charcoal-600 text-cream`}>
            <div className={`mt-0.5 ${t.type === 'error' ? 'text-danger' : t.type === 'info' ? 'text-gold' : 'text-success'}`}>
              {Ic(t.type === 'error' ? 'x' : t.type === 'info' ? 'info' : 'check', { size: 18 })}
            </div>
            <p className="text-sm flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-cream-dim hover:text-cream focus-ring rounded">{Ic('x', { size: 15 })}</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
const useToast = () => useContext(ToastContext);

/* ---- Modal ---- */
function Modal({ open, onClose, title, children, maxW = 'max-w-md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm animate-in" onClick={onClose}></div>
      <div className={`relative w-full ${maxW} bg-charcoal-900 border border-charcoal-700 rounded-t-card sm:rounded-card p-6 animate-in max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-cream">{title}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="text-cream-muted hover:text-cream focus-ring rounded p-1">{Ic('x', { size: 18 })}</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({ open, onClose, onConfirm, title, body, confirmLabel = 'Confirm', variant = 'danger', loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-cream-muted mb-6">{body}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onClose}>Never mind</Button>
        <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} disabled={loading}>
          {loading ? <>{Ic('spinner', { size: 15, className: 'animate-spin' })}Working…</> : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

/* ============================== PUBLIC NAV / FOOTER ============================== */
function LogoMark({ className = '' }) {
  return <img src="/static/images/barber-logo.png" alt="Barber pole and scissors emblem" className={`object-contain select-none ${className}`} />;
}

function PublicNav({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Barbers', href: '#barbers' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];
  return (
    <header className="sticky top-0 z-40 bg-charcoal-950/90 backdrop-blur border-b border-charcoal-700/60" style={{paddingTop: 'env(safe-area-inset-top, 0px)'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-12 w-12" />
          <span className="font-display text-lg text-cream">Fade &amp; Steel</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-cream-muted">
          {links.map(l => <a key={l.href} href={l.href} className="hover:text-gold-bright transition-colors focus-ring rounded">{l.label}</a>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('login')}>Sign in</Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('login')}>Book now</Button>
        </div>
        <button className="md:hidden text-cream focus-ring rounded p-1" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {Ic(open ? 'x' : 'menu', { size: 22 })}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-charcoal-700/60 px-5 py-4 flex flex-col gap-4 animate-in">
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-cream-muted text-sm">{l.label}</a>)}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => onNavigate('login')}>Sign in</Button>
            <Button variant="primary" size="sm" className="flex-1" onClick={() => onNavigate('login')}>Book now</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-charcoal-700/60 bg-charcoal-900/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <LogoMark className="h-12 w-12" />
              <span className="font-display text-lg text-cream">Fade &amp; Steel</span>
            </div>
          </div>
          <p className="text-sm text-cream-muted max-w-xs">Neighbourhood barbering, done properly. Walk-ins welcome; appointments preferred.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-cream mb-3">Visit us</p>
          <ul className="space-y-2.5 text-sm text-cream-muted">
            <li className="flex items-center gap-2">{Ic('pin', { size: 15, className: 'text-gold shrink-0' })}Alegria, Carmen, Bohol</li>
            <li className="flex items-center gap-2">{Ic('clock', { size: 15, className: 'text-gold shrink-0' })}Mon–Sat, 9am–7pm · Closed Sundays</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cream mb-3">Get in touch</p>
          <ul className="space-y-2.5 text-sm text-cream-muted">
            <li className="flex items-center gap-2">{Ic('phone', { size: 15, className: 'text-gold shrink-0' })}(555) 402-8890</li>
            <li className="flex items-center gap-2">{Ic('mail', { size: 15, className: 'text-gold shrink-0' })}hello@cjcuts.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal-700/60 py-5 text-center text-xs text-cream-dim">© 2026 C J Cuts. All rights reserved.</div>
    </footer>
  );
}

/* ============================== LANDING PAGE ============================== */
function StarRow({ rating, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {[1,2,3,4,5].map(i => (
        <Icon key={i} path={icons.star} size={size} strokeWidth={0} className={i <= Math.round(rating) ? 'fill-current' : 'fill-current opacity-25'} />
      ))}
    </div>
  );
}

function Landing({ onNavigate }) {
  const testimonials = [
    { name: 'Adrian R.', quote: "Marcus remembered exactly how I like my fade after one visit. Haven't gone anywhere else since.", rating: 5 },
    { name: 'Edward M.', quote: 'The hot towel shave is worth the trip alone. Booking online took thirty seconds.', rating: 5 },
    { name: 'Jellen T.', quote: 'Ines gave my son his first real haircut and he actually asked to go back.', rating: 5 },
  ];
  return (
    <div>
      <PublicNav onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-charcoal-700/60">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'repeating-linear-gradient(115deg, #B59A66 0px, #B59A66 1px, transparent 1px, transparent 90px)'}}></div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-sm font-semibold mb-4">Riverside's neighbourhood barbershop</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-cream mb-6">
              A sharp cut,<br/>on your own time.
            </h1>
            <div className="razor-divider mb-6"></div>
            <p className="text-cream-muted text-base sm:text-lg max-w-md mb-8">
              Book a chair with one of our {BARBERS.length} barbers in under a minute. No calls, no waiting room guesswork — just pick a time that works.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => onNavigate('login')}>Book an appointment</Button>
              <Button size="lg" variant="secondary" onClick={() => { document.getElementById('barbers')?.scrollIntoView({behavior:'smooth'}); }}>Meet the barbers</Button>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-cream-muted">
              <div><span className="font-display text-2xl text-cream block">4.9</span>average rating</div>
              <div className="w-px h-10 bg-charcoal-700"></div>
              <div><span className="font-display text-2xl text-cream block">12k+</span>cuts given</div>
              <div className="w-px h-10 bg-charcoal-700"></div>
              <div><span className="font-display text-2xl text-cream block">9 yrs</span>on Harbor Lane</div>
            </div>
          </div>
          <Card className="p-6 sm:p-8">
            <p className="text-sm font-semibold text-cream-muted mb-4">Today at Fade &amp; Steel</p>
            <div className="space-y-3">
              {[{t:'9:00 AM', s:'Classic Haircut', b:'Marcus Reyes', st:'Confirmed'},{t:'11:30 AM', s:'Cut &amp; Beard Combo', b:'Marcus Reyes', st:'Pending'},{t:'2:00 PM', s:'Hot Towel Shave', b:'Diego Santos', st:'Confirmed'}].map((x,i)=>(
                <div key={i} className="flex items-center gap-3 p-3 rounded-btn bg-charcoal-800/70 border border-charcoal-700/60">
                  <div className="text-center w-14 shrink-0">
                    <p className="text-xs text-cream-muted">{x.t.split(' ')[1]}</p>
                    <p className="font-display text-sm text-gold-bright">{x.t.split(' ')[0]}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream truncate" dangerouslySetInnerHTML={{__html:x.s}}></p>
                    <p className="text-xs text-cream-muted truncate">with {x.b}</p>
                  </div>
                  <Badge status={x.st} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-lg mb-10">
          <p className="text-gold text-sm font-semibold mb-2">What we do</p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream mb-3">Every service, one chair.</h2>
          <p className="text-cream-muted">From a quick line-up to a full traditional shave — priced plainly, booked easily.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(s => (
            <Card key={s.id} className="p-5 hover:border-gold/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg text-cream">{s.name}</h3>
                <span className="font-display text-lg text-gold-bright shrink-0 ml-3">{formatPrice(s.price)}</span>
              </div>
              <p className="text-sm text-cream-muted mb-3">{s.description}</p>
              <p className="text-xs text-cream-dim flex items-center gap-1.5">{Ic('clock', { size: 13 })}{s.duration} min</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Barbers */}
      <section id="barbers" className="bg-charcoal-900/50 border-y border-charcoal-700/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-lg mb-10">
            <p className="text-gold text-sm font-semibold mb-2">Behind the chair</p>
            <h2 className="font-display text-3xl sm:text-4xl text-cream mb-3">Meet the barbers.</h2>
            <p className="text-cream-muted">Four distinct specialties, one shared standard for detail.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BARBERS.map(b => (
              <Card key={b.id} className="p-5 text-center">
                <Avatar initials={b.initials} color={b.color} src={b.avatarUrl} size="xl" />
                <h3 className="font-display text-lg text-cream mt-4">{b.name}</h3>
                <p className="text-xs text-gold-bright mb-2">{b.specialty}</p>
                <div className="flex items-center justify-center gap-1.5 mb-3">
                  <StarRow rating={b.rating} />
                  <span className="text-xs text-cream-muted">{b.rating} ({b.reviews})</span>
                </div>
                <Button variant="secondary" size="sm" className="w-full" onClick={() => onNavigate('login')}>View &amp; book</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-lg mb-10">
          <p className="text-gold text-sm font-semibold mb-2">Word around town</p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream mb-3">What regulars say.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t,i) => (
            <Card key={i} className="p-6">
              <StarRow rating={t.rating} />
              <p className="text-cream text-sm mt-4 mb-5 leading-relaxed">"{t.quote}"</p>
              <p className="text-sm font-semibold text-cream-muted">{t.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
        <Card className="p-10 sm:p-14 text-center bg-gradient-to-br from-charcoal-800 to-charcoal-900">
          <h2 className="font-display text-3xl sm:text-4xl text-cream mb-4">Ready for your next cut?</h2>
          <p className="text-cream-muted mb-7 max-w-md mx-auto">Pick your barber, pick your time — we'll have the chair warm.</p>
          <Button size="lg" onClick={() => onNavigate('login')}>Book an appointment</Button>
        </Card>
      </section>

      <Footer />
    </div>
  );
}

/* ============================== AUTH ============================== */
function AuthShell({ children, onClose }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'repeating-linear-gradient(115deg, #B59A66 0px, #B59A66 1px, transparent 1px, transparent 90px)'}}></div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Back to home"
        title="Back to home"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-700 bg-charcoal-900/90 text-cream-muted transition-colors hover:border-gold/60 hover:bg-charcoal-800 hover:text-gold-bright focus-ring"
      >
        <span aria-hidden="true" className="text-2xl leading-none">×</span>
      </button>
      <div className="w-full max-w-md relative">{children}</div>
    </div>
  );
}

function AuthPage({ onLogin, onClose, initialMode = 'login' }) {
  const [role, setRole] = useState('customer');
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const validate = () => {
    const e = {};
    if (mode === 'register' && !form.name.trim()) e.name = 'Enter your full name.';
    if (!form.email.trim()) e.email = 'Enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password || form.password.length < (mode === 'register' ? 8 : 1)) e.password = mode === 'register' ? 'Password must be at least 8 characters.' : 'Enter your password.';
    if (role === 'barber' && mode === 'register' && form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const endpoint = role === 'barber'
        ? mode === 'register' ? '/barber/auth/register' : '/barber/auth/login'
        : mode === 'login' ? '/auth/login' : '/auth/register';
      const credentials = { ...form };
      delete credentials.confirmPassword;
      const result = await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      toast(role === 'barber' && mode === 'register'
        ? 'Barber account created successfully.'
        : mode === 'login' ? 'Signed in successfully.' : 'Account created — welcome to Fade & Steel.');
      onLogin(role, role === 'barber' ? result.barber : result.customer);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell onClose={onClose}>
      <div className="text-center mb-8">
        <LogoMark className="w-20 h-20 mx-auto mb-3" />
        <h1 className="font-display text-2xl text-cream">Fade &amp; Steel</h1>
        <p className="text-sm text-cream-muted mt-1">
          {role === 'barber' ? 'Sign in to manage your barber profile and haircut gallery.' : 'Sign in or create a customer account.'}
        </p>
      </div>

      <Card className="p-6 sm:p-7">
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-charcoal-800 rounded-btn">
          {['customer','barber'].map(r => (
            <button key={r} onClick={() => { setRole(r); if (r === 'barber') setMode('login'); }}
              className={`py-2 rounded-btn text-sm font-semibold capitalize transition-colors focus-ring ${role === r ? 'bg-gold text-charcoal-950' : 'text-cream-muted hover:text-cream'}`}>
              {r}
            </button>
          ))}
        </div>

        <div className="flex gap-5 mb-6 text-sm border-b border-charcoal-700">
          <button onClick={() => setMode('login')} className={`pb-3 -mb-px border-b-2 font-semibold focus-ring ${mode === 'login' ? 'border-gold text-cream' : 'border-transparent text-cream-muted'}`}>Sign in</button>
          <button onClick={() => setMode('register')} className={`pb-3 -mb-px border-b-2 font-semibold focus-ring ${mode === 'register' ? 'border-gold text-cream' : 'border-transparent text-cream-muted'}`}>
            {role === 'barber' ? 'Create barber account' : 'Create account'}
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4" noValidate>
          {mode === 'register' && (
            <Field label="Full name" required error={errors.name}>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={role === 'barber' ? 'Your name' : 'Alex Rivera'} autoComplete="name" />
            </Field>
          )}
          <Field label="Email address" required error={errors.email}>
            <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder={role === 'barber' ? 'barber@fadeandsteel.com' : 'you@email.com'} autoComplete="email" />
          </Field>
          <Field label="Password" required error={errors.password} hint={mode === 'register' ? 'Use at least 8 characters.' : undefined}>
            <Input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} />
          </Field>
          {role === 'barber' && mode === 'register' && (
            <Field label="Confirm password" required error={errors.confirmPassword}>
              <Input type="password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} placeholder="Re-enter your password" autoComplete="new-password" />
            </Field>
          )}
          {errors.submit && <p className="text-sm text-danger" role="alert">{errors.submit}</p>}
          {mode === 'login' && role === 'customer' && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-gold hover:text-gold-bright focus-ring rounded">Forgot password?</button>
            </div>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <>{Ic('spinner', { size: 16, className: 'animate-spin' })}Please wait…</> : mode === 'login' ? `Sign in as ${role}` : role === 'barber' ? 'Create barber account' : 'Create account'}
          </Button>
        </form>
      </Card>
      <p className="text-center text-xs text-cream-dim mt-5">
        {role === 'barber' ? 'Create your barber profile to share your work and manage your gallery.' : 'Customer accounts and bookings are saved securely to the database.'}
      </p>
    </AuthShell>
  );
}

/* ============================== DASHBOARD SHELL ============================== */
function DashboardShell({ role, active, onNav, onLogout, title, subtitle, children, customer, barber }) {
  const customerNav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'browse', label: 'Browse barbers', icon: 'search' },
    { id: 'haircuts', label: 'Haircuts', icon: 'scissors' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];
  const barberNav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'haircuts', label: 'Haircut gallery', icon: 'scissors' },
    { id: 'services', label: 'Services', icon: 'scissors' },
    { id: 'availability', label: 'Availability', icon: 'clock' },
    { id: 'profile', label: 'Account', icon: 'settings' },
  ];
  const nav = role === 'barber' ? barberNav : customerNav;
  const mobileNav = nav.slice(0, 4);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 shrink-0 border-r border-charcoal-700/60 bg-charcoal-900/60 flex-col">
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-charcoal-700/60">
          <LogoMark className="w-12 h-12 shrink-0" />
          <span className="font-display text-base text-cream">Fade &amp; Steel</span>
        </div>
        <nav className="flex-1 py-5 px-3 space-y-1">
          {nav.map(item => (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-colors focus-ring border-l-2 ${
                active === item.id ? 'bg-charcoal-800 text-gold-bright border-gold' : 'text-cream-muted border-transparent hover:text-cream hover:bg-charcoal-800/60'
              }`}>
              {Ic(item.icon, { size: 17 })}{item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-charcoal-700/60">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium text-cream-muted hover:text-danger hover:bg-danger/10 transition-colors focus-ring">
            {Ic('logout', { size: 17 })}Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-charcoal-700/60 bg-charcoal-950/90 backdrop-blur flex items-center justify-between px-5 sm:px-8 sticky top-0 z-30" style={{paddingTop: 'env(safe-area-inset-top, 0px)'}}>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-xl text-cream truncate">{title}</h1>
            {subtitle && <p className="text-xs text-cream-muted truncate">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNav('profile')}
              aria-label="Open account page"
              title="Open account page"
              className="rounded-full focus-ring"
            >
              <Avatar initials={role === 'barber' ? barber?.initials || '' : customer?.avatarInitials || ''} color={barber?.color} src={role === 'barber' ? barber?.avatarUrl : customer?.avatarUrl} size="md" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 sm:px-8 py-6 sm:py-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-charcoal-900/95 backdrop-blur border-t border-charcoal-700/60 flex" style={{paddingBottom: 'env(safe-area-inset-bottom, 0px)'}}>
        {mobileNav.map(item => (
          <button key={item.id} onClick={() => onNav(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium focus-ring ${active === item.id ? 'text-gold-bright' : 'text-cream-muted'}`}>
            {Ic(item.icon, { size: 19 })}{item.label.split(' ')[0]}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ============================== CUSTOMER: DASHBOARD ============================== */
function CustomerDashboard({ onNav, loading }) {
  const { appointments, customer } = useApp();
  const upcoming = appointments
    .filter(a => a.customerId === customer.id && ['Pending','Confirmed'].includes(a.status) && a.date >= shiftDate(0))
    .sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
  const nextAppt = upcoming[0];
  const history = appointments.filter(a => a.customerId === customer.id && ['Completed','Cancelled','No-show'].includes(a.status));

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid sm:grid-cols-3 gap-4"><Skeleton className="h-24" /><Skeleton className="h-24" /><Skeleton className="h-24" /></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Welcome back, {customer.name.split(' ')[0]}.</h2>
        <p className="text-cream-muted text-sm">Here's what's on the books.</p>
      </div>

      {nextAppt ? (
        <Card className="p-6 sm:p-7 bg-gradient-to-br from-charcoal-800 to-charcoal-900">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              <Avatar initials={BARBERS.find(b=>b.id===nextAppt.barberId).initials} color={BARBERS.find(b=>b.id===nextAppt.barberId).color} src={BARBERS.find(b=>b.id===nextAppt.barberId).avatarUrl} size="lg" />
              <div>
                <p className="text-xs text-gold-bright font-semibold mb-0.5">Your next appointment</p>
                <p className="font-display text-lg text-cream">{SERVICES.find(s=>s.id===nextAppt.serviceId).name}</p>
                <p className="text-sm text-cream-muted">{fmtDateLong(nextAppt.date)} · {fmtTime12(nextAppt.time)} with {BARBERS.find(b=>b.id===nextAppt.barberId).name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge status={nextAppt.status} />
              <Button variant="secondary" size="sm" onClick={() => onNav('appointment-detail', nextAppt.id)}>View</Button>
            </div>
          </div>
        </Card>
      ) : (
        <EmptyState icon="calendar" title="No upcoming appointments" body="Ready for your next cut? Browse our barbers and grab a time that suits you."
          action={<Button onClick={() => onNav('browse')}>Book an appointment</Button>} />
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs text-cream-muted mb-1">Upcoming</p>
          <p className="font-display text-3xl text-cream">{upcoming.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-cream-muted mb-1">Visits completed</p>
          <p className="font-display text-3xl text-cream">{history.filter(h=>h.status==='Completed').length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-cream-muted mb-1">Member since</p>
          <p className="font-display text-3xl text-cream">{customer.memberSince ? new Date(`${customer.memberSince}T00:00:00`).getFullYear() : '—'}</p>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-cream">Booking history</h3>
          <button onClick={() => onNav('appointments')} className="text-sm text-gold hover:text-gold-bright focus-ring rounded">View all</button>
        </div>
        <Card className="divide-y divide-charcoal-700/60">
          {history.length === 0 ? <EmptyState icon="note" title="No history yet" body="Past appointments will appear here once you've had your first visit." /> :
            history.slice(0,4).map(a => (
              <button key={a.id} onClick={() => onNav('appointment-detail', a.id)} className="w-full flex items-center gap-4 p-4 hover:bg-charcoal-800/40 transition-colors text-left focus-ring">
                <Avatar initials={BARBERS.find(b=>b.id===a.barberId).initials} color={BARBERS.find(b=>b.id===a.barberId).color} src={BARBERS.find(b=>b.id===a.barberId).avatarUrl} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream truncate">{SERVICES.find(s=>s.id===a.serviceId).name}</p>
                  <p className="text-xs text-cream-muted">{fmtDate(a.date)} with {BARBERS.find(b=>b.id===a.barberId).name}</p>
                </div>
                <Badge status={a.status} />
              </button>
            ))}
        </Card>
      </div>
    </div>
  );
}

/* ============================== CUSTOMER: BROWSE BARBERS ============================== */
function BrowseBarbers({ onSelectBarber, loading }) {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const specialties = ['all', ...new Set(BARBERS.map(b => b.specialty))];
  const filtered = BARBERS.filter(b =>
    (specialty === 'all' || b.specialty === specialty) &&
    (b.name.toLowerCase().includes(query.toLowerCase()) || b.specialty.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Browse barbers</h2>
        <p className="text-cream-muted text-sm">Compare specialties, ratings, and pricing before you book.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-dim">{Ic('search', { size: 16 })}</div>
          <Input
            aria-label="Search barbers by name or specialty"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or specialty"
            className="barber-filter-input pl-11"
          />
        </div>
        <Select
          aria-label="Filter barbers by specialty"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className="sm:w-64"
          selectClassName="barber-filter-select"
        >
          {specialties.map(s => <option key={s} value={s}>{s === 'all' ? 'All specialties' : s}</option>)}
        </Select>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-40" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon="search" title="No barbers match" body="Try a different search term or clear your filters." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(b => (
            <Card key={b.id} className="p-5 hover:border-gold/50 transition-colors">
              <div className="flex gap-4">
                <Avatar initials={b.initials} color={b.color} src={b.avatarUrl} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-cream">{b.name}</h3>
                  <p className="text-xs text-gold-bright mb-1.5">{b.specialty}</p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <StarRow rating={b.rating} />
                    <span className="text-xs text-cream-muted">{b.rating} · {b.reviews} reviews · {b.years} yrs</span>
                  </div>
                  <p className="text-xs text-cream-muted line-clamp-2 mb-3">{b.bio}</p>
                  <Button size="sm" onClick={() => onSelectBarber(b.id)}>View profile &amp; book</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomerHaircutGallery({ onBookHaircut }) {
  const [haircuts, setHaircuts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    apiRequest('/haircuts')
      .then(result => {
        if (active) setHaircuts(result);
      })
      .catch(requestError => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Haircuts</h2>
        <p className="text-cream-muted text-sm">Browse cuts shared by our barbers. Select a photo to book.</p>
      </div>
      {error ? (
        <p className="text-sm text-danger" role="alert">{error}</p>
      ) : loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(index => <Skeleton key={index} className="h-64" />)}
        </div>
      ) : haircuts.length === 0 ? (
        <EmptyState icon="scissors" title="No haircuts yet" body="Our barbers’ haircut photos will appear here." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {haircuts.map(haircut => (
            <button
              key={haircut.id}
              type="button"
              onClick={onBookHaircut}
              aria-label={`Book an appointment for ${haircut.title}`}
              className="overflow-hidden rounded-card border border-charcoal-700/70 bg-charcoal-900 text-left hover:border-gold/60 transition-colors focus-ring"
            >
              <img src={haircut.imageUrl} alt={haircut.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-display text-lg text-cream">{haircut.title}</h3>
                <p className="text-xs text-gold-bright mt-1">by {haircut.barberName}</p>
                {haircut.description && <p className="text-sm text-cream-muted mt-2 line-clamp-2">{haircut.description}</p>}
                <p className="text-xs text-gold mt-3">Book this haircut</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BarberProfileScreen({ barberId, onBack, onBook }) {
  const [barber, setBarber] = useState(() => BARBERS.find(x => x.id === barberId));
  const b = barber;
  const [services, setServices] = useState(() => SERVICES.filter(service => b?.services.includes(service.id)));
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [haircuts, setHaircuts] = useState([]);
  const [haircutsLoading, setHaircutsLoading] = useState(true);
  const [haircutsError, setHaircutsError] = useState('');
  const previewService = services[0];
  const previewDate = shiftDate(1);
  const [nextSlots, setNextSlots] = useState([]);
  const [availabilityError, setAvailabilityError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([apiRequest('/services'), apiRequest('/barbers')])
      .then(([serviceList, barberList]) => {
        if (!active) return;
        const currentBarber = barberList.find(item => item.id === barberId);
        setServices(currentBarber
          ? serviceList.filter(service => currentBarber.services.includes(service.id))
          : []);
        if (currentBarber) setBarber(currentBarber);
        setCatalogError('');
      })
      .catch(error => {
        if (active) setCatalogError(error.message);
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });
    return () => { active = false; };
  }, [barberId]);

  useEffect(() => {
    if (!previewService) return;
    let active = true;
    const query = new URLSearchParams({
      barberId,
      serviceId: previewService.id,
      date: previewDate,
    });
    apiRequest(`/availability?${query}`)
      .then(result => { if (active) setNextSlots(result.slots.slice(0, 6)); })
      .catch(error => { if (active) setAvailabilityError(error.message); });
    return () => { active = false; };
  }, [barberId, previewService?.id, previewDate]);

  useEffect(() => {
    let active = true;
    setHaircutsLoading(true);
    apiRequest(`/barbers/${barberId}/haircuts`)
      .then(result => {
        if (active) setHaircuts(result);
      })
      .catch(error => {
        if (active) setHaircutsError(error.message);
      })
      .finally(() => {
        if (active) setHaircutsLoading(false);
      });
    return () => { active = false; };
  }, [barberId]);

  return (
    <div className="space-y-6 animate-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-cream-muted hover:text-cream focus-ring rounded">{Ic('arrowLeft', { size: 15 })}Back to barbers</button>
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Avatar initials={b.initials} color={b.color} src={b.avatarUrl} size="xl" />
          <div className="flex-1">
            <h2 className="font-display text-2xl text-cream">{b.name}</h2>
            <p className="text-gold-bright text-sm mb-2">{b.specialty}</p>
            <div className="flex items-center gap-2 mb-4">
              <StarRow rating={b.rating} size={15} />
              <span className="text-sm text-cream-muted">{b.rating} · {b.reviews} reviews · {b.years} years experience</span>
            </div>
            <p className="text-sm text-cream-muted leading-relaxed max-w-lg">{b.bio}</p>
          </div>
          <Button size="lg" onClick={() => onBook(barberId)} className="w-full sm:w-auto shrink-0">Book with {b.name.split(' ')[0]}</Button>
        </div>
      </Card>

      <section>
        <h3 className="font-display text-lg text-cream mb-3">Recent haircuts</h3>
        {haircutsError ? (
          <p className="text-sm text-danger" role="alert">{haircutsError}</p>
        ) : haircutsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(index => <Skeleton key={index} className="h-56" />)}
          </div>
        ) : haircuts.length === 0 ? (
          <Card className="p-5">
            <p className="text-sm text-cream-muted">This barber hasn’t shared any haircut photos yet.</p>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {haircuts.map(haircut => (
              <Card key={haircut.id} className="overflow-hidden">
                <img src={haircut.imageUrl} alt={haircut.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-4">
                  <h4 className="font-medium text-cream">{haircut.title}</h4>
                  {haircut.description && <p className="text-sm text-cream-muted mt-1 whitespace-pre-line">{haircut.description}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div>
        <h3 className="font-display text-lg text-cream mb-3">Services offered</h3>
        {catalogError ? (
          <p className="text-sm text-danger" role="alert">{catalogError}</p>
        ) : catalogLoading ? (
          <p className="text-sm text-cream-muted">Loading services…</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-cream-muted">No services are currently offered by this barber.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map(s => (
              <Card key={s.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-cream font-medium">{s.name}</p>
                  <p className="text-xs text-cream-muted flex items-center gap-1 mt-0.5">{Ic('clock', { size: 12 })}{s.duration} min</p>
                </div>
                <span className="font-display text-gold-bright">{formatPrice(s.price)}</span>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg text-cream mb-3">Next available slots</h3>
        {!previewService ? <p className="text-sm text-cream-muted">No active services are assigned to this barber yet.</p> : (
          <>
            <p className="text-xs text-cream-muted mb-3">{previewService.name} · {fmtDate(previewDate)}</p>
            {availabilityError ? <p className="text-sm text-danger" role="alert">{availabilityError}</p> : nextSlots.length === 0 ? (
              <p className="text-sm text-cream-muted">No openings for this service tomorrow. Start a booking to check other dates.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {nextSlots.map(t => (
                  <button key={t} onClick={() => onBook(barberId, { serviceId: previewService.id, date: previewDate, time: t })} className="px-4 py-2 rounded-btn text-sm bg-charcoal-800 border border-charcoal-600 text-cream hover:border-gold hover:text-gold-bright transition-colors focus-ring">
                    {fmtTime12(t)}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function BarberHaircuts() {
  const { barber } = useApp();
  const [haircuts, setHaircuts] = useState([]);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [serviceTarget, setServiceTarget] = useState(null);
  const [serviceForm, setServiceForm] = useState({ duration: '', price: '' });
  const [serviceSaving, setServiceSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let active = true;
    apiRequest('/barber/haircuts')
      .then(result => {
        if (active) setHaircuts(result);
      })
      .catch(requestError => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    apiRequest('/barber/services')
      .then(result => {
        if (active) {
          setServices(result);
          setServicesError('');
        }
      })
      .catch(requestError => {
        if (active) setServicesError(requestError.message);
      })
      .finally(() => {
        if (active) setServicesLoading(false);
      });
    return () => { active = false; };
  }, []);

  const submit = async event => {
    event.preventDefault();
    if (!image) {
      setError('Choose a haircut photo to upload.');
      return;
    }
    setSaving(true);
    setError('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    try {
      const { haircut } = await apiRequest('/barber/haircuts', {
        method: 'POST',
        body: formData,
      });
      setHaircuts(list => [haircut, ...list]);
      setTitle('');
      setDescription('');
      setImage(null);
      event.target.reset();
      toast('Haircut added to your public gallery.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async haircut => {
    setError('');
    try {
      await apiRequest(`/barber/haircuts/${haircut.id}`, { method: 'DELETE' });
      setHaircuts(list => list.filter(item => item.id !== haircut.id));
      toast('Haircut removed from your gallery.');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const openServiceForm = haircut => {
    setServiceTarget(haircut);
    setServiceForm({ duration: '', price: '' });
  };

  const createServiceFromHaircut = async event => {
    event.preventDefault();
    if (!serviceTarget) return;
    setServiceSaving(true);
    setError('');
    try {
      const { service } = await apiRequest('/barber/services', {
        method: 'POST',
        body: JSON.stringify({
          name: serviceTarget.title,
          description: serviceTarget.description,
          duration: Number(serviceForm.duration),
          price: Number(serviceForm.price),
        }),
      });
      setServices(list => [...list, service].sort((a, b) => a.name.localeCompare(b.name)));
      setServiceTarget(null);
      toast(`${service.name} is now available to book.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setServiceSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Haircut gallery</h2>
        <p className="text-sm text-cream-muted">Share your work on {barber?.name ? `${barber.name}’s` : 'your'} public barber profile.</p>
      </div>
      <Card className="p-5 sm:p-6">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Haircut title" required>
            <Input required maxLength={100} value={title} onChange={event => setTitle(event.target.value)} placeholder="e.g. Textured low fade" />
          </Field>
          <Field label="Description" hint="Optional. Up to 500 characters.">
            <Textarea rows={3} maxLength={500} value={description} onChange={event => setDescription(event.target.value)} placeholder="Describe the cut or style." />
          </Field>
          <Field label="Photo" required hint="JPG, PNG, or WebP; maximum 5 MB.">
            <Input required type="file" accept="image/jpeg,image/png,image/webp" onChange={event => setImage(event.target.files[0] || null)} />
          </Field>
          {error && <p className="text-sm text-danger" role="alert">{error}</p>}
          <Button type="submit" disabled={saving}>{saving ? 'Uploading…' : 'Add haircut'}</Button>
        </form>
      </Card>
      <section>
        <h3 className="font-display text-lg text-cream mb-3">Published haircuts</h3>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map(index => <Skeleton key={index} className="h-56" />)}</div>
        ) : haircuts.length === 0 ? (
          <Card className="p-5"><p className="text-sm text-cream-muted">You haven’t added a haircut yet.</p></Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {haircuts.map(haircut => (
              <Card key={haircut.id} className="overflow-hidden">
                <img src={haircut.imageUrl} alt={haircut.title} className="w-full aspect-[4/3] object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-medium text-cream truncate">{haircut.title}</h4>
                      {haircut.description && <p className="text-sm text-cream-muted mt-1 line-clamp-2">{haircut.description}</p>}
                    </div>
                    <Button type="button" variant="dangerGhost" size="sm" onClick={() => remove(haircut)}>Remove</Button>
                  </div>
                  {servicesLoading ? (
                    <p className="text-xs text-cream-muted mt-3">Checking service menu…</p>
                  ) : servicesError ? (
                    <p className="text-xs text-danger mt-3" role="alert">{servicesError}</p>
                  ) : services.some(service => service.name.toLowerCase() === haircut.title.toLowerCase()) ? (
                    <p className="text-xs text-success mt-3">Available to book</p>
                  ) : (
                    <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => openServiceForm(haircut)}>
                      Make bookable
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
      <Modal open={!!serviceTarget} onClose={() => serviceSaving ? null : setServiceTarget(null)} title="Make haircut bookable">
        <form onSubmit={createServiceFromHaircut} className="space-y-4">
          <p className="text-sm text-cream-muted">{serviceTarget?.title} will be added to your service menu.</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration (min)" required>
              <Input required type="number" min="5" max="600" step="1" value={serviceForm.duration}
                onChange={event => setServiceForm(form => ({ ...form, duration: event.target.value }))} />
            </Field>
            <Field label="Price (₱)" required>
              <Input required type="number" min="0.01" step="0.01" value={serviceForm.price}
                onChange={event => setServiceForm(form => ({ ...form, price: event.target.value }))} />
            </Field>
          </div>
          {error && <p className="text-sm text-danger" role="alert">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" disabled={serviceSaving} onClick={() => setServiceTarget(null)}>Cancel</Button>
            <Button type="submit" disabled={serviceSaving}>{serviceSaving ? 'Saving…' : 'Add to services'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================== CUSTOMER: BOOKING FLOW ============================== */
function BookingFlow({ initialBarberId, initialSelection, onComplete, onCancel }) {
  const [step, setStep] = useState(initialSelection?.date && initialSelection?.time ? 4 : 1);
  const [barberId, setBarberId] = useState(initialBarberId || '');
  const [serviceId, setServiceId] = useState(initialSelection?.serviceId || '');
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [date, setDate] = useState(initialSelection?.date || shiftDate(1));
  const [time, setTime] = useState(initialSelection?.time || '');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [slots, setSlots] = useState([]);
  const [availabilityError, setAvailabilityError] = useState('');
  const toast = useToast();

  const steps = ['Service', 'Barber', 'Date & time', 'Notes', 'Review'];
  const barber = barbers.find(b => b.id === barberId);
  const service = services.find(s => s.id === serviceId);
  const availableServices = barberId && barber
    ? services.filter(s => barber.services.includes(s.id))
    : services;
  const dateOptions = Array.from({length: 10}, (_,i) => shiftDate(i+1));

  useEffect(() => {
    let active = true;
    Promise.all([apiRequest('/services'), apiRequest('/barbers')])
      .then(([serviceList, barberList]) => {
        if (!active) return;
        setServices(serviceList);
        setBarbers(barberList);
        setCatalogError('');
      })
      .catch(error => {
        if (active) setCatalogError(error.message);
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!barberId || !serviceId || !date) {
      setSlots([]);
      setAvailabilityError('');
      return;
    }

    let active = true;
    setSlots([]);
    setAvailabilityError('');
    const query = new URLSearchParams({ barberId, serviceId, date });
    apiRequest(`/availability?${query}`)
      .then(result => { if (active) setSlots(result.slots); })
      .catch(error => { if (active) setAvailabilityError(error.message); });
    return () => { active = false; };
  }, [barberId, serviceId, date]);

  const canProceed = {
    1: !catalogLoading && !catalogError && !!serviceId && !!service,
    2: !!barberId,
    3: !!date && !!time,
    4: !catalogLoading && !catalogError && !!barber && !!service,
    5: !catalogLoading && !catalogError && !!barber && !!service,
  };

  const next = () => setStep(s => Math.min(5, s+1));
  const back = () => step === 1 ? onCancel() : setStep(s => s-1);

  const confirm = async () => {
    setSubmitting(true);
    try {
      const result = await apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify({ barberId, serviceId, date, time, notes }),
      });
      toast('Booking request sent — you will be notified once confirmed.');
      onComplete(result.appointment);
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in">
      <button onClick={onCancel} className="flex items-center gap-1.5 text-sm text-cream-muted hover:text-cream focus-ring rounded mb-5">{Ic('arrowLeft', { size: 15 })}Cancel booking</button>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {steps.map((label, i) => {
          const n = i+1;
          const state = n < step ? 'done' : n === step ? 'active' : 'todo';
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                  state === 'done' ? 'bg-gold border-gold text-charcoal-950' : state === 'active' ? 'border-gold text-gold-bright' : 'border-charcoal-600 text-cream-dim'
                }`}>
                  {state === 'done' ? Ic('check', { size: 14 }) : n}
                </div>
                <span className={`text-[11px] hidden sm:block ${state === 'todo' ? 'text-cream-dim' : 'text-cream-muted'}`}>{label}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${n < step ? 'bg-gold' : 'bg-charcoal-700'}`}></div>}
            </React.Fragment>
          );
        })}
      </div>

      <Card className="p-6 sm:p-7">
        {step === 1 && (
          <div>
            <h3 className="font-display text-xl text-cream mb-4">Choose a service</h3>
            {catalogError ? (
              <p className="text-sm text-danger py-6 text-center" role="alert">{catalogError}</p>
            ) : catalogLoading ? (
              <p className="text-sm text-cream-muted py-6 text-center">Loading services…</p>
            ) : availableServices.length === 0 ? (
              <p className="text-sm text-cream-muted py-6 text-center">No services are available to book right now.</p>
            ) : <div className="space-y-2.5">
              {availableServices.map(s => (
                <button key={s.id} onClick={() => { setServiceId(s.id); setTime(''); }} className={`w-full flex items-center justify-between p-4 rounded-btn border text-left transition-colors focus-ring ${serviceId === s.id ? 'border-gold bg-gold/10' : 'border-charcoal-700 hover:border-charcoal-600 bg-charcoal-800/40'}`}>
                  <div>
                    <p className="text-sm font-medium text-cream">{s.name}</p>
                    <p className="text-xs text-cream-muted flex items-center gap-1 mt-0.5">{Ic('clock', { size: 12 })}{s.duration} min</p>
                    {s.description && <p className="text-xs text-cream-dim mt-1">{s.description}</p>}
                  </div>
                  <span className="font-display text-gold-bright">{formatPrice(s.price)}</span>
                </button>
              ))}
            </div>}
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-display text-xl text-cream mb-4">Choose a barber</h3>
            <div className="space-y-2.5">
              {barbers.filter(b => !serviceId || b.services.includes(serviceId)).map(b => (
                <button key={b.id} onClick={() => { setBarberId(b.id); setTime(''); }} className={`w-full flex items-center gap-3 p-4 rounded-btn border text-left transition-colors focus-ring ${barberId === b.id ? 'border-gold bg-gold/10' : 'border-charcoal-700 hover:border-charcoal-600 bg-charcoal-800/40'}`}>
                  <Avatar initials={b.initials} color={b.color} src={b.avatarUrl} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-cream">{b.name}</p>
                    <p className="text-xs text-cream-muted">{b.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-cream-muted shrink-0"><StarRow rating={b.rating} size={12} />{b.rating}</div>
                </button>
              ))}
              {!catalogLoading && !catalogError && barbers.filter(b => !serviceId || b.services.includes(serviceId)).length === 0 &&
                <p className="text-sm text-cream-muted py-6 text-center">No barbers currently offer this service.</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-display text-xl text-cream mb-4">Pick a date &amp; time</h3>
            <p className="text-xs text-cream-muted mb-2.5">Date</p>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {dateOptions.map(d => {
                const dd = new Date(d+'T00:00:00');
                return (
                  <button key={d} onClick={() => { setDate(d); setTime(''); }} className={`flex flex-col items-center py-2.5 rounded-btn border text-xs transition-colors focus-ring ${date === d ? 'border-gold bg-gold/10 text-gold-bright' : 'border-charcoal-700 text-cream-muted hover:border-charcoal-600'}`}>
                    <span>{dd.toLocaleDateString('en-US',{weekday:'short'})}</span>
                    <span className="font-display text-base text-cream mt-0.5">{dd.getDate()}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-cream-muted mb-2.5">Available times</p>
            {availabilityError ? (
              <p className="text-sm text-danger py-6 text-center" role="alert">{availabilityError}</p>
            ) : slots.length === 0 ? (
              <p className="text-sm text-cream-dim py-6 text-center">No slots are currently available — try another date.</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map(t => (
                  <button key={t} onClick={() => setTime(t)} className={`py-2.5 rounded-btn border text-sm transition-colors focus-ring ${time === t ? 'border-gold bg-gold text-charcoal-950 font-semibold' : 'border-charcoal-700 text-cream hover:border-gold/60'}`}>
                    {fmtTime12(t)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="font-display text-xl text-cream mb-4">Anything we should know?</h3>
            <Field label="Notes for your barber" hint="Optional — mention style preferences, allergies, or anything relevant.">
              <Textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} placeholder="E.g. keep length on top, sensitive skin, first time getting a fade…" />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="font-display text-xl text-cream mb-4">Review &amp; confirm</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-btn bg-charcoal-800/50">
                <Avatar initials={barber.initials} color={barber.color} src={barber.avatarUrl} size="sm" />
                <div><p className="text-sm text-cream">{barber.name}</p><p className="text-xs text-cream-muted">{barber.specialty}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-btn bg-charcoal-800/50">
                  <p className="text-xs text-cream-muted mb-0.5">Service</p>
                  <p className="text-sm text-cream">{service.name}</p>
                </div>
                <div className="p-3 rounded-btn bg-charcoal-800/50">
                  <p className="text-xs text-cream-muted mb-0.5">Price</p>
                  <p className="text-sm text-gold-bright font-display">{formatPrice(service.price)}</p>
                </div>
                <div className="p-3 rounded-btn bg-charcoal-800/50">
                  <p className="text-xs text-cream-muted mb-0.5">Date</p>
                  <p className="text-sm text-cream">{fmtDate(date)}</p>
                </div>
                <div className="p-3 rounded-btn bg-charcoal-800/50">
                  <p className="text-xs text-cream-muted mb-0.5">Time</p>
                  <p className="text-sm text-cream">{fmtTime12(time)}</p>
                </div>
              </div>
              {notes && (
                <div className="p-3 rounded-btn bg-charcoal-800/50">
                  <p className="text-xs text-cream-muted mb-0.5">Notes</p>
                  <p className="text-sm text-cream">{notes}</p>
                </div>
              )}
            </div>
            <p className="text-xs text-cream-dim mb-6">Your booking will be marked <span className="text-pending font-medium">Pending</span> until {barber.name.split(' ')[0]} confirms.</p>
          </div>
        )}

        <div className="flex justify-between mt-7 pt-5 border-t border-charcoal-700/60">
          <Button variant="ghost" onClick={back}>{step === 1 ? 'Cancel' : 'Back'}</Button>
          {step < 5 ? (
            <Button onClick={next} disabled={!canProceed[step]}>Continue</Button>
          ) : (
            <Button onClick={confirm} disabled={submitting}>{submitting ? <>{Ic('spinner', { size: 15, className: 'animate-spin' })}Booking…</> : 'Confirm booking'}</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ============================== CUSTOMER: APPOINTMENTS LIST ============================== */
function CustomerAppointments({ onView, loading }) {
  const { appointments, customer } = useApp();
  const [tab, setTab] = useState('upcoming');
  const mine = appointments.filter(a => a.customerId === customer.id);
  const upcoming = mine.filter(a => ['Pending','Confirmed'].includes(a.status)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  const past = mine.filter(a => ['Completed','Cancelled','No-show'].includes(a.status)).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Your appointments</h2>
        <p className="text-cream-muted text-sm">Upcoming bookings and your visit history.</p>
      </div>
      <div className="flex gap-5 border-b border-charcoal-700">
        {['upcoming','history'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 -mb-px border-b-2 text-sm font-semibold capitalize focus-ring ${tab === t ? 'border-gold text-cream' : 'border-transparent text-cream-muted'}`}>
            {t} {t==='upcoming' ? `(${upcoming.length})` : `(${past.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}</div>
      ) : list.length === 0 ? (
        <EmptyState icon="calendar" title={tab === 'upcoming' ? 'Nothing on the calendar' : 'No past visits'} body={tab === 'upcoming' ? 'Book your next appointment whenever you\'re ready.' : 'Completed and past appointments will show up here.'} />
      ) : (
        <div className="space-y-3">
          {list.map(a => {
            const b = BARBERS.find(x=>x.id===a.barberId);
            const s = SERVICES.find(x=>x.id===a.serviceId);
            return (
              <button key={a.id} onClick={() => onView(a.id)} className="w-full text-left">
                <Card className="p-4 flex items-center gap-4 hover:border-gold/50 transition-colors">
                  <div className="text-center w-14 shrink-0">
                    <p className="text-xs text-cream-muted">{fmtDate(a.date).split(' ')[0]}</p>
                    <p className="font-display text-lg text-gold-bright leading-none mt-0.5">{new Date(a.date+'T00:00:00').getDate()}</p>
                  </div>
                  <Avatar initials={b.initials} color={b.color} src={b.avatarUrl} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream truncate">{s.name}</p>
                    <p className="text-xs text-cream-muted truncate">{fmtTime12(a.time)} with {b.name}</p>
                  </div>
                  <Badge status={a.status} />
                </Card>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AppointmentDetail({ appointmentId, onBack, role }) {
  const { appointments, updateAppointment } = useApp();
  const toast = useToast();
  const appt = appointments.find(a => a.id === appointmentId);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [rDate, setRDate] = useState(appt?.date || shiftDate(1));
  const [rTime, setRTime] = useState(appt?.time || '');
  const [rescheduleSlots, setRescheduleSlots] = useState([]);
  const [rescheduleError, setRescheduleError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!showReschedule || !appt) return;
    let active = true;
    setRescheduleSlots([]);
    setRescheduleError('');
    const query = new URLSearchParams({
      barberId: appt.barberId,
      serviceId: appt.serviceId,
      date: rDate,
    });
    apiRequest(`/availability?${query}`)
      .then(result => { if (active) setRescheduleSlots(result.slots); })
      .catch(error => { if (active) setRescheduleError(error.message); });
    return () => { active = false; };
  }, [showReschedule, appt?.id, appt?.barberId, appt?.serviceId, rDate]);

  if (!appt) return <EmptyState icon="calendar" title="Appointment not found" body="It may have been removed." action={<Button onClick={onBack}>Go back</Button>} />;

  const b = BARBERS.find(x => x.id === appt.barberId);
  const s = SERVICES.find(x => x.id === appt.serviceId);
  const canModify = ['Pending','Confirmed'].includes(appt.status);
  const dateOptions = Array.from({length: 10}, (_,i) => shiftDate(i+1));

  const doReschedule = async () => {
    setBusy(true);
    const saved = await updateAppointment(appt.id, { date: rDate, time: rTime });
    setBusy(false);
    if (saved) {
      setShowReschedule(false);
      toast('Appointment rescheduled — pending re-confirmation.');
    }
  };

  const doCancel = async () => {
    setBusy(true);
    const saved = await updateAppointment(appt.id, { status: 'Cancelled' });
    setBusy(false);
    if (saved) {
      setShowCancel(false);
      toast('Appointment cancelled.', 'info');
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-in space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-cream-muted hover:text-cream focus-ring rounded">{Ic('arrowLeft', { size: 15 })}Back</button>

      <Card className="p-6 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-cream-muted">Appointment #{appt.id.toUpperCase()}</p>
          <Badge status={appt.status} />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <Avatar initials={b.initials} color={b.color} src={b.avatarUrl} size="lg" />
          <div>
            <h2 className="font-display text-xl text-cream">{s.name}</h2>
            <p className="text-sm text-cream-muted">with {b.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 rounded-btn bg-charcoal-800/50"><p className="text-xs text-cream-muted mb-0.5 flex items-center gap-1.5">{Ic('calendar',{size:12})}Date</p><p className="text-sm text-cream">{fmtDateLong(appt.date)}</p></div>
          <div className="p-3.5 rounded-btn bg-charcoal-800/50"><p className="text-xs text-cream-muted mb-0.5 flex items-center gap-1.5">{Ic('clock',{size:12})}Time</p><p className="text-sm text-cream">{fmtTime12(appt.time)}</p></div>
          <div className="p-3.5 rounded-btn bg-charcoal-800/50"><p className="text-xs text-cream-muted mb-0.5">Duration</p><p className="text-sm text-cream">{s.duration} min</p></div>
          <div className="p-3.5 rounded-btn bg-charcoal-800/50"><p className="text-xs text-cream-muted mb-0.5">Price</p><p className="text-sm text-gold-bright font-display">{formatPrice(s.price)}</p></div>
        </div>
        {role === 'customer' && (
          <div className="p-3.5 rounded-btn bg-charcoal-800/50 mb-2">
            <p className="text-xs text-cream-muted mb-0.5">Customer</p>
            <p className="text-sm text-cream">{appt.customerName}</p>
          </div>
        )}
        {appt.notes && (
          <div className="p-3.5 rounded-btn bg-charcoal-800/50">
            <p className="text-xs text-cream-muted mb-0.5">Notes</p>
            <p className="text-sm text-cream">{appt.notes}</p>
          </div>
        )}
      </Card>

      {role === 'customer' && canModify && (
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => { setRDate(appt.date); setRTime(''); setShowReschedule(true); }}>{Ic('calendar',{size:15})}Reschedule</Button>
          <Button variant="dangerGhost" className="flex-1" onClick={() => setShowCancel(true)}>{Ic('x',{size:15})}Cancel</Button>
        </div>
      )}

      <Modal open={showReschedule} onClose={() => setShowReschedule(false)} title="Reschedule appointment">
        <p className="text-sm text-cream-muted mb-4">Pick a new date and time. {b.name.split(' ')[0]} will need to re-confirm.</p>
        <div className="grid grid-cols-5 gap-2 mb-5">
          {dateOptions.map(d => {
            const dd = new Date(d+'T00:00:00');
            return (
              <button key={d} onClick={() => { setRDate(d); setRTime(''); }} className={`flex flex-col items-center py-2 rounded-btn border text-xs focus-ring ${rDate === d ? 'border-gold bg-gold/10 text-gold-bright' : 'border-charcoal-700 text-cream-muted'}`}>
                <span>{dd.toLocaleDateString('en-US',{weekday:'short'})}</span>
                <span className="font-display text-sm text-cream">{dd.getDate()}</span>
              </button>
            );
          })}
        </div>
        {rescheduleError && <p className="text-sm text-danger mb-3" role="alert">{rescheduleError}</p>}
        {!rescheduleError && rescheduleSlots.length === 0 && <p className="text-sm text-cream-muted mb-3">No available times on this date.</p>}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {rescheduleSlots.map(t => (
            <button key={t} onClick={() => setRTime(t)} className={`py-2 rounded-btn border text-xs focus-ring ${rTime === t ? 'border-gold bg-gold text-charcoal-950 font-semibold' : 'border-charcoal-700 text-cream'}`}>{fmtTime12(t)}</button>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowReschedule(false)}>Never mind</Button>
          <Button onClick={doReschedule} disabled={busy || !rTime}>{busy ? 'Saving…' : 'Confirm new time'}</Button>
        </div>
      </Modal>

      <ConfirmDialog open={showCancel} onClose={() => setShowCancel(false)} onConfirm={doCancel} loading={busy}
        title="Cancel this appointment?" body={`This will cancel your ${s.name} with ${b.name} on ${fmtDate(appt.date)}. This can't be undone.`}
        confirmLabel="Yes, cancel it" />
    </div>
  );
}

/* ============================== CUSTOMER: PROFILE ============================== */
function CustomerProfile() {
  const { customer, setCustomer } = useApp();
  const [form, setForm] = useState({ name: customer.name, email: customer.email, phone: customer.phone });
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const photoInput = useRef(null);
  const toast = useToast();
  useEffect(() => () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
  }, [photoPreview]);
  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(URL.createObjectURL(file));
    setUploadingPhoto(true);
    try {
      const body = new FormData();
      body.append('photo', file);
      const result = await apiRequest('/profile/photo', { method: 'POST', body });
      setCustomer(result.customer);
      setPhotoPreview('');
      toast('Profile photo updated.');
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setUploadingPhoto(false);
    }
  };
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await apiRequest('/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: form.name, phone: form.phone }),
      });
      setCustomer(result.customer);
      toast('Profile updated.');
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="max-w-xl space-y-6 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Profile &amp; settings</h2>
        <p className="text-cream-muted text-sm">Keep your contact details current so we can reach you about bookings.</p>
      </div>
      <Card className="p-6 sm:p-7">
        <div className="flex items-center gap-4 mb-6">
          <Avatar initials={customer.avatarInitials} src={photoPreview || customer.avatarUrl} size="lg" />
          <div>
            <p className="text-cream font-medium">{form.name}</p>
            <p className="text-xs text-cream-muted">Customer since {customer.memberSince}</p>
            <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={uploadPhoto} />
            <Button type="button" size="sm" variant="secondary" className="mt-2" disabled={uploadingPhoto} onClick={() => photoInput.current?.click()}>
              {uploadingPhoto ? 'Uploading…' : customer.avatarUrl ? 'Change photo' : 'Choose profile photo'}
            </Button>
            <p className="text-xs text-cream-dim mt-1">JPG, PNG, or WebP; up to 5 MB.</p>
          </div>
        </div>
        <form onSubmit={save} className="space-y-4">
          <Field label="Full name" required><Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></Field>
          <Field label="Email address" required hint="Contact support to change your account email."><Input type="email" value={form.email} readOnly /></Field>
          <Field label="Phone number"><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></Field>
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
        </form>
      </Card>
    </div>
  );
}

/* ============================== BARBER: DASHBOARD ============================== */
function BarberDashboard({ onNav, loading }) {
  const { appointments, updateAppointment, barber } = useApp();
  const myId = barber?.id;
  const today = shiftDate(0);
  const mine = appointments.filter(a => a.barberId === myId);
  const todays = mine.filter(a => a.date === today).sort((a,b)=>a.time.localeCompare(b.time));
  const upcoming = mine.filter(a => a.date > today && ['Pending','Confirmed'].includes(a.status)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  const totalCustomers = new Set(mine.map(a=>a.customerId)).size;
  const completedCount = mine.filter(a=>a.status==='Completed').length;
  const pendingCount = mine.filter(a=>a.status==='Pending').length;
  const toast = useToast();

  if (loading) {
    return <div className="space-y-6"><div className="grid sm:grid-cols-4 gap-4">{[1,2,3,4].map(i=><Skeleton key={i} className="h-24" />)}</div><Skeleton className="h-64 w-full" /></div>;
  }

  const act = (id, status, label) => {
    updateAppointment(id, { status }).then(updated => {
      if (updated) toast(`Appointment marked as ${label}.`);
    });
  };

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Good to see you, {barber?.name?.split(' ')[0] || 'there'}.</h2>
        <p className="text-cream-muted text-sm">{fmtDateLong(today)}</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="p-5"><p className="text-xs text-cream-muted mb-1 flex items-center gap-1.5">{Ic('calendar',{size:13})}Today</p><p className="font-display text-3xl text-cream">{todays.length}</p></Card>
        <Card className="p-5"><p className="text-xs text-cream-muted mb-1 flex items-center gap-1.5">{Ic('clock',{size:13})}Pending</p><p className="font-display text-3xl text-pending">{pendingCount}</p></Card>
        <Card className="p-5"><p className="text-xs text-cream-muted mb-1 flex items-center gap-1.5">{Ic('users',{size:13})}Customers</p><p className="font-display text-3xl text-cream">{totalCustomers}</p></Card>
        <Card className="p-5"><p className="text-xs text-cream-muted mb-1 flex items-center gap-1.5">{Ic('chart',{size:13})}Completed</p><p className="font-display text-3xl text-success">{completedCount}</p></Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-cream">Today's appointments</h3>
          <button onClick={() => onNav('appointments')} className="text-sm text-gold hover:text-gold-bright focus-ring rounded">View all</button>
        </div>
        {todays.length === 0 ? (
          <Card><EmptyState icon="calendar" title="Nothing booked today" body="Enjoy the quiet — or check your upcoming bookings." /></Card>
        ) : (
          <div className="space-y-3">
            {todays.map(a => (
              <Card key={a.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="text-center w-16 shrink-0">
                    <p className="font-display text-base text-gold-bright">{fmtTime12(a.time)}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-cream">{a.customerName}</p>
                    <p className="text-xs text-cream-muted">{SERVICES.find(s=>s.id===a.serviceId).name}</p>
                    {a.notes && <p className="text-xs text-cream-dim mt-1 italic">"{a.notes}"</p>}
                  </div>
                  <Badge status={a.status} />
                </div>
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-charcoal-700/60">
                  {a.status === 'Pending' && <Button size="sm" onClick={() => act(a.id,'Confirmed','confirmed')}>{Ic('check',{size:13})}Confirm</Button>}
                  {a.status === 'Pending' && <Button size="sm" variant="dangerGhost" onClick={() => act(a.id,'Cancelled','cancelled')}>Decline</Button>}
                  {a.status === 'Confirmed' && <Button size="sm" onClick={() => act(a.id,'Completed','completed')}>{Ic('check',{size:13})}Mark complete</Button>}
                  {a.status === 'Confirmed' && <Button size="sm" variant="ghost" onClick={() => act(a.id,'No-show','no-show')}>No-show</Button>}
                  {a.status === 'Confirmed' && <Button size="sm" variant="dangerGhost" onClick={() => act(a.id,'Cancelled','cancelled')}>Cancel</Button>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg text-cream mb-3">Upcoming this week</h3>
        <Card className="divide-y divide-charcoal-700/60">
          {upcoming.length === 0 ? <EmptyState icon="calendar" title="Nothing else on the books" body="New bookings will appear here as customers request them." /> :
            upcoming.slice(0,5).map(a => (
              <div key={a.id} className="flex items-center gap-4 p-4">
                <div className="text-center w-16 shrink-0"><p className="text-xs text-cream-muted">{fmtDate(a.date)}</p><p className="text-sm text-gold-bright">{fmtTime12(a.time)}</p></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-cream truncate">{a.customerName}</p><p className="text-xs text-cream-muted truncate">{SERVICES.find(s=>s.id===a.serviceId).name}</p></div>
                <Badge status={a.status} />
              </div>
            ))}
        </Card>
      </div>
    </div>
  );
}

/* ============================== BARBER: APPOINTMENTS (LIST + CALENDAR) ============================== */
function BarberAppointments({ onViewDetail }) {
  const { appointments, updateAppointment, barber } = useApp();
  const toast = useToast();
  const myId = barber?.id;
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');
  const [confirmAction, setConfirmAction] = useState(null); // { id, status, label }
  const mine = appointments.filter(a => a.barberId === myId).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  const filtered = filter === 'all' ? mine : mine.filter(a => a.status === filter);

  const act = (id, status, label) => {
    updateAppointment(id, { status }).then(updated => {
      if (updated) {
        toast(`Appointment marked as ${label}.`);
        setConfirmAction(null);
      }
    });
  };

  // simple week calendar grouping
  const weekDates = Array.from({length:7}, (_,i)=>shiftDate(i-1));

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-cream mb-1">Appointments</h2>
          <p className="text-cream-muted text-sm">Manage confirmations, cancellations, and no-shows.</p>
        </div>
        <div className="flex gap-2 p-1 bg-charcoal-800 rounded-btn self-start">
          {['list','calendar'].map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3.5 py-1.5 rounded-btn text-xs font-semibold capitalize focus-ring ${view===v?'bg-gold text-charcoal-950':'text-cream-muted'}`}>{v}</button>
          ))}
        </div>
      </div>

      {view === 'list' && (
        <div className="flex flex-wrap gap-2">
          {['all','Pending','Confirmed','Completed','Cancelled','No-show'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus-ring ${filter===f ? 'border-gold text-gold-bright bg-gold/10' : 'border-charcoal-700 text-cream-muted'}`}>{f === 'all' ? 'All' : f}</button>
          ))}
        </div>
      )}

      {view === 'list' ? (
        filtered.length === 0 ? (
          <Card><EmptyState icon="calendar" title="No appointments" body="Try a different filter, or check back once new bookings arrive." /></Card>
        ) : (
          <div className="space-y-3">
            {filtered.map(a => (
              <Card key={a.id} className="p-4">
                <div className="flex items-start gap-4">
                  <button onClick={() => onViewDetail(a.id)} className="flex items-start gap-4 flex-1 min-w-0 text-left focus-ring rounded-btn">
                    <div className="text-center w-16 shrink-0">
                      <p className="text-xs text-cream-muted">{fmtDate(a.date)}</p>
                      <p className="font-display text-base text-gold-bright">{fmtTime12(a.time)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-cream">{a.customerName}</p>
                      <p className="text-xs text-cream-muted">{SERVICES.find(s=>s.id===a.serviceId).name}</p>
                      {a.notes && <p className="text-xs text-cream-dim mt-1 italic truncate">"{a.notes}"</p>}
                    </div>
                  </button>
                  <Badge status={a.status} />
                </div>
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-charcoal-700/60">
                  {a.status === 'Pending' && <Button size="sm" onClick={() => act(a.id,'Confirmed','confirmed')}>{Ic('check',{size:13})}Confirm</Button>}
                  {a.status === 'Pending' && <Button size="sm" variant="dangerGhost" onClick={() => setConfirmAction({id:a.id,status:'Cancelled',label:'declined', title:'Decline this booking?', body:`Decline ${a.customerName}'s request for ${SERVICES.find(s=>s.id===a.serviceId).name}?`})}>Decline</Button>}
                  {a.status === 'Confirmed' && <Button size="sm" onClick={() => act(a.id,'Completed','completed')}>{Ic('check',{size:13})}Complete</Button>}
                  {a.status === 'Confirmed' && <Button size="sm" variant="ghost" onClick={() => setConfirmAction({id:a.id,status:'No-show',label:'a no-show', title:'Mark as no-show?', body:`Mark ${a.customerName} as a no-show for this appointment?`})}>No-show</Button>}
                  {a.status === 'Confirmed' && <Button size="sm" variant="dangerGhost" onClick={() => setConfirmAction({id:a.id,status:'Cancelled',label:'cancelled', title:'Cancel this appointment?', body:`Cancel ${a.customerName}'s appointment on ${fmtDate(a.date)}?`})}>Cancel</Button>}
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
          {weekDates.map(d => {
            const dayAppts = mine.filter(a => a.date === d).sort((a,b)=>a.time.localeCompare(b.time));
            const isToday = d === shiftDate(0);
            const dd = new Date(d+'T00:00:00');
            return (
              <div key={d} className={`rounded-card border p-3 ${isToday ? 'border-gold/60 bg-gold/5' : 'border-charcoal-700/60 bg-charcoal-900'}`}>
                <p className={`text-xs font-semibold mb-2 ${isToday ? 'text-gold-bright' : 'text-cream-muted'}`}>{dd.toLocaleDateString('en-US',{weekday:'short'})} {dd.getDate()}</p>
                <div className="space-y-1.5">
                  {dayAppts.length === 0 ? <p className="text-[11px] text-cream-dim">—</p> : dayAppts.map(a => (
                    <button key={a.id} onClick={() => onViewDetail(a.id)} className={`w-full text-left text-[11px] px-2 py-1.5 rounded ${statusMeta(a.status).bg} ${statusMeta(a.status).color} focus-ring`}>
                      <span className="block font-semibold">{fmtTime12(a.time)}</span>
                      <span className="block truncate">{a.customerName}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog open={!!confirmAction} onClose={() => setConfirmAction(null)}
        onConfirm={() => act(confirmAction.id, confirmAction.status, confirmAction.label)}
        title={confirmAction?.title} body={confirmAction?.body} confirmLabel="Confirm" />
    </div>
  );
}

/* ============================== BARBER: MANAGE SERVICES ============================== */
function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null); // {mode:'add'|'edit', data}
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ name: '', duration: '', price: '', description: '' });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    let active = true;
    apiRequest('/barber/services')
      .then(result => {
        if (active) setServices(result);
      })
      .catch(error => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const openAdd = () => { setForm({ name:'', duration:'', price:'', description:'' }); setErrors({}); setModal({ mode:'add' }); };
  const openEdit = (s) => { setForm({ name:s.name, duration:s.duration, price:s.price, description:s.description||'' }); setErrors({}); setModal({ mode:'edit', id:s.id }); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Enter a service name.';
    if (!form.duration || form.duration <= 0) e.duration = 'Enter a valid duration.';
    if (!form.price || form.price <= 0) e.price = 'Enter a valid price.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        duration: Number(form.duration),
        price: Number(form.price),
        description: form.description.trim(),
      };
      if (modal.mode === 'add') {
        const result = await apiRequest('/barber/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setServices(list => [...list, result.service].sort((a, b) => a.name.localeCompare(b.name)));
        toast('Service added.');
      } else {
        const result = await apiRequest(`/barber/services/${modal.id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        setServices(list => list.map(item => item.id === modal.id ? result.service : item)
          .sort((a, b) => a.name.localeCompare(b.name)));
        toast('Service updated.');
      }
      setModal(null);
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    try {
      await apiRequest(`/barber/services/${deleteTarget.id}`, { method: 'DELETE' });
      setServices(list => list.filter(item => item.id !== deleteTarget.id));
      toast('Service removed.', 'info');
      setDeleteTarget(null);
    } catch (error) {
      toast(error.message, 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-cream mb-1">Manage services</h2>
          <p className="text-cream-muted text-sm">Add, edit, or retire services you offer.</p>
        </div>
        <Button onClick={openAdd}>{Ic('plus',{size:15})}Add service</Button>
      </div>

      {loadError ? (
        <p className="text-sm text-danger" role="alert">{loadError}</p>
      ) : loading ? (
        <p className="text-sm text-cream-muted py-6 text-center">Loading services…</p>
      ) : services.length === 0 ? (
        <EmptyState icon="scissors" title="No services yet" body="Add your first service so customers can start booking." action={<Button onClick={openAdd}>Add service</Button>} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map(s => (
            <Card key={s.id} className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg text-cream">{s.name}</h3>
                <span className="font-display text-gold-bright shrink-0 ml-3">{formatPrice(s.price)}</span>
              </div>
              <p className="text-xs text-cream-muted flex items-center gap-1 mb-3">{Ic('clock',{size:12})}{s.duration} min</p>
              {s.description && <p className="text-sm text-cream-muted mb-4">{s.description}</p>}
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => openEdit(s)}>{Ic('edit',{size:13})}Edit</Button>
                <Button size="sm" variant="dangerGhost" onClick={() => setDeleteTarget(s)}>{Ic('trash',{size:13})}Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add service' : 'Edit service'}>
        <div className="space-y-4">
          <Field label="Service name" required error={errors.name}><Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="E.g. Skin Fade" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration (min)" required error={errors.duration}><Input type="number" min="5" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} /></Field>
            <Field label="Price (₱)" required error={errors.price}><Input type="number" min="0.01" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} /></Field>
          </div>
          <Field label="Description" hint="Optional — shown to customers."><Textarea rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></Field>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : modal?.mode === 'add' ? 'Add service' : 'Save changes'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={doDelete}
        title="Delete this service?" body={`"${deleteTarget?.name}" will no longer be bookable by customers.`} confirmLabel="Delete service" />
    </div>
  );
}

/* ============================== BARBER: AVAILABILITY ============================== */
function AvailabilitySettings() {
  const [hours, setHours] = useState(WORKING_HOURS);
  const [breakStart, setBreakStart] = useState('12:30');
  const [breakEnd, setBreakEnd] = useState('13:00');
  const [vacations, setVacations] = useState([{ id:'v1', start: shiftDate(20), end: shiftDate(25), label: 'Family trip' }]);
  const [newVacation, setNewVacation] = useState({ start: '', end: '', label: '' });
  const toast = useToast();

  const toggleDay = (day) => setHours(h => ({ ...h, [day]: { ...h[day], off: !h[day].off } }));
  const updateTime = (day, field, val) => setHours(h => ({ ...h, [day]: { ...h[day], [field]: val } }));

  const save = () => toast('Availability updated.');

  const addVacation = () => {
    if (!newVacation.start || !newVacation.end) { toast('Pick a start and end date.', 'error'); return; }
    setVacations(v => [...v, { id: 'v'+Date.now(), ...newVacation, label: newVacation.label || 'Time off' }]);
    setNewVacation({ start:'', end:'', label:'' });
    toast('Time off added.');
  };
  const removeVacation = (id) => { setVacations(v => v.filter(x=>x.id!==id)); toast('Time off removed.', 'info'); };

  return (
    <div className="space-y-6 max-w-3xl animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Availability</h2>
        <p className="text-cream-muted text-sm">Set your working hours, daily break, and time off.</p>
      </div>

      <Card className="p-6 sm:p-7">
        <h3 className="font-display text-lg text-cream mb-4">Working hours</h3>
        <div className="space-y-3">
          {Object.entries(hours).map(([day, cfg]) => (
            <div key={day} className="flex flex-wrap items-center gap-3 py-2 border-b border-charcoal-700/50 last:border-0">
              <div className="flex items-center gap-2 w-24">
                <input type="checkbox" checked={!cfg.off} onChange={() => toggleDay(day)} className="w-4 h-4 accent-gold" />
                <span className="text-sm text-cream">{day}</span>
              </div>
              {cfg.off ? (
                <span className="text-xs text-cream-dim">Day off</span>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <Input type="time" value={cfg.start} onChange={e=>updateTime(day,'start',e.target.value)} className="w-32" />
                  <span className="text-cream-dim text-xs">to</span>
                  <Input type="time" value={cfg.end} onChange={e=>updateTime(day,'end',e.target.value)} className="w-32" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <h3 className="font-display text-lg text-cream mb-4">Daily break</h3>
        <div className="flex items-center gap-3">
          <Field label="Start"><Input type="time" value={breakStart} onChange={e=>setBreakStart(e.target.value)} /></Field>
          <span className="text-cream-dim mt-6">to</span>
          <Field label="End"><Input type="time" value={breakEnd} onChange={e=>setBreakEnd(e.target.value)} /></Field>
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <h3 className="font-display text-lg text-cream mb-4">Days off &amp; vacation</h3>
        <div className="space-y-2 mb-5">
          {vacations.length === 0 ? <p className="text-sm text-cream-dim">No upcoming time off scheduled.</p> :
            vacations.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-btn bg-charcoal-800/50">
                <div><p className="text-sm text-cream">{v.label}</p><p className="text-xs text-cream-muted">{fmtDate(v.start)} – {fmtDate(v.end)}</p></div>
                <button onClick={() => removeVacation(v.id)} className="text-cream-muted hover:text-danger focus-ring rounded p-1">{Ic('trash',{size:15})}</button>
              </div>
            ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 items-end">
          <Field label="Start date"><Input type="date" value={newVacation.start} onChange={e=>setNewVacation({...newVacation,start:e.target.value})} /></Field>
          <Field label="End date"><Input type="date" value={newVacation.end} onChange={e=>setNewVacation({...newVacation,end:e.target.value})} /></Field>
          <Field label="Label"><Input value={newVacation.label} onChange={e=>setNewVacation({...newVacation,label:e.target.value})} placeholder="E.g. Vacation" /></Field>
        </div>
        <Button variant="secondary" size="sm" className="mt-4" onClick={addVacation}>{Ic('plus',{size:13})}Add time off</Button>
      </Card>

      <Button onClick={save} size="lg">Save availability</Button>
    </div>
  );
}

/* ============================== BARBER: PROFILE / ACCOUNT ============================== */
function BarberProfile() {
  const { barber, setBarber } = useApp();
  const b = barber;
  const [form, setForm] = useState({ name: b?.name || '', specialty: b?.specialty || '', bio: b?.bio || '', email: b?.email || '', phone: b?.phone || '' });
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const photoInput = useRef(null);
  const toast = useToast();
  useEffect(() => () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
  }, [photoPreview]);
  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(URL.createObjectURL(file));
    setUploadingPhoto(true);
    try {
      const body = new FormData();
      body.append('photo', file);
      const result = await apiRequest('/barber/profile/photo', { method: 'POST', body });
      setBarber(result.barber);
      setPhotoPreview('');
      toast('Profile photo updated.');
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setUploadingPhoto(false);
    }
  };
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await apiRequest('/barber/profile', {
        method: 'PATCH',
        body: JSON.stringify(form),
      });
      setBarber(result.barber);
      setForm({
        name: result.barber.name,
        specialty: result.barber.specialty,
        bio: result.barber.bio,
        email: result.barber.email,
        phone: result.barber.phone,
      });
      toast('Profile updated.');
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };
  if (!b) {
    return <EmptyState icon="user" title="No barber profile yet" body="Add a barber to the database before editing a profile." />;
  }
  return (
    <div className="max-w-xl space-y-6 animate-in">
      <div>
        <h2 className="font-display text-2xl text-cream mb-1">Account settings</h2>
        <p className="text-cream-muted text-sm">Update how customers see you across the site.</p>
      </div>
      <Card className="p-6 sm:p-7">
        <div className="flex items-center gap-4 mb-6">
          <Avatar initials={b.initials} color={b.color} src={photoPreview || b.avatarUrl} size="lg" />
          <div>
            <div className="flex items-center gap-1.5"><StarRow rating={b.rating} /><span className="text-sm text-cream-muted">{b.rating} · {b.reviews} reviews</span></div>
            <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={uploadPhoto} />
            <Button type="button" size="sm" variant="secondary" className="mt-2" disabled={uploadingPhoto} onClick={() => photoInput.current?.click()}>
              {uploadingPhoto ? 'Uploading…' : b.avatarUrl ? 'Change photo' : 'Choose profile photo'}
            </Button>
            <p className="text-xs text-cream-dim mt-1">JPG, PNG, or WebP; up to 5 MB.</p>
          </div>
        </div>
        <form onSubmit={save} className="space-y-4">
          <Field label="Full name" required><Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></Field>
          <Field label="Specialty"><Input value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} /></Field>
          <Field label="Bio" hint="Shown on your public profile."><Textarea rows={4} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} /></Field>
          <Field label="Email address" required><Input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></Field>
          <Field label="Phone number"><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></Field>
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
        </form>
      </Card>
    </div>
  );
}

/* ============================== ROOT APP ============================== */
function AppRoot() {
  const [screen, setScreen] = useState('landing'); // landing | login | customer | barber
  const [role, setRole] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [barber, setBarber] = useState(null);
  const [customerView, setCustomerView] = useState('dashboard');
  const [barberView, setBarberView] = useState('dashboard');
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [bookingBarber, setBookingBarber] = useState(null);
  const [bookingSelection, setBookingSelection] = useState(null);
  const [bookingReturnView, setBookingReturnView] = useState('browse');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const toast = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    let active = true;
    apiRequest('/auth/me')
      .then(async ({ customer: signedInCustomer }) => {
        const result = await apiRequest('/appointments');
        if (!active) return;
        setCustomer(signedInCustomer);
        setBarber(null);
        setAppointments(result);
        setRole('customer');
        setScreen('customer');
      })
      .catch(async error => {
        if (error.status !== 401) {
          toast(error.message, 'error');
          return;
        }
        try {
          const result = await apiRequest('/barber/auth/me');
          const barberAppointments = await apiRequest('/barber/appointments');
          if (!active) return;
          setBarber(result.barber);
          setCustomer(null);
          setAppointments(barberAppointments);
          setRole('barber');
          setScreen('barber');
        } catch (barberError) {
          if (barberError.status !== 401) toast(barberError.message, 'error');
        }
      });
    return () => { active = false; };
  }, []);

  const updateAppointment = async (id, patch) => {
    try {
      const endpoint = role === 'barber' ? '/barber/appointments' : '/appointments';
      const { appointment } = await apiRequest(`${endpoint}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      });
      setAppointments(list => list.map(item => item.id === appointment.id ? appointment : item));
      return true;
    } catch (error) {
      toast(error.message, 'error');
      return false;
    }
  };
  const addAppointment = (appointment) => setAppointments(list => [...list, appointment]);

  const handleLogin = async (signedInRole, account) => {
    setRole(signedInRole);
    setScreen(signedInRole);
    setCustomerView('dashboard');
    setBarberView('dashboard');
    setLoading(true);
    if (signedInRole === 'barber') {
      setBarber(account);
      setCustomer(null);
      try {
        const result = await apiRequest('/barber/appointments');
        setAppointments(result);
      } catch (error) {
        setAppointments([]);
        toast(error.message, 'error');
      }
    } else {
      setCustomer(account);
      setBarber(null);
      try {
        const result = await apiRequest('/appointments');
        setAppointments(result);
      } catch (error) {
        toast(error.message, 'error');
      }
    }
  };
  const handleLogout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
      setAppointments([]);
      setCustomer(null);
      setBarber(null);
      setScreen('landing');
      setRole(null);
      toast('Signed out.', 'info');
    } catch (error) {
      toast(error.message, 'error');
    }
  };

  const ctxValue = { appointments, updateAppointment, addAppointment, customer, setCustomer, barber, setBarber };

  if (screen === 'landing') return <AppContext.Provider value={ctxValue}><Landing onNavigate={setScreen} /></AppContext.Provider>;
  if (screen === 'login') return <AppContext.Provider value={ctxValue}><AuthPage onLogin={handleLogin} onClose={() => setScreen('landing')} /></AppContext.Provider>;

  /* ---- Customer flow ---- */
  if (screen === 'customer') {
    let content, title = 'Dashboard', subtitle = '';
    if (customerView === 'dashboard') {
      title = 'Dashboard'; subtitle = "Today, " + fmtDate(shiftDate(0));
      content = <CustomerDashboard onNav={(v,id) => { if (v==='appointment-detail'){ setSelectedAppt(id); setCustomerView('appointment-detail'); } else setCustomerView(v); }} loading={loading} />;
    } else if (customerView === 'browse') {
      title = 'Browse barbers';
      content = <BrowseBarbers loading={loading} onSelectBarber={(id) => { setSelectedBarber(id); setCustomerView('barber-profile'); }} />;
    } else if (customerView === 'haircuts') {
      title = 'Haircuts';
      content = <CustomerHaircutGallery onBookHaircut={() => {
        setBookingBarber(null);
        setBookingSelection(null);
        setBookingReturnView('haircuts');
        setCustomerView('booking');
      }} />;
    } else if (customerView === 'barber-profile') {
      title = 'Barber profile';
      content = <BarberProfileScreen barberId={selectedBarber} onBack={() => setCustomerView('browse')} onBook={(id, selection = null) => { setBookingBarber(id); setBookingSelection(selection); setBookingReturnView('browse'); setCustomerView('booking'); }} />;
    } else if (customerView === 'booking') {
      title = 'Book an appointment';
      content = <BookingFlow initialBarberId={bookingBarber} initialSelection={bookingSelection} onCancel={() => setCustomerView(bookingReturnView)}
        onComplete={(appointment) => {
          addAppointment(appointment);
          setSelectedAppt(appointment.id);
          setCustomerView('appointment-detail');
        }} />;
    } else if (customerView === 'appointments') {
      title = 'Appointments';
      content = <CustomerAppointments loading={loading} onView={(id) => { setSelectedAppt(id); setCustomerView('appointment-detail'); }} />;
    } else if (customerView === 'appointment-detail') {
      title = 'Appointment details';
      content = <AppointmentDetail role="customer" appointmentId={selectedAppt} onBack={() => setCustomerView('appointments')} />;
    } else if (customerView === 'profile') {
      title = 'Profile';
      content = <CustomerProfile />;
    }
    return (
      <AppContext.Provider value={ctxValue}>
        <DashboardShell role="customer" active={['barber-profile','booking','appointment-detail'].includes(customerView) ? (customerView==='appointment-detail' ? 'appointments' : 'browse') : customerView}
          onNav={(v) => setCustomerView(v)} onLogout={handleLogout} title={title} subtitle={subtitle} customer={customer}>
          {content}
        </DashboardShell>
      </AppContext.Provider>
    );
  }

  /* ---- Barber flow ---- */
  if (screen === 'barber') {
    let content, title = 'Dashboard';
    if (barberView === 'dashboard') {
      title = 'Dashboard';
      content = <BarberDashboard loading={loading} onNav={setBarberView} />;
    } else if (barberView === 'appointments') {
      title = 'Appointments';
      content = <BarberAppointments onViewDetail={(id) => { setSelectedAppt(id); setBarberView('appointment-detail'); }} />;
    } else if (barberView === 'appointment-detail') {
      title = 'Appointment details';
      content = <AppointmentDetail role="barber" appointmentId={selectedAppt} onBack={() => setBarberView('appointments')} />;
    } else if (barberView === 'services') {
      title = 'Manage services';
      content = <ManageServices />;
    } else if (barberView === 'haircuts') {
      title = 'Haircut gallery';
      content = <BarberHaircuts />;
    } else if (barberView === 'availability') {
      title = 'Availability';
      content = <AvailabilitySettings />;
    } else if (barberView === 'profile') {
      title = 'Account';
      content = <BarberProfile />;
    }
    return (
      <AppContext.Provider value={ctxValue}>
        <DashboardShell role="barber" active={barberView === 'appointment-detail' ? 'appointments' : barberView}
          onNav={setBarberView} onLogout={handleLogout} title={title} barber={barber}>
          {content}
        </DashboardShell>
      </AppContext.Provider>
    );
  }

  return null;
}

function Root() {
  return (
    <ToastProvider>
      <AppRoot />
    </ToastProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
