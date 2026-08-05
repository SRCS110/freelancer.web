class SiteNav extends HTMLElement {
  connectedCallback() {
    // Detect if page is located in /pages/ to route relative paths correctly
    const isSubpage = window.location.pathname.includes('/pages/');
    const indexPath = isSubpage ? '../index.html' : './index.html';
    const featuresPath = isSubpage ? 'features.html' : 'pages/features.html';
    const pricingPath = isSubpage ? 'pricing.html' : 'pages/pricing.html';
    const videoPath = isSubpage ? '../index.html#video-demo' : '#video-demo';
    const demoUrl = 'https://freelancer.srcs.online/index.html?demo=true';

    this.innerHTML = `
      <header class="sticky top-0 z-50 backdrop-blur-md bg-[#FAFAF9]/90 border-b border-[#1C1C1E]/5 px-6 py-4">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <!-- LOGO (Steps out of /pages/ up to root index.html) -->
          <a href="${indexPath}" class="font-mono text-xl font-bold tracking-wider uppercase text-[#1C1C1E] flex items-center gap-2 group">
            <span class="w-2.5 h-2.5 rounded-full bg-[#059669] group-hover:scale-125 transition-transform"></span>
            ROGUE <span class="text-[#059669] text-xs font-normal">[OS]</span>
          </a>

          <!-- NAVIGATION LINKS -->
          <nav class="flex flex-wrap items-center gap-2 font-mono text-sm">
            <a href="${videoPath}" class="px-3 py-1.5 rounded text-[#6B7280] hover:bg-[#F5F4F2] hover:text-[#1C1C1E] transition-all">tour</a>
            <a href="${featuresPath}" class="px-3 py-1.5 rounded text-[#6B7280] hover:bg-[#F5F4F2] hover:text-[#1C1C1E] transition-all">features</a>
            <a href="${pricingPath}" class="px-3 py-1.5 rounded text-[#6B7280] hover:bg-[#F5F4F2] hover:text-[#1C1C1E] transition-all">pricing</a>
            <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded bg-[#059669]/10 text-[#059669] hover:bg-[#059669] hover:text-white font-bold transition-all">!demo ↗</a>
            
          </nav>

        </div>
      </header>
    `;
    updateThemeToggleUI();
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const isSubpage = window.location.pathname.includes('/pages/');
    const privacyPath = isSubpage ? 'privacy.html' : 'pages/privacy.html';

    this.innerHTML = `
      <footer class="border-t border-[#1C1C1E]/5 py-12 bg-[#F5F4F2]/50 text-xs text-[#6B7280]">
        <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Sync Race Studios LLC dba Rogue OS. All rights reserved.</p>
          <div class="flex items-center space-x-6 font-mono">
            <a href="${privacyPath}" class="hover:text-[#1C1C1E] transition-colors">/privacy</a>
            <span>•</span>
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
      <div id="cookie-banner" class="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 bg-[#1C1C1E] text-[#FAFAF9] p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md font-sans text-xs">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#059669]"></span>
            <h4 class="font-mono font-bold tracking-wider uppercase text-xs text-white">Cookie Preferences</h4>
          </div>
        </div>
        
        <p class="text-zinc-400 leading-relaxed mb-4">
          We use essential cookies and collect traffic diagnostics to ensure session security and app performance. We never sell or share your data. Read our <a href="${privacyPath}" class="text-[#059669] underline hover:text-emerald-400">Privacy Policy</a>.
        </p>

        <div class="flex items-center justify-end gap-2 font-mono">
          <button 
            id="cookie-deny" 
            onclick="handleCookieChoice('denied')"
            class="px-3.5 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
            Deny
          </button>
          <button 
            id="cookie-accept" 
            onclick="handleCookieChoice('accepted')"
            class="px-4 py-2 rounded-lg bg-[#059669] text-white font-medium hover:bg-[#047857] transition-all">
            Accept All
          </button>
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
    banner.style.transition = 'opacity 0.2s ease-out';
    setTimeout(() => banner.remove(), 200);
  }

  // Optional: Trigger analytics or non-essential cookies here if accepted
  if (status === 'accepted') {
    // enableAnalytics();
  } else {
    // disableNonEssentialCookies();
  }
}
