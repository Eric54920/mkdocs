---
comments: true
---

Django 是一个高级的 Python Web 框架，旨在快速开发和干净、实用的设计。它鼓励使用快速开发和遵循“不要重复自己”（DRY）原则。Django 提供了许多功能，使得 Web 开发变得更加简单和高效。

### Django 的主要功能

1. **ORM（对象关系映射）**：Django 提供了一个强大的 ORM，使得你可以使用 Python 类定义数据库模型，并通过 Python 代码进行数据库查询，而不需要编写 SQL。
2. **URL 路由**：Django 提供了灵活的 URL 路由系统，可以将 URL 映射到视图函数或类。
3. **视图**：Django 支持函数视图和类视图，使得处理 HTTP 请求更加灵活。
4. **模板**：Django 的模板引擎允许你使用 Django 模板语言生成动态 HTML。
5. **表单处理**：Django 提供了强大的表单处理机制，包括表单验证和表单显示。
6. **身份验证和权限**：Django 内置了强大的用户认证和权限系统。
7. **中间件**：Django 支持中间件，使得你可以在请求和响应的过程中添加额外的处理逻辑。
8. **国际化和本地化**：Django 支持多语言和国际化，使得你可以轻松地为全球用户开发应用。

### 创建 Django 项目

#### 安装 Django

首先，需要安装 Django。你可以使用 `pip` 来安装：

```bash
pip install django
```

#### 创建 Django 项目

使用 `django-admin` 命令创建一个新的 Django 项目：

```bash
django-admin startproject myproject
```

这将创建一个包含基本项目结构的目录：

```
myproject/
    manage.py
    myproject/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

#### 创建 Django 应用

在 Django 项目中，应用是功能模块。使用 `manage.py` 创建一个新的应用：

```bash
cd myproject
python manage.py startapp myapp
```

这将创建一个新的应用目录：

```
myapp/
    __init__.py
    admin.py
    apps.py
    models.py
    tests.py
    views.py
```

### 配置 Django 项目

#### 添加应用到项目设置

在 `myproject/settings.py` 文件中，添加新创建的应用到 `INSTALLED_APPS` 列表：

```python
# myproject/settings.py

INSTALLED_APPS = [
    ...
    'myapp',
]
```

### 定义模型

在 `myapp/models.py` 文件中，定义你的数据库模型：

```python
# myapp/models.py

from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

#### 创建数据库表

使用 `makemigrations` 和 `migrate` 命令创建数据库表：

```bash
python manage.py makemigrations
python manage.py migrate
```

### 创建视图

在 `myapp/views.py` 文件中，创建一个视图函数：

```python
# myapp/views.py

from django.http import HttpResponse
from .models import Article

def index(request):
    articles = Article.objects.all()
    output = ', '.join([article.title for article in articles])
    return HttpResponse(output)
```

### 配置 URL 路由

在 `myapp/urls.py` 文件中，配置应用的 URL 路由：

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

在项目的 `urls.py` 文件中，包含应用的 URL 路由：

```python
# myproject/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
]
```

### 创建模板

在应用目录中创建一个 `templates` 目录，并在其中创建 HTML 模板：

```
myapp/
    templates/
        myapp/
            index.html
```

在 `myapp/views.py` 文件中，渲染模板：

```python
# myapp/views.py

from django.shortcuts import render
from .models import Article

def index(request):
    articles = Article.objects.all()
    return render(request, 'myapp/index.html', {'articles': articles})
```

在模板文件 `myapp/templates/myapp/index.html` 中：

```html
<!-- myapp/templates/myapp/index.html -->

<!DOCTYPE html>
<html>
<head>
    <title>Articles</title>
</head>
<body>
    <h1>Articles</h1>
    <ul>
        {% for article in articles %}
            <li>{{ article.title }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```

### 启动开发服务器

使用 `runserver` 命令启动 Django 开发服务器：

```bash
python manage.py runserver
```

访问 `http://127.0.0.1:8000/myapp/` 查看效果。

### 其他功能

#### Django 管理后台

Django 提供了一个强大的管理后台，可以用于管理模型数据。要使用管理后台，需要在 `myapp/admin.py` 文件中注册模型：

```python
# myapp/admin.py

from django.contrib import admin
from .models import Article

admin.site.register(Article)
```

访问 `http://127.0.0.1:8000/admin/` 并使用超级用户账户登录即可管理模型数据。要创建超级用户，可以使用以下命令：

```bash
python manage.py createsuperuser
```

#### 表单处理

Django 提供了强大的表单处理功能，可以使用 `django.forms` 创建和处理表单。

#### 用户认证和权限

Django 提供了完整的用户认证和权限系统，可以方便地管理用户和权限。

#### 中间件

Django 支持中间件，可以在请求和响应的过程中添加额外的处理逻辑。

### 总结

Django 是一个功能强大的 Web 框架，提供了丰富的功能和灵活性，使得 Web 开发更加高效和便捷。通过理解 Django 的核心概念和功能，可以更好地利用 Django 进行 Web 开发。