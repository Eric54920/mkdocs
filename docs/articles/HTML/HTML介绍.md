---
comments: true
---

HTML（HyperText Markup Language，超文本标记语言）是构建网页和Web应用的标准标记语言。它的主要作用是定义网页的结构和内容，通过使用标签（tags）来标记文本，从而告诉浏览器如何显示网页的各个部分。以下是对HTML的详细介绍：

### 基本概念

**HTML元素**：

   - HTML文档由元素（elements）构成。每个元素由标签（tags）包围的内容组成。
   - 标签通常成对出现，包括起始标签和结束标签，例如：`<p>这是一个段落。</p>`。

**HTML文档结构**：

   - HTML文档由`<!DOCTYPE html>`声明开始，接着是`<html>`根元素，包含`<head>`和`<body>`两个主要部分。

### HTML文档结构示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML介绍</title>
</head>
<body>
  <header>
    <h1>欢迎来到HTML的世界</h1>
  </header>
  <nav>
    <ul>
      <li><a href="#section1">部分1</a></li>
      <li><a href="#section2">部分2</a></li>
    </ul>
  </nav>
  <main>
    <section id="section1">
      <h2>部分1</h2>
      <p>这是部分1的内容。</p>
    </section>
    <section id="section2">
      <h2>部分2</h2>
      <p>这是部分2的内容。</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 HTML介绍</p>
  </footer>
</body>
</html>
```

### 常用标签

**结构标签**：

   - `<html>`：根元素，包含整个HTML文档。
   - `<head>`：包含文档的元数据，如标题、编码、样式、脚本等。
   - `<body>`：包含文档的可见内容。

**文本标签**：

   - `<h1>`至`<h6>`：表示不同级别的标题。
   - `<p>`：表示段落。
   - `<a>`：表示超链接。
   - `<span>`：用于行内元素的容器。
   - `<div>`：用于块级元素的容器。

**列表标签**：

   - `<ul>`：无序列表。
   - `<ol>`：有序列表。
   - `<li>`：列表项。

**表格标签**：

   - `<table>`：定义表格。
   - `<tr>`：定义表格行。
   - `<td>`：定义表格单元格。
   - `<th>`：定义表格头部单元格。

**表单标签**：

   - `<form>`：定义表单。
   - `<input>`：定义输入字段。
   - `<label>`：定义输入字段的标签。
   - `<textarea>`：定义多行文本输入。
   - `<button>`：定义按钮。

**多媒体标签**：

   - `<img>`：嵌入图片。
   - `<audio>`：嵌入音频。
   - `<video>`：嵌入视频。

### 总结

HTML是构建网页的基础，通过使用标签来定义和组织内容。HTML5作为最新的版本，带来了许多新特性和改进，使得Web开发更加灵活和强大。掌握HTML是成为一名Web开发者的基础，也是理解和使用其他Web技术（如CSS和JavaScript）的前提。