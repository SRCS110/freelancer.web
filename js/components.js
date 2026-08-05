class SiteNav extends HTMLElement {
  connectedCallback() {
    const demoUrl = 'https://freelancer.srcs.online/index.html?demo=true';

    this.innerHTML = `
      <header class="sticky top-0 z-50 backdrop-blur-md bg-[#FAFAF9]/80 border-b border-[#1C1C1E]/5">
        <nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main Navigation">
          <!-- Logo / Brand -->
          <a href="index.html" class="flex items-center space-x-2 group">
            <span class="w-2.5 h-2.5 rounded-full bg-[#059669] group-hover:scale-125 transition-transform"></span>
            <span class="font-mono font-bold text-sm tracking-wider uppercase text-[#1C1C1E]">Freelancer</span>
          </a>

          <!-- Centralized Nav Links -->
          <div class="hidden md:flex space-x-8 text-sm font-medium text-[#6B7280]">
            <a href="index.html/#video-demo" class="hover:text-[#1C1C1E] transition-colors">Video Tour</a>
            <a href="pages/features.html" class="hover:text-[#1C1C1E] transition-colors">Features</a>
            <a href="pages/pricing.html" class="hover:text-[#1C1C1E] transition-colors">Pricing</a>
          </div>

          <!-- Live Demo CTA -->
          <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="bg-[#1C1C1E] text-[#FAFAF9] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#059669] transition-colors">
            Try Live Demo ↗
          </a>
        </nav>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    // Determine relative path depending on current subpage location
    const isSubpage = window.location.pathname.includes('/pages/');
    const privacyPath = isSubpage ? './privacy.html' : './pages/privacy.html';

    this.innerHTML = `
      <footer class="border-t border-[#1C1C1E]/5 py-12 bg-[#F5F4F2]/50 text-xs text-[#6B7280]">
        <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Sync Race Studios LLC dba Freelancer OS. All rights reserved.</p>
          <div class="flex items-center space-x-6 font-mono">
            <a href="${privacyPath}" class="hover:text-[#1C1C1E] transition-colors">Privacy Policy</a>
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
