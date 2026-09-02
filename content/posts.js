/*
 * 日更只需要复制下面任意一条记录，修改 id、date、title、summary、tags 与 body。
 * body 支持常见 HTML：p、h2、h3、ul、ol、pre、blockquote、a。最新文章请放在数组最前面。
 */
window.sitePosts = [
  {
    id: 'huolala-agent-platform', category: '项目记录', date: '2026.09.01', read: '8 min',
    title: '货拉拉智能物流大模型助手：从 Demo 到企业级多 Agent 平台',
    summary: '把角色路由、RAG、任务队列和治理能力放到同一个真实业务闭环里。这份项目介绍记录了平台最重要的设计取舍。',
    tags: ['Agent', 'RAG', 'Java'], cover: 'assets/covers/huolala-agent.png',
    asset: { label: '下载项目介绍 PPT', href: 'assets/projects/huolala-agent-intro.pptx' },
    body: `<p>这个项目的起点并不复杂：物流场景里的问题往往不是“能不能对话”，而是“能不能把任务可靠地推进下去”。因此平台从一开始就按业务角色、意图与区域拆分能力，而不是把所有问题交给一个通用对话入口。</p><h2>我关心的四层能力</h2><ul><li><strong>理解：</strong>查询改写、意图识别与混合检索，让知识命中更贴近业务语境。</li><li><strong>执行：</strong>按优先级、幂等、租约和重试组织多 Agent 任务队列。</li><li><strong>治理：</strong>审批、Handoff、审计与 Guardrails 不能作为后补功能。</li><li><strong>观察：</strong>把 Evaluation 与链路追踪放进日常迭代，而不是只在故障时打开。</li></ul><blockquote>真正可用的 Agent，不是回答更长，而是在复杂流程里依然知道下一步应该做什么。</blockquote><p>这份 PPT 还在持续打磨，但它已经是目前最完整的一次项目梳理。</p>`
  },
  {
    id: 'competitor-agent-daily-report', category: '项目记录', date: '2026.08.31', read: '10 min',
    title: '每天早上 8 点，Agent 替你写好竞品日报',
    summary: '一次关于 Agent Runtime 的内部技术分享：不依赖重型框架，如何把采集、研判、撰写、评审与引用校验组织成稳定工作流。',
    tags: ['Agent Runtime', 'FastAPI', '系统设计'], cover: 'assets/covers/competitor-agent.png',
    asset: { label: '下载技术分享 PPT', href: 'assets/projects/competitor-agent-sharing.pptx' },
    body: `<p>竞品情报的难点不是抓到信息，而是让信息从采集到结论的每一步都可追踪、可复核、可恢复。这个系统由 Orchestrator、Collector、Analyst、Writer、Reviewer、Citation 六类 Agent 共同完成任务。</p><h2>没有框架，也要有 Runtime</h2><p>框架能提供便利，但不能替你决定任务边界。因此我把执行模型拆得更显式：DAG 编排定义顺序和依赖，Agent Trace 留住每一步输入输出，SSE 把长任务的状态透明地交给使用者。</p><h2>日报稳定性的来源</h2><ol><li>先过滤重复与低价值信息，再进入分析链路。</li><li>把引用校验单独作为一类 Agent，而不是写作时的附带动作。</li><li>将失败、重试与人工接管作为正常路径设计。</li></ol><blockquote>自动化的价值不在于替代判断，而在于让判断发生在更高质量的上下文里。</blockquote>`
  },
  {
    id: 'learning-log-start', category: '学习日志', date: '2026.08.30', read: '3 min',
    title: '开始日更：把输入变成可回看的轨迹',
    summary: '我准备把每天学到的东西压缩成一条短记录。不是为了完成打卡，而是为了减少“我好像看过”的错觉。',
    tags: ['复盘', '学习方法'],
    body: `<p>很多输入在当下很有启发，但过几天就只剩模糊印象。记录不是为了完整复述，而是留下能把自己带回现场的线索。</p><h2>一条日志只回答三个问题</h2><ul><li>今天具体学到了什么？</li><li>它改变了我原先的哪个判断？</li><li>下一步准备在哪里验证它？</li></ul><p>这套博客会保留项目中的长文，也欢迎短到只有三行的学习切片。</p>`
  },
  {
    id: 'vision-evaluation-notes', category: '技术心得', date: '2026.08.28', read: '5 min',
    title: '模型评估不是一张分数表，而是问题定位工具',
    summary: '从安全检测模型的优化过程里，我重新理解了精确率、召回率与错误样本之间的关系。',
    tags: ['Computer Vision', 'Evaluation'],
    body: `<p>模型指标当然重要，但只有数字时，迭代常常没有方向。将预测结果通过 Hungarian 算法匹配，并按漏检、误检、类别和场景继续切分，才能看见模型真正在哪些情况下失效。</p><h2>一个很实用的转变</h2><p>不要先问“分数能不能再高一点”，而要先问“这一批错误是不是同一种错误”。当错误有了结构，数据补充、阈值调整和模型选型才会变成可以比较的决策。</p>`
  }
];
