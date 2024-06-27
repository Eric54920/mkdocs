内容协商（Content Negotiation）是 Django REST Framework (DRF) 中用于确定 API 响应格式的一项重要功能。通过内容协商，API 可以根据客户端的请求头信息（如 `Accept` 头）自动选择合适的渲染器（Renderer）来生成响应数据。

### 内容协商的工作原理

1. **客户端请求**：客户端发送一个包含 `Accept` 头的 HTTP 请求，以指明它希望接收到的数据格式。
2. **内容协商器（Content Negotiator）**：DRF 的内容协商器会读取客户端的请求头，并根据预定义的规则选择一个合适的渲染器。
3. **渲染器**：选定的渲染器会将视图返回的数据渲染为客户端请求的格式（如 JSON、XML 等）。

### 默认内容协商类

DRF 提供了一个默认的内容协商类 `DefaultContentNegotiation`。这个类根据客户端的 `Accept` 头信息选择合适的渲染器。如果没有指定 `Accept` 头，则使用默认的渲染器。

### 自定义内容协商

你可以通过创建自定义内容协商类来改变默认的内容协商行为。自定义内容协商类需要继承 `BaseContentNegotiation` 并实现 `select_renderer` 方法。

#### 示例：自定义内容协商

假设你想创建一个自定义内容协商类，当 `Accept` 头包含 `application/vnd.api+json` 时选择 JSON 渲染器，否则选择默认的渲染器。

```python
from rest_framework.negotiation import BaseContentNegotiation
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

class CustomContentNegotiation(BaseContentNegotiation):
    def select_renderer(self, request, renderers, format_suffix):
        # 检查 Accept 头是否包含 application/vnd.api+json
        accept_header = request.META.get('HTTP_ACCEPT', '')
        if 'application/vnd.api+json' in accept_header:
            for renderer in renderers:
                if isinstance(renderer, JSONRenderer):
                    return (renderer, renderer.media_type)
        
        # 如果没有匹配的，使用默认渲染器
        return super().select_renderer(request, renderers, format_suffix)
```

然后在 DRF 的设置中配置这个自定义内容协商类：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_CONTENT_NEGOTIATION_CLASS': 'path.to.CustomContentNegotiation',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
}
```

### 全局配置内容协商

你可以在全局配置文件中设置默认的内容协商类：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_CONTENT_NEGOTIATION_CLASS': 'rest_framework.negotiation.DefaultContentNegotiation',
}
```

### 视图级别配置内容协商

你还可以在具体的视图或视图集中覆盖默认的内容协商类：

```python
from rest_framework.views import APIView
from rest_framework.negotiation import DefaultContentNegotiation

class MyView(APIView):
    content_negotiation_class = DefaultContentNegotiation

    def get(self, request, *args, **kwargs):
        data = {"message": "Hello, world!"}
        return Response(data)
```

### 示例项目配置

以下是一个示例项目配置，展示了如何使用自定义内容协商类：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_CONTENT_NEGOTIATION_CLASS': 'path.to.CustomContentNegotiation',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
        'rest_framework.renderers.TemplateHTMLRenderer',
        'rest_framework.renderers.XMLRenderer',
    ),
}
```

在视图中：

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class MyView(APIView):
    def get(self, request, *args, **kwargs):
        data = {"message": "Hello, world!"}
        return Response(data)
```

### 处理多种格式的响应

通过上述配置，客户端可以通过 `Accept` 请求头来选择响应格式：

- `Accept: application/json` 返回 JSON 格式的数据。
- `Accept: text/html` 返回 HTML 页面。
- `Accept: application/xml` 返回 XML 格式的数据。
- `Accept: application/vnd.api+json` 返回 JSON 格式的数据（通过自定义内容协商）。

### 总结

Django REST Framework 的内容协商功能强大且灵活，能够根据客户端的请求自动选择合适的响应格式。通过配置和自定义内容协商类，可以满足不同客户端的需求，提供灵活的 API 响应格式。希望这些示例和配置方法能够帮助你在项目中更好地使用 DRF 的内容协商功能。