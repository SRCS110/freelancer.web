class SiteNav extends HTMLElement {
  connectedCallback() {
    // Detect if page is located in /pages/ to route relative paths correctly
    const isSubpage = window.location.pathname.includes('/pages/');
    const indexPath = isSubpage ? '../index.html' : './index.html';
    const featuresPath = isSubpage ? 'features.html' : 'pages/features.html';
    const pricingPath = isSubpage ? 'pricing.html' : 'pages/pricing.html';
    const videoPath = isSubpage ? '../index.html#video-demo' : '#video-demo';
    const demoUrl = 'https://freelancer.srcs.online/index.html?demo=true';

    // Mark the current page's link so the active-state underline shows.
    const file = window.location.pathname.split('/').pop() || 'index.html';
    const current = (name) => (file === name ? ' aria-current="page"' : '');

    this.innerHTML = `
      <div class="nav-shade">
        <div class="nav-in">
          <a href="${indexPath}" class="brand">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>
              <b>Rogue OS</b>
              <em>by Sync Race Studios</em>
            </span>
          </a>

          <nav class="nav-links">
            <a href="${videoPath}">Tour</a>
            <a href="${featuresPath}"${current('features.html')}>Features</a>
            <a href="${pricingPath}"${current('pricing.html')}>Pricing</a>
          </nav>

          <button type="button" class="theme-btn" id="theme-toggle" aria-pressed="false" onclick="toggleSiteTheme()">
            <span id="theme-toggle-label">light</span>
          </button>

          <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="nav-cta">Try the demo ↗</a>

          <button type="button" class="nav-toggle" aria-label="Toggle menu" onclick="this.closest('site-nav').toggleAttribute('data-open')">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
    updateThemeToggleUI();
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const isSubpage = window.location.pathname.includes('/pages/');
    const privacyPath = isSubpage ? 'privacy.html' : 'pages/privacy.html';

    this.innerHTML = `
      <footer class="foot">
        <div class="shell">
          <p>© 2026 Sync Race Studios LLC dba Rogue OS. All rights reserved.</p>
          <div class="actions">
            <a href="${privacyPath}">Privacy</a>
            <span>·</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);

// THEME TOGGLE LOGIC
function toggleSiteTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('sr-theme', isDark ? 'dark' : 'light');
  updateThemeToggleUI();
}

function updateThemeToggleUI() {
  const isDark = document.documentElement.classList.contains('dark');
  const label = document.getElementById('theme-toggle-label');
  const button = document.getElementById('theme-toggle');
  if (label) label.textContent = isDark ? 'dark' : 'light';
  if (button) button.setAttribute('aria-pressed', String(isDark));
}

class CookieConsent extends HTMLElement {
  connectedCallback() {
    // Do not display if user has already accepted or denied cookies
    if (localStorage.getItem('cookie-consent')) return;

    const isSubpage = window.location.pathname.includes('/pages/');
    const privacyPath = isSubpage ? 'privacy.html' : 'pages/privacy.html';

    this.innerHTML = `
      <div id="cookie-banner" class="cookie-banner">
        <h4><span class="brand-mark" aria-hidden="true"></span>Cookie Preferences</h4>
        <p>
          We use essential cookies and collect traffic diagnostics to ensure session security and app performance. We never sell or share your data. Read our <a href="${privacyPath}">Privacy Policy</a>.
        </p>
        <div class="cookie-actions">
          <button id="cookie-deny" type="button" onclick="handleCookieChoice('denied')">Deny</button>
          <button id="cookie-accept" type="button" class="accept" onclick="handleCookieChoice('accepted')">Accept All</button>
        </div>
      </div>
    `;
  }
}

customElements.define('cookie-consent', CookieConsent);

// Handle Cookie Consent Choice
function handleCookieChoice(status) {
  localStorage.setItem('cookie-consent', status);
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 200);
  }

  // Optional: Trigger analytics or non-essential cookies here if accepted
  if (status === 'accepted') {
    // enableAnalytics();
  } else {
    // disableNonEssentialCookies();
  }
}
