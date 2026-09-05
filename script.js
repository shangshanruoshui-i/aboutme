const projects = [
  { category: 'agent', icon: '↗', number: '01', title: '智能物流 AI Agent 平台', description: '面向货主与司机的多角色对话系统，覆盖运单规划、司机调度、跨境物流与异常处理四类 Pipeline。', tags: ['Java', 'Spring Boot', 'RAG', 'MCP'], href: 'https://gitee.com/shangshanruoshui_i/lalamove-show.git' },
  { category: 'agent', icon: '◌', number: '02', title: 'YobiAI 竞品分析 Agent 系统', description: '从网页检索到引用校验的情报生产线。六类 Agent 协同完成采集、分析、写作和审阅，稳定输出日报与周报。', tags: ['FastAPI', 'Next.js', 'Docker'], href: '#' },
  { category: 'vision', icon: '⌁', number: '03', title: '工人安全检测评估系统', description: '通过模型对比、异常数据扫描与阈值分析，让侧端检测模型的召回率从 82.91% 提升至 91.30%，精确率提升至 95.98%。', tags: ['Python', 'Streamlit', 'CV'], href: '#' },
  { category: 'engineering', icon: '+', number: '04', title: '下一件作品，从这里开始', description: '这是一个为未来项目预留的空间。可以放置产品原型、开源工具、研究复现或一篇值得分享的技术文章。', tags: ['Your next idea', 'Coming soon'], href: '#contact', future: true }
];

const grid = document.querySelector('#project-grid');
const status = document.querySelector('#project-status');
const filterLabels = { all: '全部', agent: 'Agent & 平台', vision: '视觉算法', engineering: '工程系统' };
const renderProjects = (filter = 'all') => {
  const shown = projects.filter(project => filter === 'all' || project.category === filter);
  grid.innerHTML = shown.map((project, index) => `
    <article class="project-card ${project.future ? 'future' : ''}" style="--card-index:${index}">
      <span class="project-no">${project.number}</span>
      <div class="project-icon" aria-hidden="true">${project.icon}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-card-footer">
        <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <a class="project-link" href="${project.href}" ${project.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="打开 ${project.title}">↗</a>
      </div>
    </article>`).join('');
  if (status) status.textContent = `${filterLabels[filter]} · ${String(shown.length).padStart(2, '0')} 个项目`;
};
renderProjects();

document.querySelectorAll('.filter[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter[data-filter]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderProjects(button.dataset.filter);
}));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const closeMenu = () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开菜单');
};
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) observer.unobserve(entry.target), entry.target.classList.add('visible');
  }), { threshold: .12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const heroArt = document.querySelector('.hero-art');
const slab = document.querySelector('.hero-slab');
const orbits = document.querySelectorAll('.hero-art .orbit');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let slabRotation = { x: 0, y: 0 };
let slabFlipped = false;
const setSlabRotation = (x = 0, y = 0) => {
  slabRotation = { x, y };
  slab.style.setProperty('--slab-rotate-x', `${x}deg`);
  slab.style.setProperty('--slab-rotate-y', `${y + (slabFlipped ? 180 : 0)}deg`);
};
const toggleSlab = () => {
  slabFlipped = !slabFlipped;
  slab.classList.toggle('is-flipped', slabFlipped);
  slab.setAttribute('aria-pressed', String(slabFlipped));
  slab.setAttribute('aria-label', slabFlipped ? '旋转查看卡片正面' : '旋转查看卡片背面');
  setSlabRotation(slabRotation.x, slabRotation.y);
};
if (heroArt && slab && !reduceMotion) {
  heroArt.addEventListener('pointermove', event => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    setSlabRotation(y * -7, x * 12);
    orbits.forEach((orbit, index) => { orbit.style.translate = `${x * (index ? -8 : 8)}px ${y * (index ? -5 : 5)}px`; });
  });
  heroArt.addEventListener('pointerleave', () => {
    setSlabRotation();
    orbits.forEach(orbit => { orbit.style.translate = '0 0'; });
  });
}
slab.addEventListener('click', toggleSlab);
slab.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleSlab();
  }
  if (event.key === 'Escape' && slabFlipped) toggleSlab();
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
let scrollTicking = false;
const updateActiveNav = () => {
  const current = [...sections].reverse().find(section => window.scrollY >= section.offsetTop - 180)?.id || 'top';
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scrollTicking = false;
};
window.addEventListener('scroll', () => {
  if (!scrollTicking) window.requestAnimationFrame(updateActiveNav), scrollTicking = true;
}, { passive: true });
updateActiveNav();
