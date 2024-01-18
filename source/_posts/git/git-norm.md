---
title: Git 规范
date: 2021-09-11
tags:
  - Git
---

## Commit 提交规范

Git commit 规范是一种约定俗成的方式，用于规范化提交信息的格式和内容。
遵循 Git commit 规范可以提高代码提交信息的可读性和可维护性，方便团队成员之间的沟通和代码审查。
同时，还可以利用工具和脚本来自动生成 Changelog 等文档，提升开发效率。

| 类型     | 描述                                                                                 |
| :------- | :----------------------------------------------------------------------------------- |
| ci       | 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交     |
| docs     | 文档更新                                                                             |
| feat     | 新增功能                                                                             |
| fix      | bug 修复                                                                             |
| perf     | 性能, 体验优化                                                                       |
| refactor | 重构代码(既没有新增功能，也没有修复 bug)                                             |
| revert   | 回滚某个更早之前的提交                                                               |
| style    | 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑) |
| test     | 新增测试用例或是更新现有测试                                                         |
| chore    | 不属于以上类型的其他类型                                                             |
| build    | 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交                |

## Branch 命名规范

> **master**
>
> > 主分支，用于部署生产环境，不能直接在该分支上开发

> **develop**
>
> > 开发分支，feature 分支都是基于 develop 分支下创建的

> **feature/xxx**
>
> > 功能开发分支，从 develop 分支创建，开发完成后合并回 develop 分支

> **release/xxx**
>
> > 预发布分支，在合并好 feature 分支的 develop 分支上创建

> **bugfix/xxx**
>
> > 功能 bug 修复分支

> **hotfix/xxx**
>
> > 紧急 bug 修改分支
