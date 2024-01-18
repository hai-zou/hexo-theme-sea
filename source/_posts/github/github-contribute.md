---
title: 为什么你的 GitHub Contributions 没有被正确统计
date: 2023-09-22 09:43:00
tags:
  - GitHub
---

## 问题排查

在公司摸鱼的时候写了点自己的代码，但是当我打开 Github 主页查看贡献图的时候发现我的提交没有被记录，于是我通过 `git log` 查询 Commit 记录，检查出作者信息中的邮箱地址有误，没有切换成个人的邮箱地址。

![Contributions](/images/github-contribute_1.webp)

## 如何解决？

**修改已提交的 Commit 信息中的作者信息**

1. 通过以下命令拉取一个新的仓库

```bash
git clone --bare https://github.com/user/repo.git

cd repo.git
```

2. 复制以下脚本，替换：`旧的Email地址`，`正确的用户名`，`正确的邮件地址`

```bash
#!/bin/sh
git filter-branch --env-filter '
OLD_EMAIL="旧的Email地址"
CORRECT_NAME="正确的用户名"
CORRECT_EMAIL="正确的邮件地址"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

3. 脚本运行成功后，查看 Commit 信息是否替换成功
4. 将正确的 Commit 历史推送到远程仓库

```bash
git push --force --tags origin 'refs/heads/*'
```

5. 删除刚创建的本地仓库

```bash
cd ..

rm -rf repo.git
```

## 如何避免？

给项目单独设置用户名和邮箱

方法一：在项目根路径执行以下命令

```bash
git config --local user.name xxx
git config --local user.email xxx
```

方法二：在 `.git/config` 配置文件中设置

```bash
[user]
    name = xxx
    email = xxx
```
