#!/usr/bin/env node
/**
 * 一次性脚本: 把 6 个 JSON 按 plan.md 2.x 字段映射表改造
 * 输入: data/{feedback,questions,external-deps,blockers,code-diff,gap}.json
 * 输出: 同名 .json(带 7 个新字段)
 * 备份: 同名 .json.bak(调用前已存在)
 */
const fs = require('fs');
const path = require('path');
const DATA = process.argv[2] || path.join(__dirname, '..', 'docs/02-接口和仪表盘/dashboard/data');

/* ---------- 映射规则 ---------- */
const moduleMap = {
  '账号安全':     'm-账号安全',
  '账号交易':     'm-账号安全',
  '支付/退款':    'm-支付流程',
  '支付':         'm-支付流程',
  '追责员':       'm-订单管理',
  '追责核心':     'm-订单管理',
  '客服工单':     'm-客户服务',
};
function normModule(s) {
  if (!s) return 'm-未分类';
  return moduleMap[s] || ('m-' + s);
}

const ownerMap = {
  '开发TL':       '开发',
  '前端':         '开发',
  '产品':         '产品',
  '客户-财务负责人':'客户',
  '客户-数据团队': '客户',
  '客户-王经理':  '客户',
  '业务-李主管':  '业务方',
  '测试-赵工':    '测试',
  '项目经理':     '产品',
  '法务':         '法务',
  '产品+开发':    '产品',
};
function normOwner(s) {
  if (!s) return '产品';
  return ownerMap[s] || s;
}

function inferRequirement(item, dataFile) {
  const tags = item.tags || [];
  const module = item.module || '';
  if (tags.includes('权限') || tags.includes('安全') || /账号|安全|密码/.test(module)) return 'req-sec';
  if (tags.includes('支付') || /支付/.test(module)) return 'req-perf';
  if (dataFile === 'code-diff.json') return 'req-func';
  return 'req-func';
}

function inferPriority(item, dataFile) {
  if (dataFile === 'gap.json') {
    if (item.priority === 'P0') return 'P0';
    return 'P1';
  }
  if (dataFile === 'blockers.json') {
    if (item.severity === 'critical') return 'P0';
    if (item.severity === 'high') return 'P1';
    return 'P2';
  }
  if (dataFile === 'external-deps.json') {
    if (item.status === 'blocked') return 'P0';
    if (item.status === 'waiting') return 'P1';
    return 'P2';
  }
  if (dataFile === 'questions.json') {
    if (item.status === 'escalated') return 'P0';
    return 'P1';
  }
  if (dataFile === 'feedback.json') return 'P1';
  if (dataFile === 'code-diff.json') return 'P2';
  return 'P2';
}

function inferStatus(item) {
  const s = item.status;
  if (!s) return 'status-pending';
  if (s === 'pending' || s === 'waiting_reply' || s === 'waiting') return 'status-pending';
  if (s === 'replied' || s === 'confirmed') return 'status-replied';
  if (s === 'resolved' || s === 'closed' || s === 'blocked' || s === 'escalated') return 'status-resolved';
  return 'status-pending';
}

const clarifyTypeByFile = {
  'feedback.json':     'clarify-QA',
  'questions.json':    'clarify-QA',
  'external-deps.json':'clarify-外部依赖',
  'blockers.json':     'clarify-阻塞项',
  'gap.json':          'clarify-GAP清单',
  'code-diff.json':    'clarify-QA',
};

function inferClarifyOrder(priority, clarifyType) {
  const tags = [];
  if (priority === 'P0' && clarifyType === 'clarify-阻塞项') tags.push('A');
  if (priority === 'P0' && clarifyType !== 'clarify-阻塞项') tags.push('B');
  if (priority === 'P1') tags.push('C');
  if (priority === 'P2' || priority === 'P3') tags.push('D');
  return tags;
}

/* ---------- 全局 LN-编号分配(P0 优先 → P1 → P2+) ---------- */
const files = ['gap.json','blockers.json','external-deps.json','questions.json','feedback.json','code-diff.json'];
const allItems = [];
files.forEach(f => {
  const d = JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));
  (d.items || []).forEach(item => {
    allItems.push({ file: f, item });
  });
});

// 按 priority 排序,同 priority 保持文件顺序
const order = { P0: 0, P1: 1, P2: 2, P3: 3 };
allItems.forEach(x => {
  x.priority = inferPriority(x.item, x.file);
});
allItems.sort((a, b) => {
  if (order[a.priority] !== order[b.priority]) return order[a.priority] - order[b.priority];
  return files.indexOf(a.file) - files.indexOf(b.file);
});
allItems.forEach((x, i) => {
  x.reqId = 'LN-' + String(i + 1).padStart(3, '0');
});

/* ---------- 写回 6 个 JSON ---------- */
const groupBy = {};
allItems.forEach(x => {
  if (!groupBy[x.file]) groupBy[x.file] = [];
  groupBy[x.file].push(x);
});

let totalWritten = 0;
for (const f of files) {
  const original = JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));
  const items = groupBy[f] || [];
  const updated = items.map(x => {
    const it = x.item;
    const clarifyType = clarifyTypeByFile[f];
    const newItem = Object.assign({}, it, {
      priority: x.priority,
      reqId: x.reqId,
      module: normModule(it.module),
      requirement: inferRequirement(it, f),
      status: inferStatus(it),
      clarifyType: clarifyType,
      clarifyOrder: inferClarifyOrder(x.priority, clarifyType),
      clarifyOwner: normOwner(it.owner || it.askedTo)
    });
    return newItem;
  });
  original.items = updated;
  fs.writeFileSync(path.join(DATA, f), JSON.stringify(original, null, 2) + '\n');
  totalWritten += updated.length;
  console.log(`✅ ${f}: ${updated.length} items transformed`);
}

console.log(`\n总计: ${totalWritten} items, ${allItems.length} LN-ids 全局唯一`);
console.log('LN 范围: LN-001 ~ LN-' + String(allItems.length).padStart(3, '0'));
