# Carry

MOBA 里的 Carry 位：前期猥琐发育，后期带飞全队。


> **接手先读**:[`CLAUDE.md`](CLAUDE.md)（干活的规矩 · 黑名单 · 护栏 · 记忆治理）


## 快速开始

```bash
git clone https://github.com/imvkmark/kjs-zhuize.carry.git
cd carry/docs/02-接口与仪表盘/dashboard
# 用浏览器打开 index.html 即可查看项目工作台
open index.html  # macOS
```


## 目录结构

> 文档已按**生命周期大类**重构。每个大类目录内有 `README.md` 说明其子目录用途，总索引见 [`docs/README.md`](docs/README.md)。

```
carry/
├── openspec/                      # OpenSpec 迭代规格（需求/设计/接口/DB/测试/发布 + 承接现状）
├── docs/                          # 项目文档（核心，按大类归档；总索引 docs/README.md）
│   ├── 01-需求与设计/             # requirements · design · design-drafts · feedback
│   ├── 02-接口与仪表盘/           # dashboard（项目工作台 HTML）· reference
│   ├── 03-测试与验收/             # test-plans · test-reports（缺陷闭环）· review-reports · 验收-v3.2-自动化验证
│   ├── 04-部署与运维/             # deploy-docs · ops · handover · 支付全流程-角色操作手册
│   ├── 05-复盘与分析/             # analysis-reports · night-reports · analysis · 复盘-v3.2 · 订单流转专项
│   ├── 06-交付归档/               # business-deliverables（SQL 工单/定价说明）· 结项交付 · 验收交付归档
│   ├── index.html                # 文档中心入口
│   └── README.md                 # 文档索引（每个大类/子目录的功能）
├── deploy/                        # Docker 部署配置（compose / Dockerfile / nginx / supervisor）
├── repos/                         # 源码仓库（web4php 主仓 + 各前端小程序/H5）
├── scripts/                       # openspec_new / openspec_validate / ci_validate
```


- `dashboard` 写法和输出结构先阅读 [`docs/README.md`](docs/README.md)

## 项目工作台

### 基本资料

**入口**

`docs/02-接口与仪表盘/dashboard/index.html`

**功能**

- 将评审的列表支持 **一键复制**, 复制为 text 格式

### dashboard html 结构

```
## {date} - {阶段详细 : V1.0 评审工作台}

**评审结论与门禁** _整体结论 + 门禁状态汇总_

> 问题清单 (35)  ·  外部依赖 (15) ·  阻塞项 (3) · 评论反馈 (26)

**阻断与风险** _P0 / P1 / P2 完整清单 + Open 问题_

> 分列详述,高风险优先处理,低风险后处理风险
> GAP清单 (51)


## 阶段时间线

{时间 / 阶段 / 参考资料} 

## 定稿资料

> 技术架构  ·  核心流程  ·  模块下钻 (14)  ·  文档中心 (12)
```

### 评审标准

评论反馈 / 问题清单 / 外部依赖均支持**一键复制**，可直接粘贴到钉钉文档。


```
优先级 : P0, P1, P2, P3
编号: LN-[序号]
模块 : 账号安全[m-账号安全], 支付流程[m-支付流程], 订单管理[m-订单管理], 客户服务[m-客户服务], ...
需求类型 : 功能需求[req-func], 性能需求[req-perf], 安全需求[req-sec]
内容 : 模块需求的内容
状态 : 待澄清[status-pending] | 已回复[status-replied] | 已解决[status-resolved]
澄清类型 : 问题/反馈[clarify-QA], 外部依赖[clarify-外部依赖], 阻塞项[clarify-阻塞项], GAP[clarify-GAP清单]
澄清顺序 : A -> B -> C -> D

| 等级 | 含义 | 处理方式 |
|---|---|---|
| **A 文档阻断** | 内容缺失、矛盾或含糊，会导致返工或资金/安全/权限问题 | 不通过，不进入对应模块开发 |
| **B 流程阻断** | 影响核心业务流转 | 补全后才能进入开发 |
| **C 范围明确** | 范围或字段未对齐 | 必须有负责人和决定 |
| **D 体验细节** | 弹窗文案、按钮名称、视觉细节 | 可在开发中迭代 |

澄清角色: 开发, 产品, 业务方, 客户, ...
```


