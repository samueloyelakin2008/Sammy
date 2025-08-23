document.addEventListener('DOMContentLoaded', () => { if (window.lucide) window.lucide.createIcons(); });

const $ = (q, d=document) => d.querySelector(q);
const $$ = (q, d=document) => Array.from(d.querySelectorAll(q));
$('#year').textContent = new Date().getFullYear();



const mobileBtn = $('#mobileMenuBtn');
const mobileMenu = $('#mobileMenu');
mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
window.closeMobile = () => mobileMenu.classList.add('hidden');


const projects = [
  
  {
    title: 'Peakolamsuites Hotel Web App',
    desc: 'This site. Built with HTML, Bootstrap, Javasript, Paystack Integration and serverless contact pipeline(Firebase and Email.js).',
    image: 'images/Peakolam2.jpg',
    demo: 'https://samueloyelakin2008.github.io/Peakolamsuites',
    code: 'https://github.com/samueloyelakin2008/Peakolamsuites/blob/main/',
    visit: 'https://samueloyelakin2008.github.io/Peakolamsuites',
  },

  
  {
    title: 'Chatly — Realtime Chat App',
    desc: 'Modern chat with Socket.IO, Express, MongoDB, and Render.',
    image: 'images/chatly.png',
    demo: 'https://chatly-fv94.onrender.com',
    code: 'https://github.com/samueloyelakin2008/chatly/blob/main/',
    visit: 'https://chatly-fv94.onrender.com',
  },

  {
    title: 'ZeniAI - AI-Powered Content Creation Platform Powered by Gemini',
    desc: 'This site. Built with HTML, CSS, JS, Gemini API and serverless  pipeline(Firebase and Google sheets).',
    image: 'images/ZeniAi.png',
    demo: 'https://samueloyelakin2008.github.io/ZeniAI',
    code: 'https://github.com/samueloyelakin2008/ZeniAI/blob/main/',
    visit: 'https://samueloyelakin2008.github.io/ZeniAI',
  },

  {
    title: 'Simple Sciene Quiz Web App  with Score Tracking and Timer',
    desc: 'This site. Built with HTML, CSS, JS',
    image: 'images/quiz2.jpg',
    demo: 'https://samueloyelakin2008.github.io/Masterquiz',
    code: 'https://github.com/samueloyelakin2008/Masterquiz/blob/main/',
    visit: 'https://samueloyelakin2008.github.io/Masterquiz',
  },

  {
    title: 'FCEMSSVS - Federal College of Education, Model Secondary School, ABK Valedictory Service Website',
    desc: 'This site. Built with HTML, CSS, JS and serverless pipeline(Firebase and cloudinary).',
    image: 'images/FCEMSSVS.png',
    demo: 'https://samueloyelakin2008.github.io/FCEMSSVS',
    code: 'https://github.com/samueloyelakin2008/FCEMSSVS/blob/main/',
    visit: 'https://samueloyelakin2008.github.io/FCEMSSVS',
  },

  {
    title: 'Voting web app with realtime stats dashboard',
    desc: 'This site. Built with HTML, CSS, JS and serverless pipeline.',
    image: 'images/vote.png',
    demo: 'https://samueloyelakin2008.github.io/onlinevoting',
    code: 'https://github.com/samueloyelakin2008/onlinevoting/blob/main/',
    visit: 'https://samueloyelakin2008.github.io/onlinevoting',
  },
  

  {
    title: 'Birthday Webapp ',
    desc: 'This site. Built with HTML, CSS, JS and Gooogle Fonts',
    image: 'images/Bday.png',
    demo: 'https://samueloyelakin2008.github.io/MomBirthday',
    code: 'https://github.com/samueloyelakin2008/MomBirthday/blob/main/',
    visit: 'https://samueloyelakin2008.github.io/MomBirthday',
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
          <a target="_blank" href="${p.visit}" class="px-3 py-1.5 border-white-500 rounded-xl border border-white/10 hover:border-lightblue-600 text-sm">Visit Web</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  $$('.open-demo').forEach(btn => btn.addEventListener('click', () => openDemo(btn)));
}
renderProjects();
$('#projectSearch').addEventListener('input', e => renderProjects(e.target.value));
$('#refreshProjects').addEventListener('click', () => renderProjects($('#projectSearch').value));

// Demo modal
const modal = document.getElementById('projectModal');
function openDemo(btn) {
  const url = btn.getAttribute('data-demo');
  $('#modalTitle').textContent = btn.getAttribute('data-title');
  $('#modalDesc').textContent = btn.getAttribute('data-desc');
  const frame = document.getElementById('modalFrame');
  frame.src = url === '#' ? 'about:blank' : url;
  modal.showModal();
}

// GitHub Code Preview
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

const contactForm = document.getElementById('contactForm');
const statusEl = document.getElementById('contactStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending...';

  const formData = new FormData(contactForm);
  const params = new URLSearchParams(formData).toString();
  const url = 'https://script.google.com/macros/s/AKfycbxw3XkxnLDsJu3FDLkDAtyZp9Wp3uwn8P8ngodWoEVVrnpNfbWJgFCekJ3rMVVQxcXFGg/exec?' + params;
  

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === 'success') {
      statusEl.textContent = '✅ Sent! Your message has been saved and emailed.';
      contactForm.reset();
    } else {
      throw new Error(data.error || 'Failed to send');
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = '❌ Error: ' + error.message;
  }
});
  const scrollElements = document.querySelectorAll('.scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-zoom');

  const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
  };

  const displayScrollElement = (element) => {
    element.classList.add('scroll-visible');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('scroll-visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => { handleScrollAnimation(); });
  window.addEventListener('load', () => { handleScrollAnimation(); });

