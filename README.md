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

打开 `docs/02-接口与仪表盘/dashboard/index.html`，固定目录树导航：


**dashboard html 结构**

```
## {date} - {阶段详细 : V1.0 评审工作台}

**评审结论与门禁** _整体结论 + 门禁状态汇总_

> 问题清单 (35)  ·  外部依赖 (15) ·  阻塞项 (3) · 评论反馈 (26)

**阻断与风险** _P0 / P1 / P2 完整清单 + Open 问题_

> 分列详述,高风险优先处理,低风险后处理风险
> GAP清单 (51)


**🛠️ 整改路径 & 文档** _整改计划 + 相关文档入口_

> 技术架构  ·  核心流程  ·  模块下钻 (14)  ·  文档中心 (12)


## 阶段时间线

{时间 / 阶段 / 资料} 
```


评论反馈 / 问题清单 / 外部依赖均支持**一键复制**，可直接粘贴到钉钉文档。
