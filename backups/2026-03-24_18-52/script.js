/* ============================================
   ניצן - משהו מתוק | Product Catalog & UI Logic
   ============================================ */

let WHATSAPP_NUMBER = '9720505851612';
let WHATSAPP_MESSAGE = 'היי ניצן! ראיתי את הקטלוג ואשמח להזמין';
let siteSettings = null;

let products = [];

const fallbackProducts = [
  {
    id: 1,
    name: 'אלפחורס',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 60,
    image: 'images/alfachores.png',
    description: '10 יחידות אלפחורס עם מילוי דולסה דה לצ\'ה וקוקוס. עוגיית החמאה הקלאסית שנמסה בפה.'
  },
  {
    id: 2,
    name: 'עוגיות שוקולד חלב ובלונדי',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 95,
    image: 'images/cookies-blondi.png',
    badge: 'פופולרי',
    description: '5 יחידות קוטר 8 (גדולות). עוגיות שוקולד חלב ובלונדי - קריספי מבחוץ ורך מבפנים.'
  },
  {
    id: 3,
    name: 'מגולגלות נוטלה וקינדר',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 76,
    image: 'images/megulgalot-nutella.png',
    description: '12 יחידות מגולגלות במילוי נוטלה וקינדר. שכבות של בצק חמאה עם שוקולד - כל ביס הוא חוויה.'
  },
  {
    id: 4,
    name: 'מגולגלות קינדר',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 76,
    image: 'images/megulgalot-kinder.png',
    description: '12 יחידות מגולגלות קקאו במילוי קינדר. בצק שוקולד כהה עם שכבות קרם קינדר לבן.'
  },
  {
    id: 5,
    name: 'כדורי שוקולד',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 85,
    image: 'images/chocolate-balls.png',
    description: '20 יחידות כדורי שוקולד - קוקוס ושוקולד עם סוכריות צבעוניות. מושלם לאירוח ולמתנה.'
  },
  {
    id: 6,
    name: '6 עוגיות טעמים',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 160,
    image: 'images/cookies-6-flavors.png',
    badge: 'הנמכר ביותר',
    description: 'מבחר 6 עוגיות בטעמים: קינדר ונוטלה, חצי חצי, אמסטרדם, שוקולד קונפטי, 100% פיסטוק ופירות יער.'
  },
  {
    id: 7,
    name: 'מארז קייק פופס ועוגיות',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 200,
    image: 'images/box-cakepops.png',
    description: 'מארז מפנק עם עוגיות קרמל מלוח, נוטלה ושוקולד חלב לצד קייק פופס שוקולד חלב עם סרט ורוד.'
  },
  {
    id: 8,
    name: 'מארז מגולגלות ובראוניז',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 170,
    image: 'images/box-brownies-megulgalot.png',
    description: '16 מגולגלות קינדר + בראוניז 16x16 עם צ\'אנקים של שוקולד לבן ומריר וזילוף נוטלה.'
  },
  {
    id: 9,
    name: 'מארז עוגייה ענקית ומגולגלות',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 300,
    image: 'images/box-giant-cookie.png',
    description: 'עוגייה ענקית קוטר 16 עם מילוי ומלא תוספות + 16 יח\' מגולגלות קינדר. מתנה מרשימה!'
  },
  {
    id: 10,
    name: 'מארז יום הולדת',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 300,
    image: 'images/box-birthday.png',
    badge: 'ליום הולדת',
    description: 'מארז חגיגי עם עוגת שוקולד מעוצבת, מגולגלות נוטלה וקינדר, אלפחורס וקייק פופס. מושלם לחגיגה!'
  },
  {
    id: 11,
    name: 'מארז פרימיום',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 340,
    image: 'images/box-premium-340.png',
    badge: 'פרימיום',
    description: 'חיתוכיות שוקולד 16x16, כדורי קדאיף דובאי, 14 מגולגלות נוטלה וקינדר ועוגיות קראמבל פיסטוק עם ליבת שוקולד לבן.'
  },
  {
    id: 12,
    name: 'מארז VIP',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 450,
    image: 'images/box-premium-450.png',
    badge: 'VIP',
    description: 'המארז הגדול והמרשים ביותר! עוגיות קראמבל פיסטוק, מגולגלות, בראוניז פיסטוק, גלילי וופל ועוד. מתנה שלא שוכחים.'
  }
];

function createWhatsAppLink(productName) {
  const msg = encodeURIComponent(`${WHATSAPP_MESSAGE}: ${productName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function getWhatsAppBaseLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

const _imgCacheBust = Date.now();

function resolveImageUrl(path) {
  if (!path) return 'images/logo.png';
  if (path.startsWith('http')) return path;
  return `https://raw.githubusercontent.com/bakedbynitzan/bakedbynitzan/main/${path}?v=${_imgCacheBust}`;
}

function getProductImages(product) {
  if (product.images && product.images.length) return product.images.map(resolveImageUrl);
  if (product.image) return [resolveImageUrl(product.image)];
  return ['images/logo.png'];
}

function imgErrorFallback(img) {
  if (!img.dataset.retried) {
    img.dataset.retried = '1';
    const src = img.src.split('?')[0];
    img.src = src + '?v=' + Date.now();
  } else {
    img.src = 'images/logo.png';
  }
}

function formatPrice(product) {
  let priceStr = product.maxPrice
    ? `${product.price}-${product.maxPrice}`
    : `${product.price}`;
  return priceStr;
}

function formatPriceHTML(product, size = 'normal') {
  const priceStr = formatPrice(product);
  const noteStyle = size === 'large'
    ? 'font-size:0.55em;font-weight:400;color:#999;margin-right:4px;font-family:Heebo,sans-serif;'
    : 'font-size:0.7em;font-weight:400;color:#999;margin-right:4px;font-family:Heebo,sans-serif;';
  const note = product.priceNote
    ? `<span style="${noteStyle}">(${product.priceNote})</span>`
    : '';
  return `${priceStr} \u20AA ${note}`;
}

function createCarouselHTML(images, name) {
  if (images.length <= 1) {
    return `<div class="product-card-image">
      <img src="${images[0]}" alt="${name}" loading="lazy" onerror="imgErrorFallback(this)">
    </div>`;
  }
  const slides = images.map(src => `<div class="carousel-slide"><img src="${src}" alt="${name}" loading="lazy" onerror="imgErrorFallback(this)"></div>`).join('');
  const dots = images.map((_, i) => `<span class="carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`).join('');
  return `<div class="product-card-image carousel-container">
    <div class="carousel-track">${slides}</div>
    <div class="carousel-dots">${dots}</div>
  </div>`;
}

function initCardCarousel(card) {
  const track = card.querySelector('.carousel-track');
  if (!track) return;
  const dots = card.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  const slideCount = dots.length;

  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / track.offsetWidth);
    if (idx !== currentSlide && idx >= 0 && idx < slideCount) {
      currentSlide = idx;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(dot.dataset.idx);
      track.scrollTo({ left: idx * track.offsetWidth, behavior: 'smooth' });
    });
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category;
  const images = getProductImages(product);

  card.innerHTML = `
    ${createCarouselHTML(images, product.name)}
    ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
    <div class="product-card-content">
      <div class="product-card-category">${product.categoryLabel}</div>
      <h3 class="product-card-title">${product.name}</h3>
      <p class="product-card-description">${product.description}</p>
      <div class="product-card-footer">
        <span class="product-card-price">${formatPriceHTML(product)}</span>
        <a href="${createWhatsAppLink(product.name)}" class="product-card-order" target="_blank" rel="noopener" onclick="event.stopPropagation();">
          להזמנה
        </a>
      </div>
    </div>
  `;

  initCardCarousel(card);
  card.addEventListener('click', () => openModal(product));
  return card;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const loader = document.getElementById('productsLoading');
  if (loader) loader.remove();
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  filtered.forEach((product, i) => {
    const card = createProductCard(product);
    grid.appendChild(card);
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add('visible'), i * 60);
    });
  });
}

