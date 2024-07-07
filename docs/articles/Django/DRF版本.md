---
comments: true
---

在 Django REST Framework (DRF) 中，版本控制（Versioning）是一个重要的功能，它允许你在 API 中提供不同版本的接口，以便于在不断改进和扩展 API 的同时，不影响现有的客户端。DRF 提供了多种版本控制方案，并允许你自定义版本控制策略。以下是详细介绍 DRF 版本控制的内容。

### 配置版本控制

首先，需要在 DRF 的配置文件中配置默认的版本控制类和其他相关参数：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'VERSION_PARAM': 'version',
}
```

### 版本控制类

DRF 提供了几种内置的版本控制类，位于 `rest_framework.versioning` 模块中：

1. **URLPathVersioning**：基于 URL 路径的版本控制。
2. **QueryParameterVersioning**：基于查询参数的版本控制。
3. **HeaderVersioning**：基于请求头的版本控制。
4. **AcceptHeaderVersioning**：基于 Accept 请求头的版本控制。
5. **NamespaceVersioning**：基于 URL 命名空间的版本控制。

### 使用版本控制类

#### URLPathVersioning

这种版本控制策略将版本号作为 URL 路径的一部分，例如 `/api/v1/resource/`。

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'VERSION_PARAM': 'version',
}
```

在 URL 配置中指定版本号：

```python
from django.urls import path
from .views import MyView

urlpatterns = [
    path('api/v1/resource/', MyView.as_view(), name='resource-v1'),
    path('api/v2/resource/', MyView.as_view(), name='resource-v2'),
]
```

#### QueryParameterVersioning

这种版本控制策略将版本号作为查询参数的一部分，例如 `/api/resource/?version=v1`。

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.QueryParameterVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'VERSION_PARAM': 'version',
}
```

在视图中处理版本：

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class MyView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version
        if version == 'v1':
            return Response({"message": "This is version 1"})
        elif version == 'v2':
            return Response({"message": "This is version 2"})
```

#### HeaderVersioning

这种版本控制策略将版本号作为请求头的一部分，例如 `X-Version: v1`。

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.HeaderVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'VERSION_PARAM': 'X-Version',
}
```

在视图中处理版本：

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class MyView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version
        if version == 'v1':
            return Response({"message": "This is version 1"})
        elif version == 'v2':
            return Response({"message": "This is version 2"})
```

#### AcceptHeaderVersioning

这种版本控制策略将版本号作为 Accept 请求头的一部分，例如 `Accept: application/json; version=v1`。

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.AcceptHeaderVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'VERSION_PARAM': 'version',
}
```

在视图中处理版本：

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class MyView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version
        if version == 'v1':
            return Response({"message": "This is version 1"})
        elif version == 'v2':
            return Response({"message": "This is version 2"})
```

#### NamespaceVersioning

这种版本控制策略将版本号作为 URL 命名空间的一部分，例如 `/v1/resource/`。

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
    'VERSION_PARAM': 'version',
}
```

在 URL 配置中指定命名空间：

```python
from django.urls import path, include
from .views import MyView

v1_patterns = [
    path('resource/', MyView.as_view(), name='resource-v1'),
]

v2_patterns = [
    path('resource/', MyView.as_view(), name='resource-v2'),
]

urlpatterns = [
    path('v1/', include((v1_patterns, 'v1'), namespace='v1')),
    path('v2/', include((v2_patterns, 'v2'), namespace='v2')),
]
```

### 自定义版本控制类

如果内置的版本控制类不能满足需求，可以创建自定义版本控制类。自定义版本控制类需要继承 `BaseVersioning` 并实现 `determine_version` 方法。

```python
from rest_framework.versioning import BaseVersioning

class CustomVersioning(BaseVersioning):
    def determine_version(self, request, *args, **kwargs):
        version = request.headers.get('X-Custom-Version')
        if not version:
            version = 'v1'  # 默认版本
        return version
```

在配置文件中使用自定义版本控制类：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'path.to.CustomVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
}
```

### 视图中的版本处理

无论使用哪种版本控制策略，在视图中都可以通过 `request.version` 获取当前请求的版本号，根据版本号执行不同的逻辑。

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class MyView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version
        if version == 'v1':
            return Response({"message": "This is version 1"})
        elif version == 'v2':
            return Response({"message": "This is version 2"})
        else:
            return Response({"message": "Unknown version"}, status=400)
```

### 总结

在 Django REST Framework 中，版本控制是一个非常强大的功能，可以帮助你管理 API 的不同版本，确保向后兼容性。通过使用内置的版本控制类或自定义版本控制类，可以灵活地实现 API 的版本控制。希望这些示例和配置方法能够帮助你在项目中更好地实现版本控制功能。