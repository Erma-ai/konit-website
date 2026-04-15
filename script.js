// ===== SMOOTH SCROLL =====
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ===== MOBILE MENU =====
function toggleMobile() {
    document.getElementById('nav-links').classList.toggle('open');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active');
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ===== TAB SWITCHING (City Pulse, Memory Box) =====
function switchTab(tabId, btn) {
    const parent = btn.closest('.section-content');
    parent.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
    if (tabId === 'grid-tab') setTimeout(initMap, 50);
}

// ===== URBAN RELICS TAB SWITCHING =====
function switchUrbanTab(tabId, btn) {
    const layout = btn.closest('.urban-relics-layout');
    layout.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    layout.querySelectorAll('.tab-btn-side').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// ===== HOT SPOTS CAROUSEL =====
function openCarousel(category) {
    document.getElementById('hotspots-grid').style.display = 'none';
    document.getElementById('carousel-' + category).style.display = 'block';
}

function closeCarousel(category) {
    document.getElementById('carousel-' + category).style.display = 'none';
    document.getElementById('hotspots-grid').style.display = 'grid';
}

// ===== CAROUSEL CARD SELECT (enlarge on click) =====
function selectCarouselCard(card) {
    const track = card.closest('.carousel-track');
    const wasSelected = card.classList.contains('selected');
    track.querySelectorAll('.carousel-card').forEach(c => c.classList.remove('selected'));
    if (!wasSelected) {
        card.classList.add('selected');
    }
}

// ===== URBAN RELICS: FITS CATEGORY VIEW =====
function openFitsCategory(category) {
    document.getElementById('fits-main').style.display = 'none';
    document.getElementById('fits-' + category).style.display = 'block';
}

function closeFitsCategory(category) {
    document.getElementById('fits-' + category).style.display = 'none';
    document.getElementById('fits-main').style.display = 'block';
}

// ===== URBAN RELICS: URBAN GEAR CATEGORY VIEW =====
function openGearCategory(category) {
    document.getElementById('gear-main').style.display = 'none';
    document.getElementById('gear-' + category).style.display = 'block';
}

function closeGearCategory(category) {
    document.getElementById('gear-' + category).style.display = 'none';
    document.getElementById('gear-main').style.display = 'block';
}

// ===== URBAN RELICS: CREATIVE TOOLS CATEGORY VIEW =====
function openCreativeCategory(category) {
    document.getElementById('creative-main').style.display = 'none';
    document.getElementById('creative-' + category).style.display = 'block';
}

function closeCreativeCategory(category) {
    document.getElementById('creative-' + category).style.display = 'none';
    document.getElementById('creative-main').style.display = 'block';
}

// ===== SHOP: PRODUCT DETAIL =====
const PRODUCTS = {
    'tshirt-1': { name: 'TIRONA',              price: 35, img: 'assets/tshirt-tirona.jpg',    category: 'tshirts', desc: 'Premium white sweatshirt with the Tirona \u2014 hart\u00EB eksperjencash graphic. Soft cotton blend, cozy fit, made for every season in the city.' },
    'tshirt-2': { name: 'KONIT LOGO',          price: 28, img: 'assets/tshirt-konit.jpg',     category: 'tshirts', desc: 'Oversized KONIT logo tee in black on white. Heavyweight cotton, screen-printed in Tirana. A bold statement piece.' },
    'tshirt-3': { name: "HAJDE N'SOF\u00CBR",  price: 30, img: 'assets/tshirt-hajde.jpg',     category: 'tshirts', desc: 'Back-print tee celebrating the Albanian table. Relaxed oversized fit, 100% cotton, hand-illustrated design.' },
    'tshirt-4': { name: 'EDHE PAK...',         price: 30, img: 'assets/tshirt-edhepak.jpg',   category: 'tshirts', desc: 'Albanian coffee culture tee. Oversized fit, cream cotton, green back-print design. For the ones who always stay for one more.' },
    'tote-1':   { name: 'TIRONA',              price: 18, img: 'assets/tote-tirona.jpg',      category: 'totes',   desc: 'Canvas tote bag with the blue Tirona cityscape print \u2014 "Tirone lind, nuk bohesh". Sturdy cotton, long handles, everyday essential.' },
    'tote-2':   { name: 'K\u00D2NIT HOUSES',   price: 20, img: 'assets/tote-konit-houses.jpg', category: 'totes',   desc: 'Colorful houses pattern tote with the K\u00D2NIT wordmark. Heavyweight canvas, screen-printed design.' },
    'tote-3':   { name: 'GIRL POWER',          price: 22, img: 'assets/tote-girlpower.jpg',   category: 'totes',   desc: 'Statement tote \u2014 K\u00D2NIT Girl Power, Llafe pa fund. Bright yellow handles, cartoon illustration print. Loud and proud.' },
    'tote-4':   { name: 'EDHE PAK...',         price: 20, img: 'assets/tote-edhepak.jpg',     category: 'totes',   desc: 'Cream canvas tote with the Edhe pak... coffee illustration. Perfect companion for caf\u00E9 mornings.' },
    'sock-1':   { name: 'SKATE CREW',          price: 12, img: 'assets/sock-skate.jpg',       category: 'socks',   desc: 'White crew socks with a bold skate illustration. Cushioned cotton blend, made for all-day comfort.' },
    'sock-2':   { name: 'K\u00D2NIT YELLOW',   price: 14, img: 'assets/sock-konit-yellow.jpg',category: 'socks',   desc: 'Yellow K\u00D2NIT logo socks. Ribbed cotton, bold black graphic, branded kraft wrap packaging.' },
    'sock-3':   { name: 'MUSICIAN',            price: 15, img: 'assets/sock-musician.jpg',    category: 'socks',   desc: 'Long-cut socks with a hand-drawn musician design. Soft, stretchy, made for good vibes.' },
    'sock-4':   { name: 'K\u00D2NIT TRIO PACK',price: 35, img: 'assets/sock-trio.jpg',        category: 'socks',   desc: 'Three-pair K\u00D2NIT sock set \u2014 red logo, musician, and character prints. Best value, best vibes.' },
    'hat-1':    { name: 'TIRONA',              price: 30, img: 'assets/hat-tirona.jpg',      category: 'hats',    desc: 'Navy & cream two-tone snapback with the red Tirona tower and gold sun print. Structured crown, flat brim, adjustable back.' },
    'hat-2':    { name: 'K\u00D2NIT BLUE',     price: 25, img: 'assets/hat-konit-blue.jpg',  category: 'hats',    desc: 'Royal blue curved-brim cap with embroidered white K\u00D2NIT wordmark and logo. Classic six-panel fit, everyday staple.' },
    'hat-3':    { name: 'HAJDE NAMI',          price: 25, img: 'assets/hat-hajde.jpg',       category: 'hats',    desc: 'Washed blue dad cap with gold embroidery \u2014 "Hajde mo, me EC Konit bohet nami". Soft unstructured crown, curved brim.' },
    'hat-4':    { name: '\u00D2 LOGO',         price: 25, img: 'assets/hat-o-green.jpg',     category: 'hats',    desc: 'Forest green dad cap with the red \u00D2 patch \u2014 clean, bold, unmistakable. Washed cotton, vintage-feel brim.' },
    'sticker-1': { name: 'LLAFE PACK',         price: 8,  img: 'assets/stickers-llafe.jpg',  category: 'stickers', desc: 'Albanian slang sticker pack \u2014 "LLAFE S\u2019KA, EC K\u00D2NIT", "DY LBI K\u00D2NIT", "U HAP\u00CBT FARE", "ORA 00:00 K\u00D2NIT" and more. 8 kiss-cut vinyl stickers, weatherproof.' },
    'sticker-2': { name: 'VIBES PACK',         price: 8,  img: 'assets/stickers-vibes.jpg',  category: 'stickers', desc: 'Chill-mood sticker pack \u2014 coffee, music, yoga, art, groceries, and the K\u00D2NIT horseman. 8 kiss-cut vinyl stickers, weatherproof.' },
    'sticker-3': { name: 'GIRL POWER PACK',    price: 8,  img: 'assets/stickers-girlpower.jpg',category: 'stickers',desc: 'Bold expression pack \u2014 DJ LULE, GIRL POWER, LLAFE PA FUND, HAP PAS HAPI, warrior yoga. 8 kiss-cut vinyl stickers, weatherproof.' },
    'notebook-1': { name: 'TIRONA',            price: 15, img: 'assets/notebook-tirona.jpg', category: 'notebooks', desc: 'Hardcover Tirona notebook with the "Hart\u00EB Eksperiencash" cover illustration. 120 dotted pages, elastic closure, ribbon bookmark \u2014 for journaling the city.' },
    'notebook-2': { name: 'K\u00D2NIT PATTERN',price: 14, img: 'assets/notebook-pattern.jpg',category: 'notebooks', desc: 'Softcover notebook with a black-and-white K\u00D2NIT sleeve over the houses-pattern cover. 96 lined pages, lay-flat binding, carry-anywhere size.' },
    'notebook-3': { name: 'K\u00D2NIT VIBES',  price: 18, img: 'assets/notebook-vibes.jpg',  category: 'notebooks', desc: 'Premium orange hardcover with the \u00D2 logo and K\u00D2NIT VIBES wordmark. 180 blank pages, cloth-bound spine, heavyweight paper \u2014 made to last.' },
    'pencilcase-1': { name: '\u00D2 POUCH',          price: 16, img: 'assets/pencilcase-o.jpg',            category: 'pencilcases', desc: 'Yellow canvas tube pencil case with the \u00D2 logo and sticker-art prints \u2014 the dreamer, the yogi, the llafexhi girl. Zip closure, purple trim, holds pens, brushes, and everything in between.' },
    'pencilcase-2': { name: 'K\u00D2NIT WRITING SET',price: 20, img: 'assets/pencilcase-writing-set.jpg', category: 'pencilcases', desc: 'K\u00D2NIT Writing Set \u2014 three premium click pens with matching prints (cherry, red-and-pink stripe, yellow polka dot), gold clips and tips. Gel-ink refill, 0.7 mm. Packaged ready to gift.' }
};

// Maps a product category to the Urban Relics side-tab it lives under.
const CATEGORY_ROOT = {
    tshirts: 'fits', totes: 'fits', socks: 'fits', hats: 'fits',
    stickers: 'gear',
    notebooks: 'creative', pencilcases: 'creative'
};

let lastProductCategory = 'tshirts';

let currentProduct = null;
let currentQty = 1;
let currentSize = null;

function openProduct(productId) {
    const p = PRODUCTS[productId];
    if (!p) return;
    currentProduct = productId;
    currentQty = 1;
    currentSize = null;
    lastProductCategory = p.category || 'tshirts';

    document.getElementById('product-detail-name').textContent = p.name;
    document.getElementById('product-detail-price').textContent = '\u20AC' + p.price;
    document.getElementById('product-detail-desc').textContent = p.desc;
    document.getElementById('product-qty').textContent = '1';
    const imgEl = document.getElementById('product-detail-img');
    imgEl.style.backgroundImage = 'url(\'' + p.img + '\')';
    imgEl.classList.remove('placeholder-img');
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));

    const sizeGroup = document.getElementById('size-group');
    if (sizeGroup) sizeGroup.style.display = (lastProductCategory === 'tshirts') ? 'flex' : 'none';

    // Hide every category sub-panel across both roots, then show the shared detail view.
    ['fits-tshirts','fits-totes','fits-socks','fits-hats','gear-stickers','creative-notebooks','creative-pencilcases'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    // Hide the currently-active tab's content so the buy view stands alone.
    document.querySelector('.urban-relics-content').classList.add('buying');
    document.getElementById('product-detail').style.display = 'block';
}

function closeProduct() {
    document.getElementById('product-detail').style.display = 'none';
    document.querySelector('.urban-relics-content').classList.remove('buying');
    const root = CATEGORY_ROOT[lastProductCategory] || 'fits';
    const panelId = root + '-' + lastProductCategory;
    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = 'block';
}

function selectSize(btn) {
    btn.closest('.size-options').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSize = btn.textContent.trim();
}

function changeQty(delta) {
    currentQty = Math.max(1, currentQty + delta);
    document.getElementById('product-qty').textContent = currentQty;
}

function addToCart() {
    const p = PRODUCTS[currentProduct];
    const needsSize = (lastProductCategory === 'tshirts');
    if (needsSize && !currentSize) {
        showToast('Pick a size first', 'error');
        return;
    }
    const sizeTxt = needsSize ? ' (' + currentSize + ')' : '';
    showToast('Added to cart \u2014 ' + p.name + sizeTxt + ' \u00D7' + currentQty, 'success');
}

function buyNow() {
    const p = PRODUCTS[currentProduct];
    const needsSize = (lastProductCategory === 'tshirts');
    if (needsSize && !currentSize) {
        showModal('Pick a size', 'Please choose a size before checking out.');
        return;
    }
    const total = (p.price * currentQty).toFixed(2);
    const sizeTxt = needsSize ? ' (size ' + currentSize + ')' : '';
    showModal('Order placed!', p.name + ' x' + currentQty + sizeTxt + '\nTotal: \u20AC' + total + '\nCheck your email for confirmation.');
}

// ===== PULSE EVENT VIEWS =====
function openPulseEvent(category) {
    document.getElementById('pulse-grid').style.display = 'none';
    document.getElementById('pulse-' + category).style.display = 'block';
}

function closePulseEvent(category) {
    document.getElementById('pulse-' + category).style.display = 'none';
    document.getElementById('pulse-grid').style.display = 'grid';
}

// ===== TIRANA MAP =====
let mapInstance = null;

function initMap() {
    if (mapInstance) {
        mapInstance.invalidateSize();
        return;
    }

    mapInstance = L.map('tirana-map', { zoomControl: true }).setView([41.3275, 19.8187], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    const pins = [
        { lat: 41.3255, lng: 19.8153, name: 'Blloku', date: 'March 2024', desc: 'The hippest neighborhood in Tirana \u2014 cafes, bars, galleries and vibrant nightlife.' },
        { lat: 41.3360, lng: 19.8220, name: 'Liqeni i Thate', date: 'April 2024', desc: 'Beautiful artificial lake park \u2014 perfect for morning walks, yoga and sunset vibes.' },
        { lat: 41.3295, lng: 19.8195, name: 'Pazari i Ri', date: 'February 2024', desc: 'The new bazaar \u2014 fresh produce, artisan crafts, street food and local character.' },
        { lat: 41.3836, lng: 19.8583, name: 'Dajti', date: 'May 2024', desc: 'Mount Dajti \u2014 accessible by cable car. Hiking trails and panoramic city views.' },
        { lat: 41.3200, lng: 19.8100, name: 'Tirana e Re', date: 'January 2024', desc: 'Modern Tirana with contemporary architecture and urban energy.' },
        { lat: 41.3265, lng: 19.8172, name: 'Piramida', date: 'March 2024', desc: 'The iconic pyramid \u2014 reborn as a youth cultural center and creative hub.' },
        { lat: 41.3310, lng: 19.8255, name: 'Komuna e Parisit', date: 'June 2024', desc: 'Artsy neighborhood with murals, galleries, and quirky cafes tucked in leafy streets.' },
        { lat: 41.3288, lng: 19.8165, name: 'Sahati', date: 'December 2023', desc: 'The historic Clock Tower \u2014 the symbolic beating heart of old Tirana.' }
    ];

    const pinIcon = L.divIcon({
        className: '',
        html: '<div style="width:20px;height:28px;background:#E8524A;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.28);"></div>',
        iconSize: [20, 28],
        iconAnchor: [10, 28],
        popupAnchor: [0, -32]
    });

    pins.forEach(p => {
        L.marker([p.lat, p.lng], { icon: pinIcon })
            .addTo(mapInstance)
            .bindPopup(
                '<div style="font-family:Inter,sans-serif;min-width:180px;padding:2px 0;">' +
                '<strong style="font-size:14px;color:#3D2B1F;">' + p.name + '</strong><br>' +
                '<span style="font-size:11px;color:#E5A100;font-weight:700;letter-spacing:0.5px;">' + p.date + '</span>' +
                '<p style="font-size:12px;color:#3D2B1F;margin-top:6px;line-height:1.5;">' + p.desc + '</p>' +
                '</div>',
                { maxWidth: 220 }
            );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMap, 200);
    initScrollReveals();
    initCarouselArrows();
});

// ===== CAROUSEL SCROLL ARROWS =====
function initCarouselArrows() {
    document.querySelectorAll('.carousel-track').forEach(track => {
        // Wrap track in a positioning container
        const wrap = document.createElement('div');
        wrap.className = 'carousel-wrap';
        track.parentNode.insertBefore(wrap, track);
        wrap.appendChild(track);

        const prev = document.createElement('button');
        prev.className = 'carousel-arrow prev';
        prev.type = 'button';
        prev.setAttribute('aria-label', 'Scroll left');
        prev.innerHTML = '&lsaquo;';

        const next = document.createElement('button');
        next.className = 'carousel-arrow next';
        next.type = 'button';
        next.setAttribute('aria-label', 'Scroll right');
        next.innerHTML = '&rsaquo;';

        wrap.appendChild(prev);
        wrap.appendChild(next);

        const getStep = () => {
            const first = track.querySelector('.carousel-card, .product-card');
            if (!first) return 200;
            const style = getComputedStyle(track);
            const gap = parseFloat(style.columnGap || style.gap || '20') || 20;
            return first.getBoundingClientRect().width + gap;
        };

        prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
        next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));

        const updateArrows = () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (maxScroll <= 4) {
                prev.setAttribute('disabled', '');
                next.setAttribute('disabled', '');
                return;
            }
            if (track.scrollLeft <= 2) prev.setAttribute('disabled', '');
            else prev.removeAttribute('disabled');
            if (track.scrollLeft >= maxScroll - 2) next.setAttribute('disabled', '');
            else next.removeAttribute('disabled');
        };

        track.addEventListener('scroll', updateArrows, { passive: true });
        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 100);
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveals() {
    // 1. Split page titles into character spans for char-by-char reveal
    document.querySelectorAll('.page-title').forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        const frag = document.createDocumentFragment();
        [...text].forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            span.style.transitionDelay = (i * 0.035) + 's';
            frag.appendChild(span);
        });
        title.appendChild(frag);
    });

    // 2. Tag cards/content blocks for fade-up reveal
    const revealTargets = document.querySelectorAll(
        '.spot-card, .carousel-card, .product-card, .pulse-card, ' +
        '.snap-item, .form-container, .event-layout, ' +
        '.urban-relics-layout, #tirana-map'
    );
    revealTargets.forEach((el, i) => {
        el.classList.add('reveal-up');
        // stagger siblings in the same parent
        const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c === el || c.classList.contains('reveal-up')) : [el];
        const idx = siblings.indexOf(el);
        el.style.setProperty('--reveal-delay', (Math.min(idx, 6) * 0.08) + 's');
    });

    // 3. IntersectionObserver — trigger animations when elements enter viewport
    if (!('IntersectionObserver' in window)) {
        // Fallback: show everything immediately
        document.querySelectorAll('.page-title').forEach(t => t.classList.add('revealed'));
        document.querySelectorAll('.reveal-up').forEach(t => t.classList.add('visible'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('page-title')) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.add('visible');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.page-title, .reveal-up').forEach(el => revealObserver.observe(el));
}

// ===== SNAPS: ADD PHOTO =====
function addSnap(input) {
    if (!input.files || !input.files[0]) return;
    var url = URL.createObjectURL(input.files[0]);
    var item = document.createElement('div');
    item.className = 'snap-item';
    item.style.backgroundImage = 'url(' + url + ')';
    item.innerHTML = '<div class="snap-overlay"><span class="snap-location">@ My Spot</span><span class="snap-caption">New memory</span></div>';
    var grid = document.getElementById('snaps-grid');
    grid.insertBefore(item, grid.querySelector('.snap-add'));
    input.value = '';
}

// ===== FORM HANDLERS =====
function handleDropSpot(e) {
    e.preventDefault();
    showModal('Thank you!', 'Your spot has been submitted! The community will review it.');
    e.target.reset();
}

function handleJoinStep1(e) {
    e.preventDefault();
    document.getElementById('join-step1').style.display = 'none';
    document.getElementById('join-step2').style.display = 'block';
}

function handleInterests(e) {
    e.preventDefault();
    showModal('Welcome to the vibe!', 'You are deeply appreciated.\nCheck your email for the confirmation.');
    e.target.reset();
    document.getElementById('join-step2').style.display = 'none';
    document.getElementById('join-step1').style.display = 'block';
}

// ===== MODAL =====
function showModal(title, text) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').textContent = text;
    document.getElementById('successModal').classList.add('show');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

document.addEventListener('click', function(e) {
    if (e.target.id === 'successModal') closeModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// ============================================================
// UI/UX POLISH
// ============================================================

// ----- Scroll progress + navbar scrolled state + back-to-top visibility -----
(function initScrollUX() {
    const progress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('main-nav');
    const backToTop = document.getElementById('back-to-top');
    let ticking = false;

    function update() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progress) progress.style.width = pct + '%';
        if (navbar) navbar.classList.toggle('scrolled', scrollTop > 60);
        if (backToTop) backToTop.classList.toggle('visible', scrollTop > 400);
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
})();

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----- Toast notifications -----
function showToast(message, type) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.textContent = message;
    container.appendChild(toast);
    // Remove after exit animation completes (2.5s delay + 0.25s animation).
    setTimeout(() => toast.remove(), 2800);
}