// --- Filters ---

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// --- Modal ---

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function isMobile() {
  return window.innerWidth <= 768;
}

function openMobileViewer(product) {
  const existing = document.getElementById('mobileViewer');
  if (existing) existing.remove();
  const images = getProductImages(product);

  const viewer = document.createElement('div');
  viewer.id = 'mobileViewer';
  Object.assign(viewer.style, {
    position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
    zIndex: '9999', background: '#fff', overflowY: 'scroll', WebkitOverflowScrolling: 'touch'
  });

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  Object.assign(closeBtn.style, {
    position: 'fixed', top: '12px', left: '12px', zIndex: '10000',
    width: '44px', height: '44px', borderRadius: '50%', border: 'none',
    background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '24px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  });

  let imageHTML;
  if (images.length === 1) {
    imageHTML = `<img src="${images[0]}" alt="${product.name}" style="display:block;width:100%;height:auto;" onerror="imgErrorFallback(this)">`;
  } else {
    const slides = images.map(src => `<div style="min-width:100%;width:100%;flex-shrink:0;scroll-snap-align:start;"><img src="${src}" alt="${product.name}" style="display:block;width:100%;height:auto;" onerror="imgErrorFallback(this)"></div>`).join('');
    const dots = images.map((_, i) => `<span class="mv-dot${i === 0 ? ' active' : ''}" style="width:8px;height:8px;border-radius:50%;background:${i === 0 ? '#000' : '#ccc'};transition:background 0.3s;"></span>`).join('');
    imageHTML = `
      <div id="mvTrack" style="display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;">${slides}</div>
      <style>#mvTrack::-webkit-scrollbar{display:none;}</style>
      <div id="mvDots" style="display:flex;justify-content:center;gap:6px;padding:10px 0;">${dots}</div>
    `;
  }

  const container = document.createElement('div');
  container.innerHTML = imageHTML;

  const info = document.createElement('div');
  Object.assign(info.style, { padding: '20px', fontFamily: "'Heebo', sans-serif", direction: 'rtl', textAlign: 'right' });
  info.innerHTML = `
    <div style="font-size:0.8rem;color:#999;letter-spacing:0.1em;margin-bottom:6px;">${product.categoryLabel}</div>
    <h3 style="font-family:'Frank Ruhl Libre',serif;font-size:1.5rem;font-weight:900;margin:0 0 12px;">${product.name}</h3>
    <p style="color:#666;font-size:0.95rem;line-height:1.7;margin:0 0 20px;">${product.description}</p>
    <div style="font-family:'Frank Ruhl Libre',serif;font-size:1.8rem;font-weight:900;margin-bottom:20px;">${formatPriceHTML(product, 'large')}</div>
    <a href="${createWhatsAppLink(product.name)}" target="_blank" rel="noopener"
       style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:16px;background:#000;color:#fff;text-decoration:none;border-radius:50px;font-size:1rem;font-weight:700;font-family:'Heebo',sans-serif;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      הזמינו עכשיו
    </a>
  `;

  function closeMobileViewer() {
    viewer.remove(); closeBtn.remove(); document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeMobileViewer);

  viewer.appendChild(container);
  viewer.appendChild(info);
  document.body.appendChild(viewer);
  document.body.appendChild(closeBtn);
  document.body.style.overflow = 'hidden';
  viewer.scrollTop = 0;

  if (images.length > 1) {
    const track = document.getElementById('mvTrack');
    const dots = document.querySelectorAll('.mv-dot');
    if (track && dots.length) {
      track.addEventListener('scroll', () => {
        const idx = Math.round(track.scrollLeft / track.offsetWidth);
        dots.forEach((d, i) => { d.style.background = i === idx ? '#000' : '#ccc'; d.classList.toggle('active', i === idx); });
      });
    }
  }
}

function openModal(product) {
  if (isMobile()) {
    openMobileViewer(product);
    return;
  }

  const images = getProductImages(product);
  const imgContainer = document.getElementById('modalImageWrapper');

  if (images.length === 1) {
    imgContainer.innerHTML = `<img class="modal-image" id="modalImage" src="${images[0]}" alt="${product.name}" onerror="imgErrorFallback(this)">`;
  } else {
    const slides = images.map(src => `<div class="modal-carousel-slide"><img src="${src}" alt="${product.name}" onerror="imgErrorFallback(this)"></div>`).join('');
    const dots = images.map((_, i) => `<span class="modal-carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`).join('');
    imgContainer.innerHTML = `
      <div class="modal-carousel-track" id="modalCarouselTrack">${slides}</div>
      <div class="modal-carousel-dots">${dots}</div>
      <button class="modal-carousel-arrow modal-carousel-prev" id="modalPrev">&#8250;</button>
      <button class="modal-carousel-arrow modal-carousel-next" id="modalNext">&#8249;</button>
    `;

    let currentIdx = 0;
    const track = document.getElementById('modalCarouselTrack');
    const allDots = imgContainer.querySelectorAll('.modal-carousel-dot');

    function goToSlide(idx) {
      currentIdx = idx;
      track.style.transform = `translateX(${idx * 100}%)`;
      allDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    document.getElementById('modalPrev').addEventListener('click', () => goToSlide((currentIdx - 1 + images.length) % images.length));
    document.getElementById('modalNext').addEventListener('click', () => goToSlide((currentIdx + 1) % images.length));
    allDots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.idx))));
  }

  document.getElementById('modalCategory').textContent = product.categoryLabel;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').innerHTML = formatPriceHTML(product, 'large');
  document.getElementById('modalOrderBtn').href = createWhatsAppLink(product.name);

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const mobileViewer = document.getElementById('mobileViewer');
  if (mobileViewer) {
    mobileViewer.remove();
    const closeBtn = document.querySelector('#mobileViewer + button, body > button:last-of-type');
    if (closeBtn) closeBtn.remove();
  }
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- Navbar scroll effect ---

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- Mobile Menu ---

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// --- Smooth scroll for anchor links ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- GitHub API helper ---

