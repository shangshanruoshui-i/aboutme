(function () {
  const posts = window.sitePosts || [];
  const categories = ['全部', ...new Set(posts.map(post => post.category))];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' })[char]);
  const postLink = post => `post.html?id=${encodeURIComponent(post.id)}`;
  const tags = post => `<div class="post-tags">${post.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>`;
  const card = (post, compact = false) => `<article class="post-card ${compact ? 'post-card-compact' : ''}">${post.cover ? `<img class="post-cover" src="${post.cover}" alt="${escapeHtml(post.title)} 的封面" />` : `<div class="post-cover post-cover-placeholder"><span>${String(post.date).slice(-2)}</span></div>`}<div class="post-card-copy"><p class="post-meta"><span>${escapeHtml(post.category)}</span><span>${escapeHtml(post.date)}</span><span>${escapeHtml(post.read)}</span></p><h3><a href="${postLink(post)}">${escapeHtml(post.title)}</a></h3><p class="post-summary">${escapeHtml(post.summary)}</p>${tags(post)}<a class="post-read" href="${postLink(post)}">阅读笔记 <span>↗</span></a></div></article>`;
  const recent = document.querySelector('#recent-posts');
  if (recent) recent.innerHTML = posts.slice(0, 3).map(post => card(post, true)).join('');
  const list = document.querySelector('#post-list');
  const filterRoot = document.querySelector('#post-filters');
  const count = document.querySelector('#post-count');
  if (list && filterRoot) {
    const render = category => {
      const shown = category === '全部' ? posts : posts.filter(post => post.category === category);
      list.innerHTML = shown.map(post => card(post)).join('');
      count.textContent = `${String(shown.length).padStart(2, '0')} 篇记录`;
      filterRoot.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset.category === category));
    };
    filterRoot.innerHTML = categories.map(category => `<button class="filter ${category === '全部' ? 'active' : ''}" data-category="${category}" type="button">${category}</button>`).join('');
    filterRoot.addEventListener('click', event => { const button = event.target.closest('button[data-category]'); if (button) render(button.dataset.category); });
    render('全部');
  }
  const postRoot = document.querySelector('#post-content');
  if (postRoot) {
    const id = new URLSearchParams(window.location.search).get('id');
    const post = posts.find(item => item.id === id) || posts[0];
    if (!post) return;
    document.title = `${post.title} — 施俊杰`;
    postRoot.innerHTML = `<article class="article"><a class="post-back article-back" href="blog.html">← 返回学习日志</a><p class="post-meta"><span>${escapeHtml(post.category)}</span><span>${escapeHtml(post.date)}</span><span>${escapeHtml(post.read)}</span></p><h1>${escapeHtml(post.title)}</h1><p class="article-lead">${escapeHtml(post.summary)}</p>${tags(post)}${post.cover ? `<img class="article-cover" src="${post.cover}" alt="" />` : ''}<div class="article-body">${post.body}</div>${post.asset ? `<a class="article-asset" href="${post.asset.href}" download>${post.asset.label}<span>↓</span></a>` : ''}</article>`;
  }
  document.querySelectorAll('.menu-toggle').forEach(toggle => toggle.addEventListener('click', () => { const nav = toggle.parentElement.querySelector('.desktop-nav'); const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); }));
})();
