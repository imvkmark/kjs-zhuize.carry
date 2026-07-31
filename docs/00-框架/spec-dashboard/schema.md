# `data/*.json` 字段 Schema

按数据源人工成本从低到高排列（自动化优先落地）。

---

## 1. `review-v1.0.json` —— 评审结论/门禁/P0/P1/Open

```json
{
  "version": "V1.0",
  "reviewDate": "2026-07-30",
  "conclusion": "conditional_pass",      // pass | conditional_pass | reject
  "conclusionLabel": "有条件通过",
  "gates": {
    "total": 17,
    "pass": 0,
    "warn": 6,
    "fail": 11,
    "items": [
      {
        "id": "gate-01",
        "name": "支付分期决策",
        "status": "fail",               // pass | warn | fail
        "owner": "产品",
        "note": "Q15-Q22 未定"
      }
    ]
  },
  "issues": {
    "p0": { "total": 20, "items": [ /* 见下方 issue 结构 */ ] },
    "p1": { "total": 31, "items": [] },
    "open": { "total": 22, "items": [] }
  },
  "remediationPlan": [
    {
      "deadline": "1周内",
      "items": ["补全评审人", "Q3-Q14 决策", "角色矩阵"]
    },
    {
      "deadline": "2周内",
      "items": ["Q15-Q22 支付分期决策"]
    },
    {
      "deadline": "4周内",
      "items": ["DDL", "OpenAPI", "前端规范", "上线"]
    }
  ]
}
```

**issue 通用结构**（p0/p1/open 复用）：
```json
{
  "id": "issue-001",
  "title": "订单状态机缺少幂等校验",
  "priority": "P0",
  "status": "open",                     // open | closed | in_progress
  "module": "订单模块",
  "owner": "开发TL",
  "createdAt": "2026-07-28",
  "detailLink": "v1.0-review-2026-07-30.html#issue-001"
}
```

---

## 2. `blockers.json` —— 阻塞项 (3)

```json
{
  "total": 3,
  "updatedAt": "2026-07-30",
  "items": [
    {
      "id": "blk-01",
      "title": "支付网关沙箱账号未开通",
      "blockingWhat": "支付模块联调无法启动",
      "owner": "开发TL",
      "severity": "critical",
      "since": "2026-07-25",
      "detailLink": "v1.0-review-2026-07-30.html#blk-01"
    }
  ]
}
```

---

## 3. `code-diff.json` —— 代码差异 (17，git 自动生成)

```json
{
  "total": 17,
  "generatedAt": "2026-07-30T02:00:00+08:00",
  "generatedBy": "ci_auto",              // ci_auto | manual
  "baseBranch": "v1.0-baseline",
  "compareBranch": "main",
  "items": [
    {
      "id": "diff-01",
      "module": "账号交易",
      "filePath": "src/main/java/.../TradeOrderService.java",
      "changeType": "modified",          // added | modified | removed
      "linesAdded": 42,
      "linesRemoved": 11,
      "relatedIssue": "issue-001",
      "commitSha": "a1b2c3d"
    }
  ]
}
```

---

## 4. `gap.json` —— GAP 清单 (51)

```json
{
  "total": 51,
  "updatedAt": "2026-07-30",
  "items": [
    {
      "id": "gap-01",
      "module": "客服工单",
      "prdRef": "PRD-2.3.1",
      "expected": "工单需支持批量转派",
      "actual": "当前仅支持单条转派",
      "gapType": "missing_feature",      // missing_feature | inconsistent | deprecated
      "owner": "产品+开发",
      "priority": "P1"
    }
  ]
}
```

---

## 5. `feedback.json` —— 评论反馈 (26，钉钉/IM 人工汇总)

```json
{
  "total": 26,
  "updatedAt": "2026-07-30",
  "source": "钉钉群 · 项目评审群",
  "items": [
    {
      "id": "fb-01",
      "author": "客户-王经理",
      "content": "账号找回流程能否加人脸核验？",
      "module": "账号安全",
      "status": "pending",               // pending | replied | resolved
      "createdAt": "2026-07-29T14:22:00+08:00",
      "copyText": "【反馈】账号安全-王经理：账号找回流程能否加人脸核验？"
    }
  ]
}
```

---

## 6. `questions.json` —— 问题清单 (35，待客户回复)

```json
{
  "total": 35,
  "updatedAt": "2026-07-30",
  "items": [
    {
      "id": "q-15",
      "question": "支付分期是否支持提前结清？",
      "askedTo": "客户-财务负责人",
      "status": "waiting_reply",         // waiting_reply | replied | escalated
      "raisedAt": "2026-07-26",
      "deadline": "2026-08-13",
      "copyText": "【待回复】Q15：支付分期是否支持提前结清？（截止 08-13）"
    }
  ]
}
```

---

## 7. `external-deps.json` —— 外部依赖 (15，跨团队沟通)

```json
{
  "total": 15,
  "updatedAt": "2026-07-30",
  "items": [
    {
      "id": "dep-01",
      "name": "支付网关 API 联调环境",
      "dependsOn": "第三方支付团队",
      "status": "waiting",               // waiting | confirmed | blocked
      "impact": "阻塞支付模块开发",
      "owner": "项目经理",
      "expectedDate": "2026-08-05"
    }
  ]
}
```

---

## 8. `refs.json` —— 技术架构 / 核心流程 / 模块下钻 / 文档中心

```json
{
  "architecture": {
    "title": "技术架构",
    "link": "docs/architecture.md",
    "lastUpdated": "2026-07-10"
  },
  "coreFlow": {
    "title": "核心流程",
    "link": "docs/core-flow.md",
    "lastUpdated": "2026-07-10"
  },
  "modules": {
    "total": 14,
    "items": [
      { "id": "mod-01", "name": "账号交易模块", "link": "docs/modules/trade.md" }
    ]
  },
  "docCenter": {
    "total": 12,
    "items": [
      { "id": "doc-01", "title": "接口规范", "link": "docs/api-spec.md", "category": "开发" }
    ]
  }
}
```

---

## 六、角色过滤字段（补充到每类 item 里，供前端统一读取）

所有 `items` 建议统一补一个字段，避免前端硬编码角色规则：

```json
"visibleTo": ["boss", "product", "dev", "customer_success", "newcomer"]
```

例如 `feedback.json` 的 item 只给 `["customer_success", "boss"]`，`code-diff.json` 只给 `["dev"]`，这样 P1 阶段做角色切换时前端只需按 `visibleTo` 过滤，不用写死"客户经理看评论反馈"这类规则在代码里。

