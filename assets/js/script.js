// ── Section loader ─────────────────────────────────────────
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

// ── Highlight nav on scroll ─────────────────────────────────
function updateActiveNav() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const navHeight = document.querySelector('.top-nav').offsetHeight;

    let currentId = '';
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top - navHeight - 10;
        if (top <= 0) currentId = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === currentId);
    });
}

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {

    // Load all sub-sections
    await loadSection('bio-container',              'assets/experience_academic_bio/experience_academic_bio.html');
    await loadSection('research-container',         'assets/research/research_experience.html');
    await loadSection('publications-container',     'assets/publications/publications.html');
    await loadSection('projects-container',         'assets/projects/projects.html');
    await loadSection('skills-container',           'assets/skills/skills.html');
    await loadSection('achievements-container',     'assets/achievements_awards/achievements_awards.html');
    await loadSection('extra-curricular-container', 'assets/extra_curricular_activities/extra_curricular_activities.html');
    await loadSection('youtube-container',          'assets/youtube/youtube.html');

    // ── Hamburger menu toggle ──────────────────────────────
    const hamburgerBtn    = document.getElementById('hamburgerBtn');
    const navLinksWrapper = document.getElementById('navLinksWrapper');

    if (hamburgerBtn && navLinksWrapper) {
        hamburgerBtn.addEventListener('click', function () {
            this.classList.toggle('open');
            navLinksWrapper.classList.toggle('open');
        });
    }

    // ── Nav click → smooth scroll to section ──────────────
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id      = this.getAttribute('data-section');
            const target  = document.getElementById(id);
            const navH    = document.querySelector('.top-nav').offsetHeight;
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            // Close mobile menu
            if (hamburgerBtn && navLinksWrapper) {
                hamburgerBtn.classList.remove('open');
                navLinksWrapper.classList.remove('open');
            }
        });
    });

    // ── Scroll spy ────────────────────────────────────────
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav(); // run once on load

    // ── Hash on load ──────────────────────────────────────
    const hash = window.location.hash.substring(1);
    if (hash) {
        const target = document.getElementById(hash);
        const navH   = document.querySelector('.top-nav').offsetHeight;
        if (target) {
            setTimeout(() => {
                const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
                window.scrollTo({ top, behavior: 'smooth' });
            }, 100);
        }
    }
});