function decodeGhContent(base64) {
  const raw = atob(base64.replace(/\n/g, ''));
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function fetchFromGhApi(filePath) {
  const res = await fetch(`https://api.github.com/repos/bakedbynitzan/bakedbynitzan/contents/${filePath}`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) throw new Error('API ' + res.status);
  const data = await res.json();
  return JSON.parse(decodeGhContent(data.content));
}

async function fetchLocal(filePath) {
  const res = await fetch(filePath + '?v=' + Date.now());
  if (!res.ok) throw new Error('Local ' + res.status);
  return res.json();
}

// --- Load products (fast local first, then API update) ---

async function loadProductsData() {
  let rendered = false;

  try {
    products = await fetchLocal('products.json');
    renderProducts();
    rendered = true;
  } catch (e) { /* local not available yet */ }

  try {
    const apiProducts = await fetchFromGhApi('products.json');
    const changed = JSON.stringify(apiProducts) !== JSON.stringify(products);
    if (changed || !rendered) {
      products = apiProducts;
      renderProducts();
    }
  } catch (err) {
    if (!rendered) {
      products = fallbackProducts;
      renderProducts();
    }
  }
}

// --- Load & Apply Site Settings (fast local first, then API) ---

async function loadSiteSettings() {
  try {
    siteSettings = await fetchLocal('settings.json');
    applySiteSettings();
  } catch (e) { /* local not available yet */ }

  try {
    const apiSettings = await fetchFromGhApi('settings.json');
    const changed = JSON.stringify(apiSettings) !== JSON.stringify(siteSettings);
    if (changed || !siteSettings) {
      siteSettings = apiSettings;
      applySiteSettings();
    }
  } catch (err) {
    /* use whatever we have */
  }
}

function applySiteSettings() {
  if (!siteSettings) return;
  const s = siteSettings;

  if (s.whatsappNumber) WHATSAPP_NUMBER = s.whatsappNumber;
  if (s.whatsappMessage) WHATSAPP_MESSAGE = s.whatsappMessage;

  const waUrl = getWhatsAppBaseLink();
  document.querySelectorAll('.wa-link').forEach(el => el.href = waUrl);
  document.querySelectorAll('.wa-link-simple').forEach(el => el.href = `https://wa.me/${WHATSAPP_NUMBER}`);

  if (s.instagramUrl) {
    document.querySelectorAll('.ig-link').forEach(el => el.href = s.instagramUrl);
  }

  if (s.phone) {
    const phoneDigits = s.phone.replace(/[^0-9]/g, '');
    document.querySelectorAll('.phone-link').forEach(el => el.href = `tel:${phoneDigits}`);
    const p1 = document.getElementById('contactPhone1');
    const p2 = document.getElementById('contactPhone2');
    if (p1) p1.textContent = s.phone;
    if (p2) p2.textContent = s.phone;
  }

  if (s.instagramHandle) {
    const igH = document.getElementById('contactIgHandle');
    if (igH) igH.textContent = s.instagramHandle;
  }

  const setText = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };

  setText('heroTagline', s.heroTagline);
  if (s.location) {
    const heroLoc = document.getElementById('heroLocation');
    if (heroLoc) heroLoc.lastChild.textContent = ' ' + s.location;
    const contactLoc = document.getElementById('contactLocation');
    if (contactLoc) contactLoc.textContent = s.location;
  }
  setText('catalogTitle', s.catalogTitle);
  setText('catalogSubtitle', s.catalogSubtitle);
  setText('aboutTitle', s.aboutTitle);
  if (s.aboutText1) { const el = document.getElementById('aboutText1'); if (el) el.textContent = s.aboutText1; }
  if (s.aboutText2) { const el = document.getElementById('aboutText2'); if (el) el.textContent = s.aboutText2; }
  setText('aboutFeature1', s.aboutFeature1);
  setText('aboutFeature2', s.aboutFeature2);
  setText('aboutFeature3', s.aboutFeature3);
  setText('customOrderTitle', s.customOrderTitle);
  if (s.customOrderText) { const el = document.getElementById('customOrderText'); if (el) el.textContent = s.customOrderText; }

  const customWaMsg = encodeURIComponent(s.whatsappMessage ? s.whatsappMessage.replace('להזמין', 'לבנות מארז לפי תקציב אישי') : 'היי ניצן! אשמח לבנות מארז לפי תקציב אישי');
  document.querySelectorAll('.wa-link-custom').forEach(el => el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${customWaMsg}`);

  setText('faqTitle', s.faqTitle);

  if (s.faq && s.faq.length) {
    const faqList = document.getElementById('faqList');
    if (faqList) {
      faqList.innerHTML = '';
      s.faq.forEach(item => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
          <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
            <span>${item.q}</span>
            <svg class="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer"><p>${item.a}</p></div>
        `;
        faqList.appendChild(div);
      });
    }
  }

  if (s.allergenNotice) { const el = document.getElementById('allergenText'); if (el) el.textContent = s.allergenNotice; }

  setText('contactTitle', s.contactTitle);
  setText('contactSubtitle', s.contactSubtitle);
  if (s.footerText) { const el = document.getElementById('footerText'); if (el) el.innerHTML = s.footerText; }
}

// --- Scroll Reveal Animation ---

function initScrollReveal() {
  const elements = document.querySelectorAll('.about-content, .custom-order-box, .faq-list, .contact-cards, .section-title, .section-subtitle');
  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// --- Cookie Consent ---

function initCookieConsent() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  if (!banner) return;

  const consent = localStorage.getItem('cookie_consent');
  if (consent) return;

  setTimeout(() => banner.classList.add('visible'), 1500);

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    banner.classList.remove('visible');
    banner.classList.add('hidden');
  });

  declineBtn.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    banner.classList.remove('visible');
    banner.classList.add('hidden');
  });
}

// --- Init ---

loadSiteSettings();
loadProductsData();
initScrollReveal();
initCookieConsent();
