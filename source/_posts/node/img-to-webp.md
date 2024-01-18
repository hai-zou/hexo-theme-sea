---
title: 分享一个图片转 .webp 格式的脚本
date: 2023-12-01
tags:
  - Node
---

## 简介
webp 格式的图片在保持图像质量的前提下，能够显著减小文件尺寸，提高网页加载速度。
以下是一段之前写过的图片格式转 webp 的 Node 脚本，留作记录。

```js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const originDir = path.join(process.cwd(), "docs/public/article");
const outputDir = path.join(process.cwd(), "docs/public/images");

fs.readdir(originDir, (err, files) => {
    if (err) {
        console.error('读取文件夹内容时发生错误:', err);
    } else {
        transImg(files);
    }
});

function transImg(imgDirs) {
    const isExist = fs.existsSync(outputDir);
    if (!isExist) {
        fs.mkdirSync(outputDir);
    }

    imgDirs.forEach(item => {
        const img = path.join(originDir, item);
        const { name } = path.parse(img);
        const newPath = path.format({
            dir: outputDir,
            name,
            ext: ".webp"
        });
        sharp(img).toFormat('webp')
            .toFile(newPath, (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(info);
                }
            });
    });
}
```