---
comments: true
---

在 Django REST Framework (DRF) 中，限流（Throttle）是一种用于限制客户端请求速率的机制，以防止滥用和过载。DRF 提供了多种限流策略，允许你根据不同的需求对 API 进行限流配置。以下是详细介绍 DRF 中限流的内容。

### 限流类

DRF 提供了几种内置的限流类，它们位于 `rest_framework.throttling` 模块中：

1. **AnonRateThrottle**：针对匿名用户的限流策略。
2. **UserRateThrottle**：针对已认证用户的限流策略。
3. **ScopedRateThrottle**：基于视图或视图集中的 `throttle_scope` 属性进行限流。

### 配置限流

首先，需要在 DRF 的配置文件中配置默认的限流类和速率：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '10/day',  # 匿名用户每天10次请求
        'user': '1000/day'  # 认证用户每天1000次请求
    }
}
```

### 使用内置限流类

#### 针对匿名用户的限流

```python
from rest_framework.views import APIView
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response

class MyView(APIView):
    throttle_classes = [AnonRateThrottle]

    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, anonymous user!"})
```

#### 针对已认证用户的限流

```python
from rest_framework.views import APIView
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response

class MyView(APIView):
    throttle_classes = [UserRateThrottle]

    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, authenticated user!"})
```

### 使用 ScopedRateThrottle

ScopedRateThrottle 可以针对特定的视图或视图集设置不同的限流策略。首先需要在视图中定义 `throttle_scope`，然后在配置文件中为每个 scope 设置限流速率：

#### 配置限流速率

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'my_view_scope': '5/minute',  # 每分钟5次请求
        'another_scope': '10/hour'  # 每小时10次请求
    }
}
```

#### 使用 ScopedRateThrottle

```python
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.response import Response

class MyView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'my_view_scope'

    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, scoped user!"})
```

### 自定义限流类

如果内置的限流类不能满足需求，可以创建自定义限流类。自定义限流类需要继承 `BaseThrottle` 并实现 `allow_request` 和 `wait` 方法。

#### 示例：基于IP地址的限流

```python
from rest_framework.throttling import BaseThrottle
import time

class CustomThrottle(BaseThrottle):
    def __init__(self):
        self.history = {}

    def allow_request(self, request, view):
        ip_addr = self.get_ident(request)
        now = time.time()

        if ip_addr not in self.history:
            self.history[ip_addr] = []

        # 清理历史记录，保留最近一分钟内的请求记录
        self.history[ip_addr] = [timestamp for timestamp in self.history[ip_addr] if now - timestamp < 60]

        if len(self.history[ip_addr]) >= 5:  # 每分钟限制5次请求
            return False

        self.history[ip_addr].append(now)
        return True

    def wait(self):
        return 60  # 如果限流，则等待60秒
```

#### 使用自定义限流类

```python
class MyView(APIView):
    throttle_classes = [CustomThrottle]

    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, custom throttled user!"})
```

### 在视图集中使用限流

对于视图集，可以像在单个视图中一样设置限流类：

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.throttling import AnonRateThrottle

class MyViewSet(ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer
    throttle_classes = [AnonRateThrottle]
```

### 全局限流设置

可以在全局配置中设置默认的限流策略，这样所有视图都会应用相同的限流策略：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '10/day',
        'user': '1000/day'
    }
}
```

### 动态调整限流策略

你可以动态调整限流策略，根据特定条件改变速率或禁用限流。可以在视图中动态设置 `throttle_classes` 或者在请求处理中修改配置。

```python
class MyView(APIView):
    def get_throttles(self):
        if self.request.user.is_superuser:
            return []  # 超级用户不受限流
        return [AnonRateThrottle(), UserRateThrottle()]

    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, dynamic throttled user!"})
```

### 总结

在 Django REST Framework 中，限流是保护 API 免受滥用的重要机制。通过合理配置内置的限流类和自定义限流类，可以有效控制请求速率，确保系统稳定性和安全性。希望这些示例和配置方法能够帮助你在项目中更好地实现限流策略。