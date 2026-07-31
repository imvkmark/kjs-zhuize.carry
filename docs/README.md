# docs/ — 项目文档索引

按**生命周期大类**归档,每类一个编号目录,便于后续团队按阶段承接。
每个大类目录下另有 `README.md` 说明该类包含的子目录与用途。

## 约定


- 

## 大类总览

| 目录 | 功能 | 主要子目录 |
|------|------|-----------|
| [`01-需求与设计/`](01-需求与设计/) | 需求来源、产品设计、设计草案、业务反馈、可运行原型 | `requirements` `design` `design-drafts` `feedback` `prototypes` |
| [`02-接口与仪表盘/`](02-接口与仪表盘/) | 交互式流程图/架构看板、技术参考资料 | `dashboard` `reference` |
| [`03-测试与验收/`](03-测试与验收/) | 测试计划、测试报告闭环、评审报告、自动化验收 | `test-plans` `test-reports` `review-reports` `自动化验证` |
| [`04-部署与运维/`](04-部署与运维/) | 部署文档、运维手册、交接清单、角色操作手册 | `deploy-docs` `ops` `handover` |
| [`05-复盘与分析/`](05-复盘与分析/) | 技术分析报告、进展夜报、迭代复盘、订单流转专项 | `analysis-reports` `night-reports` `analysis` `复盘` |
| [`06-交付归档/`](06-交付归档/) | 业务交付物(SQL 工单/定价说明)、结项与验收交付归档 | `business-deliverables` |


## `02-接口与仪表盘`定义

- `index.html` — 文档中心入口页(左侧目录树导航,见 [`02-接口与仪表盘/dashboard/index.html`](02-接口与仪表盘/dashboard/index.html) 的项目工作台)。
- 历史链接,并入 `02-接口与仪表盘/reference/`。

- `/dashboard/index.html` 这个文件根据版本管理 docs 下所有的交付文件和大纲
- `/dashboard/md-viewer.html` 用来预览 docs 下所有的 md 文件


## 承接指引

1. **接需求/设计** → `01-需求与设计/`(先读 `requirements/`,设计意图看 `design/`)。
2. **看系统全貌** → `02-接口与仪表盘/dashboard/index.html`(交互式:架构 / 核心流程 / 模块下钻)。
3. **跑测试/提缺陷** → `03-测试与验收/test-reports/README.md`(测试用例结论闭环 runbook)。
4. **上线部署** → `04-部署与运维/deploy-docs/` + `06-交付归档/business-deliverables/`(SQL 工单按执行顺序)。
5. **理解历史决策/延期** → `05-复盘与分析/`(复盘 + 订单流转专项评估)。
6. **验收交付物** → `06-交付归档/`(01 源代码 → 07 缺口风险,七卷)。
