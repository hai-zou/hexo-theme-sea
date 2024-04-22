---
title: 解决 Video 中设置字幕出现的跨域问题
date: 2023-08-19 09:01:50
categories: 
  - 前端
tags:
 - JavaScript
---

## 前言
最近在写一个视频播放器，但是当我给视频添加字幕之后，出现了跨域问题，这里记录一下。

以下是用于测试的视频和字幕的链接

- 视频：https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4
- 字幕：https://cdn.plyr.io/static/demo/thumbs/240p.vtt

可以看出视频和字幕在同一个域下，视频可以正常播放，但是字幕却出现了跨域报错：

![跨域报错](https://image.luckyzh.cn/images/video-track-cors_1.webp)

## 问题分析

```html
<video id="player" height="400px" controls>
    <source
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        type="video/mp4"
    />

    <track
        kind="captions"
        src="https://cdn.plyr.io/static/demo/thumbs/240p.vtt"
        srclang="en"
        label="English"
        default
    />
</video>
```

由于视频可以正常播放，可以说明 `https://cdn.plyr.io` 是允许跨域的，所以问题不出在链接上。

上 Google 搜索之后得出结论：`<track>` 元素的 `src` 属性只能使用同源路径。HTML 规范并没有提供官方的明确解释，但这是出于安全和隐私考虑的设计。

## 解决方案

既然只能使用同源路径，那么有两种解决办法：

1. 将字幕下载下来，放到项目中，然后使用相对路径
2. 通过 `URL.createObjectURL()` 创建一个临时的 URL 路径

> `URL.createObjectURL` 是一个用于在浏览器中创建临时 URL 的 JavaScript 方法。
> 它可以将一个 Blob 或 File 对象转换为一个 URL，用于在网页中加载和显示这些对象，例如在 `<video>`、`<audio>` 或 `<img>` 标签中展示。

以下是通过 `URL.createObjectURL` 解决字幕文件跨域的代码：

```js
const player = document.getElementById('player');

fetch('https://cdn.plyr.io/static/demo/thumbs/240p.vtt')
    .then(res => res.text())
    .then(data => {
        const blob = new Blob([data], { type: 'text/vtt' });
        const url = URL.createObjectURL(blob);

        const newTrack = document.createElement('track');
        newTrack.kind = 'captions';
        newTrack.label = 'English';
        newTrack.srclang = 'en';
        newTrack.src = url;
        newTrack.default = true;
        player.appendChild(newTrack);
        player.load();
    });
```

通过 `fetch` 请求字幕文件，将内容做一层转换，绕过了 `track` 元素对于非同源路径的跨域限制，完美的解决了这个问题。  

![字幕显示效果](https://image.luckyzh.cn/images/video-track-cors_2.webp)