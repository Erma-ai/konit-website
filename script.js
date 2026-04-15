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

// ===== SHOP: PRODUCT DETAIL =====
const PRODUCTS = {
    'tshirt-1': { name: 'TIRONA',              price: 35, img: 'assets/tshirt-tirona.jpg',    category: 'tshirts', desc: 'Premium white sweatshirt with the Tirona \u2014 hart\u00EB eksperjencash graphic. Soft cotton blend, cozy fit, made for every season in the city.' },
    'tshirt-2': { name: 'KONIT LOGO',          price: 28, img: 'assets/tshirt-konit.jpg',     category: 'tshirts', desc: 'Oversized KONIT logo tee in black on white. Heavyweight cotton, screen-printed in Tirana. A bold statement piece.' },
    'tshirt-3': { name: "HAJDE N'SOF\u00CBR",  price: 30, img: 'assets/tshirt-hajde.jpg',     category: 'tshirts', desc: 'Back-print tee celebrating the Albanian table. Relaxed oversized fit, 100% cotton, hand-illustrated design.' },
    'tshirt-4': { name: 'EDHE PAK...',         price: 30, img: 'assets/tshirt-edhepak.jpg',   category: 'tshirts', desc: 'Albanian coffee culture tee. Oversized fit, cream cotton, green back-print design. For the ones who always stay for one more.' },
    'tote-1':   { name: 'TIRONA',              price: 18, img: 'assets/tote-tirona.jpg',      category: 'totes',   desc: 'Canvas tote bag with the blue Tirona cityscape print \u2014 "Tirone lind, nuk bohesh". Sturdy cotton, long handles, everyday essential.' },
    'tote-2':   { name: 'K\u00D2NIT HOUSES',   price: 20, img: 'assets/tote-konit-houses.jpg', category: 'totes',   desc: 'Colorful houses pattern tote with the K\u00D2NIT wordmark. Heavyweight canvas, screen-printed design.' },
    'tote-3':   { name: 'GIRL POWER',          price: 22, img: 'assets/tote-girlpower.jpg',   category: 'totes',   desc: 'Statement tote \u2014 K\u00D2NIT Girl Power, Llafe pa fund. Bright yellow handles, cartoon illustration print. Loud and proud.' },
    'tote-4':   { name: 'EDHE PAK...',         price: 20, img: 'assets/tote-edhepak.jpg',     category: 'totes',   desc: 'Cream canvas tote with the Edhe pak... coffee illustration. Perfect companion for caf\u00E9 mornings.' }
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

    document.getElementById('fits-tshirts').style.display = 'none';
    document.getElementById('fits-totes').style.display = 'none';
    document.getElementById('product-detail').style.display = 'block';
}

function closeProduct() {
    document.getElementById('product-detail').style.display = 'none';
    document.getElementById('fits-' + lastProductCategory).style.display = 'block';
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
        showModal('Pick a size', 'Please choose a size before adding to cart.');
        return;
    }
    const sizeTxt = needsSize ? 'size ' + currentSize + ', ' : '';
    showModal('Added to cart', p.name + ' (' + sizeTxt + 'qty ' + currentQty + ') has been added to your cart.');
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
});

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
    showModal('Faleminderit!', 'Your spot has been submitted! The community will review it.');
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
