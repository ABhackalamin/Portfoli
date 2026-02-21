// ── Section loader ─────────────────────────────────────────
// PHP-এর মতো include কাজ করবে, fetch দিয়ে HTML লোড করে

async function loadSection(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (!container) return;
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            container.innerHTML = await response.text();
        }
    } catch (e) {
        console.warn('Could not load section:', filePath);
    }
}

// ── Navigation ──────────────────────────────────────────────
function activateSection(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(n => n.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    const targetNav     = document.querySelector(`.nav-link[data-section="${sectionId}"]`);

    if (targetSection) targetSection.classList.add('active');
    if (targetNav)     targetNav.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {

    // Load all sub-sections 
    await loadSection('bio-container',          'assets/experience_academic_bio/experience_academic_bio.html');
    await loadSection('research-container',     'assets/research/research_experience.html');
    await loadSection('publications-container', 'assets/publications/publications.html');
    await loadSection('projects-container',     'assets/projects/projects.html');
    await loadSection('skills-container', 'assets/skills/skills.html');
    await loadSection('achievements-container', 'assets/achievements_awards/achievements_awards.html');
    await loadSection('extra-curricular-container', 'assets/extra_curricular_activities/extra_curricular_activities.html');
    await loadSection('youtube-container',      'assets/youtube/youtube.html');


    // ── Hamburger menu toggle ──────────────────────────────
    const hamburgerBtn    = document.getElementById('hamburgerBtn');
    const navLinksWrapper = document.getElementById('navLinksWrapper');

    if (hamburgerBtn && navLinksWrapper) {
        hamburgerBtn.addEventListener('click', function () {
            this.classList.toggle('open');
            navLinksWrapper.classList.toggle('open');
        });
    }

    // Navigation click events
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('data-section');
            history.pushState(null, '', '#' + id);
            activateSection(id);
            // Close mobile menu after clicking a link
            if (hamburgerBtn && navLinksWrapper) {
                hamburgerBtn.classList.remove('open');
                navLinksWrapper.classList.remove('open');
            }
        });
    });

    // Load from URL hash (direct link support)
    const hash = window.location.hash.substring(1);
    if (hash) {
        activateSection(hash);
    }

    // Browser back/forward button
    window.addEventListener('hashchange', function () {
        const id = window.location.hash.substring(1);
        if (id) activateSection(id);
    });
});
