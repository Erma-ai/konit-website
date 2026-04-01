// ===== PAGE-BASED NAVIGATION =====
// Each section is its own "page" — clicking nav/buttons swaps visible page

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0; // scroll to top of new page
    }
    // Close any open mobile menus
    document.querySelectorAll('.nav-links').forEach(nl => nl.classList.remove('open'));
}

// ===== MOBILE MENU =====
function toggleMobile() {
    // Find the nav-links in the currently active page
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const navLinks = activePage.querySelector('.nav-links');
        if (navLinks) navLinks.classList.toggle('open');
    }
}

// ===== FORM HANDLERS =====
function handleDropSpot(e) {
    e.preventDefault();
    showModal('Your spot has been submitted! The community will review it.');
    e.target.reset();
}

function handleJoinStep1(e) {
    e.preventDefault();
    // Go to interests page
    showPage('interests');
}

function handleInterests(e) {
    e.preventDefault();
    showModal('Welcome to the vibe! Check your email for confirmation.');
    e.target.reset();
    // After closing modal, go back to home
}

// ===== MODAL =====
function showModal(text) {
    document.getElementById('modalText').textContent = text;
    document.getElementById('successModal').classList.add('show');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'successModal') closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        showPage('home');
    }
});
