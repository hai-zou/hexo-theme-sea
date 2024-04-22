---
title: Vue 自定义组件的双向绑定
date: 2023-07-30 16:50:00
categories: 
  - 前端
tags:
  - Vue
---

## 什么是双向绑定？
双向绑定是一种数据绑定的概念，它能够在数据模型和用户界面之间建立起双向的关联。
当数据发生变化时，界面会自动更新；而当用户在界面中进行操作时，数据也会相应地被更新。
这种双向的数据流动能够实现实时的数据同步。

## Vue 中的 V-Model

在 Vue 中，就是通过 v-model 指令在表单控件元素上实现双向数据绑定。当使用 v-model 指令时，Vue 实际上会做两件事情。
1. 首先，它会将 value 绑定到表单控件的值属性上。这意味着控件的值会随着 value 的变化而更新，实现了从数据到界面的单向绑定。
2. 其次，它会为控件绑定一个 input 事件监听器，当用户在控件中输入时，会触发该事件并将新的值作为事件参数传递。在事件处理程序中，我们可以将新的值赋给 value，从而实现从界面到数据的更新。

```html
<input v-model="value" />
```

为了更清晰地理解双向绑定的工作原理，我们可以手动展开 v-model 的实现。
通过使用 `:value="value"`，我们将 value 的值绑定到了控件的值属性上。
而通过 `@input="value = $event.target.value"`，我们监听了控件的 input 事件，并在事件触发时将新的值赋给了 value。
```html
<input
    :value="value"
    @input="value = $event.target.value"
/>
```

## 自定义组件实现双向绑定

自定义一个 `CustomInput.vue` **子组件**。

- 使用 defineProps 来声明了一个 `modelValue` 的属性
- 使用 defineEmits 来声明了一个 `update:modelValue` 的自定义事件

```js
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
```

- 接受父组件传递过来的 `modelValue`，并绑定到输入框上。
- 监听输入框的 input 事件，并触发 `update:modelValue` 事件，将最新的值传递给父组件。

```html
<input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
/>
```

最后就能直接在**父组件**中使用 v-model 指令了。

```html
<CustomInput v-model="value" />

<!-- v-model 的展开实现如下： -->
<CustomInput
    :modelValue="value"
    @update:modelValue="newValue => value = newValue"
/>
```

## 注意
> v-model 在组件上默认都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的事件。  
> 当然也可以自定义参数

```html
<CustomInput v-model:title="value" />
```

```js
defineProps(['title']);
defineEmits(['update:title']);
```

```html
<input
    :value="title"
    @input="$emit('update:title', $event.target.value)"
/>
```