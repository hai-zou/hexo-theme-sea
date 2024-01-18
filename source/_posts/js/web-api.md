---
title: 推荐一些冷门但是好用的 Api
date: 2023-08-12 10:48:20
tags:
 - JavaScript
---

## postMessage

### 作用
`postMessage` 是一个 JavaScript API，用于在不同窗口或标签页之间进行跨域通信。
它允许一个窗口向另一个窗口发送消息，无论这两个窗口是否来自同一个域

### 用法

1. 发送消息到另一个标签页
```js
const targetWindow = window.open('https://example.com/other-page');
const message = 'Hello from the first tab!';
targetWindow.postMessage(message, 'https://example.com');
```
2. 接收消息
```js
window.addEventListener('message', event => {
    if (event.origin === 'https://example.com') {
        const receivedMessage = event.data;
        console.log('Received message:', receivedMessage);
    }
});
```

## MutationObserver

### 作用
`MutationObserver` 是一个 JavaScript API，用于监听 DOM 树中的变化，当所观察的 DOM 元素发生更改时，可以触发指定的回调函数。
这在监测 DOM 变化、实时响应用户交互等场景下非常有用。

### 用法
1. 创建 MutationObserver 对象
```js
const observer = new MutationObserver((mutationsList, observer) => {
    // 在这里处理 DOM 变化
});
```
2. 配置观察目标和选项
```js
const targetElement = document.getElementById('target'); // 要观察的 DOM 元素

const config = {
    attributes: true, // 是否观察属性的变化
    childList: true,  // 是否观察子元素的添加/移除
    subtree: true     // 是否观察所有子孙节点
};

observer.observe(targetElement, config);
```
3. 处理 DOM 变化
```js
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            console.log(`属性 ${mutation.attributeName} 发生变化`);
        } else if (mutation.type === 'childList') {
            console.log('子元素发生变化');
        }
    }
});
```
4. 停止观察
```js
observer.disconnect();

```

## URLSearchParams

### 作用
`URLSearchParams` 是 JavaScript 中用于操作 URL 查询参数的内置对象。它提供了一组方法，可以方便地创建、解析和操作 URL 查询参数。

### 用法
1. 创建 URLSearchParams 对象
```js
// 从 URL 查询字符串创建
const paramsString = 'name=John&age=30';
const params = new URLSearchParams(paramsString);

// 从对象创建
const paramsObject = { name: 'John', age: '30' };
const params = new URLSearchParams(paramsObject);
```
2. 添加、获取和删除参数
```js
params.append('city', 'New York');
const cityName = params.get('city');
params.delete('age');
```
3. 迭代参数
```js
for (const key of params.keys()) {
    console.log(key); // 输出每个参数的键
}

for (const value of params.values()) {
    console.log(value); // 输出每个参数的值
}

for (const pair of params.entries()) {
    console.log(pair); // 输出每个参数的键值对数组
}
```
4. 转换为查询字符串
```js
const queryString = params.toString();
console.log(queryString); // 输出：name=John&city=New+York
```
5. 在 URL 上使用
```js
const url = new URL('https://example.com');
url.search = params.toString(); // 将查询参数附加到 URL
console.log(url.href); // 输出完整 URL

const queryParams = new URLSearchParams(url.search); // 从 URL 中提取查询参数
```

## Clipboard

### 作用
Clipboard API 可以实现与用户剪贴板的交互，从而在网页中执行复制和粘贴操作。

### 用法
1. 复制内容到剪贴板
```js
const textToCopy = '这是要复制的文本内容';
navigator.clipboard.writeText(textToCopy)
    .then(() => {
        console.log('文本已成功复制到剪贴板');
    })
    .catch(err => {
        console.error('无法复制文本:', err);
    });
```
2. 从剪贴板粘贴内容
```js
navigator.clipboard.readText()
    .then(pastedText => {
        console.log('从剪贴板粘贴的文本:', pastedText);
    })
    .catch(err => {
        console.error('无法粘贴文本:', err);
    });
```

## Notification

### 作用
`Notification API` 是一种用于在浏览器中显示桌面通知的 Web API。
它允许网站向用户发送系统级别的通知消息，无需用户主动打开网站页面。这对于实时事件、提醒和用户互动非常有用。

### 用法
```js
const options = {
    body: '这是通知内容',
    icon: '图标 URL',
    badge: '徽章 URL',
    sound: '声音 URL',
    tag: '标签名称',
    vibrate: [200, 100, 200], // 震动模式
    requireInteraction: true, // 是否需要用户交互
    actions: [
        { action: 'action-1', title: '操作1' },
        { action: 'action-2', title: '操作2' }
    ]
};

const notification = new Notification('通知标题', options);

notification.onclick = event => {
    // 通知被点击时触发的操作
};

notification.onclose = event => {
    // 通知被关闭时触发的操作
};

notification.onshow = event => {
    // 通知显示时触发的操作
};

```
