#!/usr/bin/env node
/**
 * 一次性脚本: 9 个 JSON 合并为 3 个
 * 输出:
 *   - data/dashboard.json   (概览)
 *   - data/review-v1.0.json (单版本评审完整快照)
 *   - data/design.json      (技术设计)
 * 删除: feedback/questions/external-deps/blockers/code-diff/gap/refs/cards-meta/review-v1.0.json 9 个
 */
const fs = require('fs');
const path = require('path');
const D = process.argv[2] || path.join(__dirname, '..', 'docs/02-接口和仪表盘/dashboard/data');

const read = (f) => JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));

// 1. 读所有 source
const src = {
  review:   read('review-v1.0.json'),
  feedback: read('feedback.json'),
  questions: read('questions.json'),
  deps:      read('external-deps.json'),
  blockers:  read('blockers.json'),
  diff:      read('code-diff.json'),
  gap:       read('gap.json'),
  refs:      read('refs.json'),
  cards:     read('cards-meta.json')
};

// 2. dashboard.json (概览)
const dashboard = {
  version: src.review.version,
  reviewDate: src.review.reviewDate,
  conclusion: src.review.conclusion,
  conclusionLabel: src.review.conclusionLabel,
  totals: {
    feedback: src.feedback.total,
    questions: src.questions.total,
    externalDeps: src.deps.total,
    blockers: src.blockers.total,
    codeDiff: src.diff.total,
    gaps: src.gap.total,
    p0: src.review.issues.p0.total,
    p1: src.review.issues.p1.total,
    open: src.review.issues.open.total,
    gates: src.review.gates
  },
  stages: {
    current: 'V1.0 评审',
    future: ['V1.6', 'V1.7', 'V2.0'],
    archived: ['V0.x 立项', 'V0.x 初版 PRD']
  },
  remediationPlan: src.review.remediationPlan,
  availableVersions: [
    { code: 'V1.0', label: 'V1.0 评审', status: 'current',    reviewDate: '2026-07-30' },
    { code: 'V1.6', label: 'V1.6 短期', status: 'planned',    reviewDate: null },
    { code: 'V1.7', label: 'V1.7 中期', status: 'planned',    reviewDate: null },
    { code: 'V2.0', label: 'V2.0 长期', status: 'planned',    reviewDate: null }
  ]
};

// 3. review-v1.0.json (单版本评审完整快照)
const reviewV10 = {
  version: src.review.version,
  reviewDate: src.review.reviewDate,
  conclusion: src.review.conclusion,
  conclusionLabel: src.review.conclusionLabel,
  gates: src.review.gates,
  issues: src.review.issues,
  remediationPlan: src.review.remediationPlan,
  // 7 个子项,合并到版本快照
  blockers:    { total: src.blockers.total, items: src.blockers.items },
  feedback:    { total: src.feedback.total, items: src.feedback.items },
  questions:   { total: src.questions.total, items: src.questions.items },
  externalDeps:{ total: src.deps.total, items: src.deps.items },
  codeDiff:    { total: src.diff.total, items: src.diff.items },
  gap:         { total: src.gap.total, items: src.gap.items }
};

// 4. design.json (技术设计)
const design = {
  architecture: src.refs.architecture,
  coreFlow: src.refs.coreFlow,
  modules: src.refs.modules,
  docCenter: src.refs.docCenter,
  // 卡片元数据(渲染控制) —— 也可以放 dashboard 里,这里放 design.json 因为它描述的是"哪些资料"
  cardMeta: src.cards.cards.map(c => ({
    id: c.id,
    icon: c.icon,
    urgency: c.urgency,
    visibleTo: c.visibleTo,
    actions: c.actions,
    tags: c.tags,
    externalLink: c.externalLink || null,
    // 标签配色
    badgeClass: c.id === 'feedback' ? 'nb-rose' :
                c.id === 'questions' ? 'nb-amber' :
                c.id === 'externalDeps' ? 'nb-cyan' :
                c.id === 'blockers' ? 'nb-red' :
                c.id === 'codeDiff' ? 'nb-blue' :
                c.id === 'gap' ? 'nb-purple' :
                c.id === 'review' ? 'nb-amber' : 'nb-blue'
  })),
  tags: src.cards.tags
};

// 写
const write = (f, obj) => {
  fs.writeFileSync(path.join(D, f), JSON.stringify(obj, null, 2) + '\n');
  console.log('✅', f, '·', JSON.stringify(obj).length, 'bytes');
};

write('dashboard.json', dashboard);
write('review-v1.0.json', reviewV10);
write('design.json', design);

// 5. 删除旧文件
const oldFiles = ['feedback.json', 'questions.json', 'external-deps.json', 'blockers.json', 'code-diff.json', 'gap.json', 'refs.json', 'cards-meta.json'];
oldFiles.forEach(f => {
  const p = path.join(D, f);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log('🗑️ 删', f);
  }
});

console.log('\n汇总:');
console.log('  dashboard.json:', JSON.stringify(dashboard).length, 'bytes');
console.log('  review-v1.0.json:', JSON.stringify(reviewV10).length, 'bytes');
console.log('    ├─ blockers:', reviewV10.blockers.total, 'items');
console.log('    ├─ feedback:', reviewV10.feedback.total, 'items');
console.log('    ├─ questions:', reviewV10.questions.total, 'items');
console.log('    ├─ externalDeps:', reviewV10.externalDeps.total, 'items');
console.log('    ├─ codeDiff:', reviewV10.codeDiff.total, 'items');
console.log('    └─ gap:', reviewV10.gap.total, 'items');
console.log('  design.json:', JSON.stringify(design).length, 'bytes');
