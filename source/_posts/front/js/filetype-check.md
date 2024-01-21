---
title: 检测无后缀名的文件类型
date: 2023-12-05 16:56:03
categories: 
  - 前端
tags:
  - JavaScript
---

## 前言
一般情况下我们判断一个文件是什么类型都是通过看它的后缀名，例如 `xx.mp3` `xx.mp4` `xx.jpg`，但是这并不准确！
假如我把 `xx.wav` 文件的后缀手动改成了 `.mp3` ，但它的文件类型依旧是 wav，因为计算机是通过读取文件二进制的前几个字节来区分文件类型，
对于大多数类型的文件，起始字节都是固定的，这些字节通常被称为 “魔数” （Magic Number）

## 常见文件的“魔数”

1. JPEG 图片：`FF D8 FF DB` | `49 46 00 01` ...
2. PNG 图片：`89 50 4E 47 0D 0A 1A 0A` ...
3. MP3 音频：`49 44 33` | `FF FB` | `FF F3` | `FF F2` ...
4. MP4 视频：`66 74 79 70 69 73 6F 6D` ...

更多请参考 [维基百科 - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)

## 读取文件二进制数据

```ts
const reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.onload = (e) => {
    // 这里就拿到了文件的二进制数据
    const arrBuffer = e.target.result as ArrayBuffer;
};
reader.onerror = (err) => {
    throw new Error(err);
};
```

## 二进制数组 转 16进制字符串

{% note warning %}
这里有个需要注意的地方，如果文件太大了，导致二进制数组长度超过 2^32，
使用 Array.form 方法转换时候会报错 `invalid array length`。
详情可参考：[MDN - invalid array length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Invalid_array_length)
{% endnote %}


```ts
function bufferToString(buffer: ArrayBuffer) {
    const uint8Array = new Uint8Array(buffer, 0, Math.pow(2, 16));
    return Array.from(uint8Array)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}
```

## 类型判断

最后通过正则去匹配字符串开头是否包含对于文件的“魔数”。

```ts
const Mp3MagicNum = ['494433', 'FFE2', 'FFE3', 'FFF2', 'FFF3', 'FFFA', 'FFFB'];

function isMp3Type(hex: string) {
    for (let key of this.Mp3MagicNum) {
        if (new RegExp('^' + key, 'i').test(hex)) return true;
    }
    return false;
}

const hex = bufferToString(arrBuffer);
const isMp3 = isMp3Type(hex);
```