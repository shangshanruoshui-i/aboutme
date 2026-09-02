const projects = [
  { category: 'agent', icon: '↗', number: '01', title: '智能物流 AI Agent 平台', description: '面向货主与司机的多角色对话系统，覆盖运单规划、司机调度、跨境物流与异常处理四类 Pipeline。', tags: ['Java', 'Spring Boot', 'RAG', 'MCP'], href: 'https://gitee.com/shangshanruoshui_i/lalamove-show.git' },
  { category: 'agent', icon: '◌', number: '02', title: 'YobiAI 竞品分析 Agent 系统', description: '从网页检索到引用校验的情报生产线。六类 Agent 协同完成采集、分析、写作和审阅，稳定输出日报与周报。', tags: ['FastAPI', 'Next.js', 'Docker'], href: '#' },
  { category: 'vision', icon: '⌁', number: '03', title: '工人安全检测评估系统', description: '通过模型对比、异常数据扫描与阈值分析，让侧端检测模型的召回率从 82.91% 提升至 91.30%，精确率提升至 95.98%。', tags: ['Python', 'Streamlit', 'CV'], href: '#' },
  { category: 'engineering', icon: '+', number: '04', title: '下一件作品，从这里开始', description: '这是一个为未来项目预留的空间。可以放置产品原型、开源工具、研究复现或一篇值得分享的技术文章。', tags: ['Your next idea', 'Coming soon'], href: '#contact', future: true }
];

const grid = document.querySelector('#project-grid');
const renderProjects = (filter = 'all') => {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(project => `
    <article class="project-card ${project.future ? 'future' : ''}">
      <span class="project-no">${project.number}</span>
      <div class="project-icon" aria-hidden="true">${project.icon}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-card-footer">
        <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <a class="project-link" href="${project.href}" ${project.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''} aria-label="打开 ${project.title}">↗</a>
      </div>
    </article>`).join('');
};
renderProjects();

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderProjects(button.dataset.filter);
}));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) observer.unobserve(entry.target), entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
window.addEventListener('scroll', () => {
  const current = [...sections].reverse().find(section => window.scrollY >= section.offsetTop - 180)?.id || 'top';
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });
