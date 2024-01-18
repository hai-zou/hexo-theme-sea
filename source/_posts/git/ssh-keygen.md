---
title: 如何生成 SSH 密钥
date: 2023-07-16
tags:
  - Git
---

## 什么是 SSH 密钥？

SSH 密钥是一种安全连接到远程服务器的方式。
通过使用 SSH 密钥，您可以实现更安全、更便捷的身份验证，并免去传统的用户名和密码登录方式。

## 检查是否已有 SSH 密钥

在终端输入以下命令，检查是否已存在 SSH 密钥。

```bash
ls -al ~/.ssh
```

如果显示类似 `id_rsa（私钥）` 和 `id_rsa.pub（公钥）` 的文件，则表示已经存在 SSH 密钥。

## 生成新的 SSH 密钥

如果没有找到现有的 SSH 密钥，可以生成一个新的 SSH 密钥对。

1. 设置用户名和邮箱

```bash
git config --global user.name 'xxx'
git config --global user.email 'xxx@xx.com'
```

2. 输入以下命令生成密钥（一路回车即可，使用默认配置）

```bash
ssh-keygen -t rsa -C "xxx@xx.com"
```

## 查看 SSH 公钥

可以通过以下路径找到 .ssh 文件夹下的 `id_rsa.pub（公钥）` 文件

> C > 用户 > Administrator > .ssh

也可以通过命令行来查看

```bash
cat ~/.ssh/id_rsa.pub
```

最后将 SSH 公钥内容复制到需要使用密钥进行身份验证的平台
