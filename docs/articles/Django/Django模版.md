Django 的模板系统提供了一种灵活而强大的方式来生成动态 HTML。模板系统支持变量替换、标签（如循环和条件语句）以及过滤器（对变量进行处理）。了解模板和过滤器的使用方法，有助于更好地组织和生成 HTML 内容。

### Django 模板

#### 创建模板

模板是一个包含静态 HTML 和 Django 模板语言的文件。通常，将模板文件保存在应用的 `templates` 目录中。

示例模板文件 `my_template.html`：

```html
<!-- templates/my_template.html -->

<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>{{ heading }}</h1>
    <p>{{ content }}</p>
</body>
</html>
```

#### 渲染模板

在视图中使用 `render` 函数来渲染模板。`render` 函数需要传递请求对象、模板名称和上下文（一个包含模板变量的字典）。

```python
# views.py

from django.shortcuts import render

def my_view(request):
    context = {
        'title': 'My Page Title',
        'heading': 'Welcome to My Page',
        'content': 'This is the content of my page.'
    }
    return render(request, 'my_template.html', context)
```

### Django 模板标签

模板标签允许在模板中执行逻辑操作，如条件判断和循环。

#### 常用模板标签

- `{% if %}`: 条件语句
- `{% for %}`: 循环
- `{% block %}`: 块标签，用于模板继承
- `{% extends %}`: 模板继承
- `{% include %}`: 包含其他模板

示例：

```html
<!-- templates/conditional_template.html -->

<!DOCTYPE html>
<html>
<head>
    <title>Conditional Template</title>
</head>
<body>
    {% if user.is_authenticated %}
        <p>Welcome, {{ user.username }}!</p>
    {% else %}
        <p>Welcome, guest!</p>
    {% endif %}
</body>
</html>
```

```html
<!-- templates/loop_template.html -->

<!DOCTYPE html>
<html>
<head>
    <title>Loop Template</title>
</head>
<body>
    <ul>
        {% for item in item_list %}
            <li>{{ item }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```

### Django 模板过滤器

模板过滤器用于对变量进行处理，可以进行格式化、转换等操作。

#### 常用模板过滤器

- `date`: 格式化日期
- `length`: 返回序列的长度
- `lower`: 转换为小写
- `upper`: 转换为大写
- `truncatechars`: 截断字符
- `default`: 如果变量是空的，使用默认值

示例：

```html
<!-- templates/filters_template.html -->

<!DOCTYPE html>
<html>
<head>
    <title>Filters Template</title>
</head>
<body>
    <p>Original: {{ text }}</p>
    <p>Lowercase: {{ text|lower }}</p>
    <p>Uppercase: {{ text|upper }}</p>
    <p>Truncated: {{ text|truncatechars:10 }}</p>
    <p>Date: {{ date|date:"Y-m-d" }}</p>
</body>
</html>
```

### 自定义过滤器

如果内置的过滤器不能满足需求，可以创建自定义过滤器。

#### 创建自定义过滤器

在应用中创建一个 `templatetags` 目录，并在其中创建一个 Python 模块。例如，创建 `myapp/templatetags/custom_filters.py`：

```python
# myapp/templatetags/custom_filters.py

from django import template

register = template.Library()

@register.filter
def multiply(value, arg):
    return value * arg
```

#### 在模板中使用自定义过滤器

首先，确保模板加载自定义过滤器模块。

```html
<!-- templates/custom_filters_template.html -->

{% load custom_filters %}

<!DOCTYPE html>
<html>
<head>
    <title>Custom Filters Template</title>
</head>
<body>
    <p>Original: {{ number }}</p>
    <p>Multiplied: {{ number|multiply:3 }}</p>
</body>
</html>
```

### 模板继承

模板继承使得我们可以创建一个基础模板，并在其他模板中扩展它。这有助于保持模板的结构和样式一致。

#### 基础模板

```html
<!-- templates/base.html -->

<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
</head>
<body>
    <header>
        <h1>Site Header</h1>
    </header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer>
        <p>Site Footer</p>
    </footer>
</body>
</html>
```

#### 扩展模板

```html
<!-- templates/child_template.html -->

{% extends "base.html" %}

{% block title %}Child Page{% endblock %}

{% block content %}
    <p>This is the content of the child page.</p>
{% endblock %}
```

### 示例

完整示例展示如何使用模板、标签、过滤器和模板继承。

```python
# views.py

from django.shortcuts import render
from datetime import datetime

def example_view(request):
    context = {
        'title': 'Example Page',
        'heading': 'Welcome to Example Page',
        'content': 'This is an example content.',
        'date': datetime.now(),
        'item_list': ['item1', 'item2', 'item3'],
        'text': 'Django is Awesome!',
        'number': 5
    }
    return render(request, 'child_template.html', context)
```

```html
<!-- templates/base.html -->

<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
</head>
<body>
    <header>
        <h1>Site Header</h1>
    </header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer>
        <p>Site Footer</p>
    </footer>
</body>
</html>
```

```html
<!-- templates/child_template.html -->

{% extends "base.html" %}

{% block title %}Child Page{% endblock %}

{% block content %}
    <h1>{{ heading }}</h1>
    <p>{{ content }}</p>
    <p>Date: {{ date|date:"Y-m-d" }}</p>
    <ul>
        {% for item in item_list %}
            <li>{{ item }}</li>
        {% endfor %}
    </ul>
    <p>Original: {{ text }}</p>
    <p>Lowercase: {{ text|lower }}</p>
    <p>Uppercase: {{ text|upper }}</p>
    <p>Multiplied: {{ number|multiply:3 }}</p>
{% endblock %}
```

### 总结

Django 的模板系统提供了强大的功能，包括变量替换、模板标签和过滤器。通过这些工具，可以灵活地生成动态 HTML 内容。同时，模板继承机制使得我们可以创建可重用的模板结构，保持代码的干净和一致性。自定义过滤器进一步扩展了模板系统的功能，使其更符合特定的应用需求。