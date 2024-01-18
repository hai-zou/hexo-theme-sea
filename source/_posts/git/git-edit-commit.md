---
title: Git 修改 Commit 记录
date: 2023-09-09 08:55:00
tags:
  - Git
---

## 前言

当你使用Git进行版本控制时，难免会遇到需要修改提交记录（commit history）的情况。可能是因为提交信息写错了、忘记添加某个文件、需要重新排列提交的顺序，或者其他各种原因。不过，要注意的是，修改提交记录可能会影响到团队协作，因此需要谨慎处理。

## 修改最近一次提交

如果你只需要修改最近一次的提交记录，可以使用以下命令：

```bash
git commit --amend
```

这个命令会打开文本编辑器，允许你修改最近一次提交的提交信息。修改完成后，保存并关闭编辑器。

## 修改之前的提交记录

如果需要修改多个提交或旧提交的消息，您可以使用交互式变基，然后强制推送以更改提交历史记录。以下是一些常见的操作：

### 修改提交信息

1. 运行 `git rebase -i HEAD~n` 命令，会在编辑器中展示最近 n 次的提交列表

``` bash
git rebase -i HEAD~3
```

编辑器中的提交列表类似于以下内容：

``` bash
pick e499d89 Delete CNAME
pick 0c39034 Better README
pick f7fde4a Change the commit message but push the same commit.
...
```

2. 将要修改的提交记录前面的 pick 改为 edit，然后保存并关闭编辑器。

```bash
pick e499d89 Delete CNAME
edit 0c39034 Better README
edit f7fde4a Change the commit message but push the same commit.
```

3. 运行以下命令来修改标记了 `edit` 的提交信息：

```bash
git commit --amend
```

4. 完成修改后继续下一步：

```bash
git rebase --continue
```

最后出现 Successfully... 就修改成功了。

5. 在修改提交记录后，需要使用强制推送（force push）来更新远程分支。但要谨慎使用强制推送，因为它会覆盖远程分支上的历史记录。

```bash
git push --force origin 分支名
```

### 删除提交

如果需要删除一个提交，重复 [修改提交信息](#修改提交信息) 的步骤，然后在编辑器中将 pick 改为 drop，保存并关闭编辑器。

### 合并提交

要合并多个连续的提交，在编辑器中将除了第一个提交外的所有 pick 改为 squash 或 fixup，然后保存并关闭编辑器。