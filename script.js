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

// ===== URBAN RELICS TAB SWITCHING (sidebar) =====
function switchUrbanTab(tabId, btn) {
    const layout = btn.closest('.urban-relics-layout');
    layout.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    layout.querySelectorAll('.tab-btn-side').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
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
        {
            lat: 41.3255, lng: 19.8153,
            name: 'Blloku',
            date: 'March 2024',
            desc: 'The hippest neighborhood in Tirana — cafes, bars, galleries and vibrant nightlife.'
        },
        {
            lat: 41.3360, lng: 19.8220,
            name: 'Liqeni i Thate',
            date: 'April 2024',
            desc: 'Beautiful artificial lake park — perfect for morning walks, yoga and sunset vibes.'
        },
        {
            lat: 41.3295, lng: 19.8195,
            name: 'Pazari i Ri',
            date: 'February 2024',
            desc: 'The new bazaar — fresh produce, artisan crafts, street food and local character.'
        },
        {
            lat: 41.3836, lng: 19.8583,
            name: 'Dajti',
            date: 'May 2024',
            desc: 'Mount Dajti — accessible by cable car. Hiking trails and panoramic city views.'
        },
        {
            lat: 41.3200, lng: 19.8100,
            name: 'Tirana e Re',
            date: 'January 2024',
            desc: 'Modern Tirana with contemporary architecture and urban energy.'
        },
        {
            lat: 41.3265, lng: 19.8172,
            name: 'Piramida',
            date: 'March 2024',
            desc: 'The iconic pyramid — reborn as a youth cultural center and creative hub.'
        },
        {
            lat: 41.3310, lng: 19.8255,
            name: 'Komuna e Parisit',
            date: 'June 2024',
            desc: 'Artsy neighborhood with murals, galleries, and quirky cafes tucked in leafy streets.'
        },
        {
            lat: 41.3288, lng: 19.8165,
            name: 'Sahati',
            date: 'December 2023',
            desc: 'The historic Clock Tower — the symbolic beating heart of old Tirana.'
        }
    ];

    const pinIcon = L.divIcon({
        className: '',
        html: `<div style="
            width:20px; height:28px;
            background:#E8524A;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            border:2.5px solid #fff;
            box-shadow:0 2px 8px rgba(0,0,0,0.28);
        "></div>`,
        iconSize: [20, 28],
        iconAnchor: [10, 28],
        popupAnchor: [0, -32]
    });

    pins.forEach(p => {
        L.marker([p.lat, p.lng], { icon: pinIcon })
            .addTo(mapInstance)
            .bindPopup(`
                <div style="font-family:'Inter',sans-serif;min-width:180px;padding:2px 0;">
                    <strong style="font-size:14px;color:#3D2B1F;">${p.name}</strong><br>
                    <span style="font-size:11px;color:#E5A100;font-weight:700;letter-spacing:0.5px;">${p.date}</span>
                    <p style="font-size:12px;color:#3D2B1F;margin-top:6px;line-height:1.5;">${p.desc}</p>
                </div>
            `, { maxWidth: 220 });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMap, 200);
});

// ===== SNAPS: ADD PHOTO =====
function addSnap(input) {
    if (!input.files || !input.files[0]) return;
    const url = URL.createObjectURL(input.files[0]);
    const item = document.createElement('div');
    item.className = 'snap-item';
    item.style.backgroundImage = `url(${url})`;
    item.innerHTML = `<div class="snap-overlay">
        <span class="snap-location">@ My Spot</span>
        <span class="snap-caption">New memory</span>
    </div>`;
    const grid = document.getElementById('snaps-grid');
    grid.insertBefore(item, grid.querySelector('.snap-add'));
    input.value = '';
}

// ===== FORM HANDLERS =====
function handleDropSpot(e) {
    e.preventDefault();
    showModal('Your spot has been submitted! The community will review it.');
    e.target.reset();
}

function handleJoinStep1(e) {
    e.preventDefault();
    document.getElementById('join-step1').style.display = 'none';
    document.getElementById('join-step2').style.display = 'block';
}

function handleInterests(e) {
    e.preventDefault();
    showModal('Welcome to the vibe! Check your email for confirmation.');
    e.target.reset();
    document.getElementById('join-step2').style.display = 'none';
    document.getElementById('join-step1').style.display = 'block';
}

// ===== MODAL =====
function showModal(text) {
    document.getElementById('modalText').textContent = text;
    document.getElementById('successModal').classList.add('show');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

document.addEventListener('click', e => {
    if (e.target.id === 'successModal') closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
