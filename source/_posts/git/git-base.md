---
title: Git 基本操作
date: 2021-08-11
tags:
  - Git
---

## 创建仓库

初始化一个文件为本地仓库

```bash
git init
```

从现有的仓库中拷贝项目

```bash
git clone 地址
```

## 提交流程

从远端拉取代码

```bash
git pull

# 将远程主机 origin 的 master 分支拉取过来，与本地的 brantest 分支合并。
git pull origin master:brantest

# 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
git pull origin master
```

将修改提交至暂存区

```bash
# 提交修改文件和新增文件（不包括删除文件）
git add .

# 提交已经被add的文件（修改文件和删除文件）不包括新增文件
git add -u

# 提交所有的修改
git add -A
```

查看仓库当前的状态，显示有变更的文件。

```bash
git status
```

提交暂存区到本地仓库中

```bash
git commit -m "message"
```

查看提交日志

```bash
git log
```

将代码推送至远端

```bash
git push
```

临时存储

```bash
# 将修改临时存储
git stash

# 恢复工作目录
git stash pop

# 查看stash了哪些存储
git stash list

# 删除所有stash
git stash clear
```

## 分支操作

查看分支

```bash
# 查看分支
git branch

# 查看远程分支
git branch -r

# 查看所有分支
git branch -a
```

操作分支

```bash
# 切换分支
git checkout 分支名

# 创建分支
git branch 分支名

# 创建并切换分支
git checkout -b 分支名

# 将分支推送到远程
git push origin 分支名

# 将本地分支与远程分支关联（关联后才可进行 git pull 和 git push 操作）
git push --set-upstream origin 分支名

# 将远程分支同步到本地（在此之前需要 git pull 拉取远程仓库最新分支信息）
git checkout origin/分支名 --track

# 合并分支
git merge 分支名

# 删除本地分支
git branch -d 分支名

# 删除远程分支
git push origin --delete 分支名

# git 从某个commit拉出一个新的分支
git checkout <commitId> -b <branchName>

# 合并某个分支的某一次commit提交
git cherry-pick <commitId>
```

## 代码回滚

```bash
# 撤回最近一次的commit(撤销commit，不撤销git add)
git reset --soft HEAD~1

# 撤回最近一次的commit(撤销commit，撤销git add)
git reset --mixed HEAD~1

# 撤回最近一次的commit(撤销commit，撤销git add,还原改动的代码)
git reset --hard HEAD~1

# 执行 git log ，获取到 commit id
git reset <commitId>
```
