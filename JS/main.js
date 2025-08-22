    document.addEventListener('DOMContentLoaded', () => { if (window.lucide) window.lucide.createIcons(); });

    const $ = (q, d=document) => d.querySelector(q);
    const $$ = (q, d=document) => Array.from(d.querySelectorAll(q));
    $('#year').textContent = new Date().getFullYear();

    $('#themeToggle').addEventListener('click', () => {
      document.documentElement.classList.toggle('invert');
    });

    const mobileBtn = $('#mobileMenuBtn');
    const mobileMenu = $('#mobileMenu');
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    window.closeMobile = () => mobileMenu.classList.add('hidden');

    $('#yearsExp').textContent = 'Full‑stack • ' + (new Date().getFullYear() - 2021) + '+ yrs';

    const projects = [
      {
        title: 'Chatly — Realtime Chat App',
        desc: 'Modern chat with Socket.IO, Express, MongoDB, and Cloudinary uploads.',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop',
        demo: 'https://chatly-fv94.onrender.com',
        code: 'https://github.com/samueloyelakin2008',
      },
      {
        title: 'Paystack Integration Demo',
        desc: 'Payment flow demo with Node/Express and Paystack API.',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop',
        demo: 'https://your-paystack-demo.example.com',
        code: 'https://github.com/samueloyelakin2008/paystack',
      },
      {
        title: 'Portfolio vNext',
        desc: 'This site. Built with HTML, Tailwind and serverless contact pipeline.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
        demo: '#',
        code: 'https://github.com/samueloyelakin2008',
      },
    ];

    const grid = $('#projectGrid');
    function renderProjects(filter = '') {
      const f = filter.trim().toLowerCase();
      grid.innerHTML = '';
      projects.filter(p => !f || p.title.toLowerCase().includes(f) || p.desc.toLowerCase().includes(f)).forEach(p => {
        const card = document.createElement('article');
        card.className = 'group rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors bg-white/[0.02]';
        card.innerHTML = `
          <div class="relative">
            <img src="${p.image}" alt="${p.title}" class="h-44 w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg">${p.title}</h3>
            <p class="text-sm text-zinc-300 mt-1">${p.desc}</p>
            <div class="mt-4 flex flex-wrap gap-3">
              <button data-demo="${p.demo}" data-title="${p.title}" data-desc="${p.desc}" class="open-demo px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-sm font-semibold">Live demo</button>
              <a target="_blank" href="${p.code}" class="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm">View code</a>
            </div>
          </div>`;
        grid.appendChild(card);
      });
      $$('.open-demo').forEach(btn => btn.addEventListener('click', () => openDemo(btn)));
    }
    renderProjects();
    $('#projectSearch').addEventListener('input', e => renderProjects(e.target.value));
    $('#refreshProjects').addEventListener('click', () => renderProjects($('#projectSearch').value));

    const modal = document.getElementById('projectModal');
    function openDemo(btn) {
      const url = btn.getAttribute('data-demo');
      $('#modalTitle').textContent = btn.getAttribute('data-title');
      $('#modalDesc').textContent = btn.getAttribute('data-desc');
      const frame = document.getElementById('modalFrame');
      frame.src = url === '#' ? 'about:blank' : url;
      modal.showModal();
    }

    const codeForm = document.getElementById('codeForm');
    const codeBlock = document.getElementById('codeBlock');
    const codeEl = codeBlock.querySelector('code');
    document.getElementById('sampleBtn').addEventListener('click', () => {
      $('#ghRepo').value = 'paystack';
      $('#ghPath').value = 'README.md';
    });

    codeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = $('#ghUser').value.trim();
      const repo = $('#ghRepo').value.trim();
      const path = $('#ghPath').value.trim();
      if (!user || !repo || !path) return alert('Please fill user, repo, and file path.');
      const url = `https://raw.githubusercontent.com/${user}/${repo}/main/${path}`;
      try {
        codeEl.textContent = 'Loading...';
        codeBlock.classList.remove('hidden');
        const res = await fetch(url);
        if (!res.ok) throw new Error('File not found. Try a different branch or path.');
        const text = await res.text();
        codeEl.textContent = text;
        const ext = path.split('.').pop();
        codeEl.className = '';
        const langMap = { js:'javascript', ts:'typescript', html:'xml', css:'css', json:'json', md:'markdown' };
        codeEl.classList.add('language-' + (langMap[ext] || 'plaintext'));
        hljs.highlightElement(codeEl);
      } catch (err) {
        codeEl.textContent = 'Error: ' + err.message;
      }
    });

    const resumeLink = document.getElementById('resumeLink');
    const saveCvBtn = document.getElementById('saveCvBtn');
    const cvInput = document.getElementById('cvFileId');
    if (saveCvBtn) {
      saveCvBtn.addEventListener('click', () => {
        const id = cvInput.value.trim();
        if (!id) return alert('Enter a Drive File ID');
        localStorage.setItem('cv_id', id);
        setCvHref();
        alert('Saved!');
      });
    }
    function setCvHref() {
      const id = localStorage.getItem('cv_id') || '';
      if (id) resumeLink.href = `https://drive.google.com/uc?export=download&id=${id}`;
    }
    setCvHref();

    const contactForm = document.getElementById('contactForm');
    const statusEl = document.getElementById('contactStatus');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = 'Sending...';
      const formData = Object.fromEntries(new FormData(contactForm).entries());
      try {
        const res = await fetch('https://sammy-egfh.onrender.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send');
        statusEl.textContent = 'Sent! Thanks for reaching out.';
        contactForm.reset();
      } catch (err) {
        console.error(err);
        statusEl.textContent = 'Error: ' + err.message;
      }
    });

