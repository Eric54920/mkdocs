---
comments: true
---

在 Django 中，路由（URL 路由）用于将 URL 请求映射到相应的视图函数或类视图。Django 提供了一套强大的路由系统，通过 `urls.py` 文件来配置和管理路由。

### 基本概念

1. **URLconf**：URL 配置（URLconf）是一个映射表，将 URL 模式映射到视图。
2. **路径（path）**：定义 URL 模式和视图函数之间的映射关系。
3. **视图（view）**：处理请求并返回响应的函数或类。

### 配置项目 URLconf

每个 Django 项目都有一个全局的 `urls.py` 文件，通常位于项目目录下。这个文件是项目的主 URL 配置文件。

#### 示例项目结构

```
myproject/
    myproject/
        __init__.py
        settings.py
        urls.py
        wsgi.py
    myapp/
        __init__.py
        admin.py
        apps.py
        migrations/
        models.py
        tests.py
        urls.py
        views.py
    manage.py
```

### 定义项目级 URLconf

在 `myproject/urls.py` 文件中定义项目级 URL 配置：

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),  # 包含应用的 URL 配置
]
```

### 定义应用级 URLconf

在 `myapp/urls.py` 文件中定义应用级 URL 配置：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # 匹配根 URL
    path('about/', views.about, name='about'),  # 匹配 /about/ URL
    path('contact/', views.contact, name='contact'),  # 匹配 /contact/ URL
]
```

### 视图函数

在 `myapp/views.py` 文件中定义视图函数：

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world! This is the index page.")

def about(request):
    return HttpResponse("This is the about page.")

def contact(request):
    return HttpResponse("This is the contact page.")
```

### URL 模式中的参数

可以在 URL 模式中捕获参数，并将它们传递给视图函数：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('article/<int:id>/', views.article_detail, name='article_detail'),  # 带参数的 URL
]
```

在视图函数中接收参数：

```python
def article_detail(request, id):
    return HttpResponse(f"Article ID: {id}")
```

### 使用类视图

可以使用类视图来处理请求。在 `myapp/views.py` 中定义类视图：

```python
from django.views import View
from django.http import HttpResponse

class IndexView(View):
    def get(self, request):
        return HttpResponse("Hello, world! This is the index page using class-based view.")
```

在 `myapp/urls.py` 中配置类视图的 URL：

```python
from django.urls import path
from .views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),  # 使用 as_view() 方法
]
```

### 命名空间和反向解析

为了组织大型项目，可以使用 URL 命名空间。在 `myproject/urls.py` 中：

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include(('myapp.urls', 'myapp'), namespace='myapp')),
]
```

在模板或视图中使用反向解析生成 URL：

```html
<a href="{% url 'myapp:index' %}">Home</a>
<a href="{% url 'myapp:about' %}">About</a>
<a href="{% url 'myapp:contact' %}">Contact</a>
```

或者在视图函数中：

```python
from django.urls import reverse

def some_view(request):
    index_url = reverse('myapp:index')
    return HttpResponse(f"Index URL: {index_url}")
```

### 路由的高级功能

#### 路径转换器

Django 提供了多种路径转换器，用于捕获 URL 中的不同类型的数据：

- `<int:id>`：捕获整数
- `<str:name>`：捕获字符串
- `<slug:slug>`：捕获 slug
- `<uuid:uuid>`：捕获 UUID
- `<path:path>`：捕获路径

示例：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('user/<int:id>/', views.user_detail, name='user_detail'),  # 捕获整数
    path('post/<slug:slug>/', views.post_detail, name='post_detail'),  # 捕获 slug
]
```

#### 自定义路径转换器

可以自定义路径转换器：

```python
from django.urls import register_converter

class FourDigitYearConverter:
    regex = '[0-9]{4}'

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return '%04d' % value

register_converter(FourDigitYearConverter, 'yyyy')
```

在 URL 配置中使用自定义转换器：

```python
urlpatterns = [
    path('year/<yyyy:year>/', views.year_view, name='year_view'),
]
```

通过上述方式，你可以在 Django 项目中灵活地配置和管理 URL 路由，处理各种请求，并使用命名空间和反向解析等高级功能来组织大型项目。