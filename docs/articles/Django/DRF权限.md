---
comments: true
---

在 Django REST Framework (DRF) 中，权限是一个非常重要的概念，它决定了哪些用户可以访问哪些视图。DRF 提供了多种内置的权限类，并允许开发者自定义权限，以满足特定的需求。以下是详细介绍 DRF 中权限的内容：

### 内置权限类

DRF 提供了一些常用的内置权限类，包含在 `rest_framework.permissions` 模块中。

**AllowAny**
   
   - 允许任何人访问，无需进行身份验证。
  
   ```python
   from rest_framework.permissions import AllowAny

   class MyView(APIView):
       permission_classes = [AllowAny]
       # ...
   ```

**IsAuthenticated**
   
   - 仅允许经过身份验证的用户访问。
   
   ```python
   from rest_framework.permissions import IsAuthenticated

   class MyView(APIView):
       permission_classes = [IsAuthenticated]
       # ...
   ```

**IsAdminUser**
   
   - 仅允许管理员用户访问（`is_staff` 属性为 `True`）。
   
   ```python
   from rest_framework.permissions import IsAdminUser

   class MyView(APIView):
       permission_classes = [IsAdminUser]
       # ...
   ```

**IsAuthenticatedOrReadOnly**
   
   - 对于未经身份验证的用户，允许只读操作；对经过身份验证的用户，允许读写操作。
   
   ```python
   from rest_framework.permissions import IsAuthenticatedOrReadOnly

   class MyView(APIView):
       permission_classes = [IsAuthenticatedOrReadOnly]
       # ...
   ```

### 自定义权限类

有时内置的权限类不能满足需求，这时可以创建自定义权限类。自定义权限类需要继承 `BasePermission` 并重写 `has_permission` 和/或 `has_object_permission` 方法。

- `has_permission(self, request, view)`：用于检查用户是否对视图有权限。
- `has_object_permission(self, request, view, obj)`：用于检查用户是否对特定对象有权限。

#### 示例：仅允许作者修改自己的对象

```python
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        # 假设对象有一个 `owner` 属性
        return obj.owner == request.user
```

#### 使用自定义权限类

```python
class MyView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def get(self, request, *args, **kwargs):
        # 获取对象实例
        obj = self.get_object()
        self.check_object_permissions(request, obj)
        # ...
```

### 在视图中使用权限

权限类可以在视图或视图集的 `permission_classes` 属性中指定。

#### 在 `APIView` 中使用权限

```python
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class MyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # 处理 GET 请求
        return Response(data)
```

#### 在 `ViewSet` 中使用权限

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

class MyViewSet(ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer
    permission_classes = [IsAuthenticated]
```

### 全局权限设置

你可以在 DRF 的配置文件中设置全局权限，所有视图默认都会使用这些权限。

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}
```

### 结合多个权限类

你可以在视图中组合多个权限类，所有的权限类都必须通过检查才能授予访问权限。

```python
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class MyView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        # 处理 GET 请求
        return Response(data)
```

### 示例：基于权限的简单 API

#### 创建权限类

```python
# permissions.py
from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user
```

#### 使用权限类

```python
# views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from .models import MyModel
from .serializers import MyModelSerializer

class MyModelDetail(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            return MyModel.objects.get(pk=pk)
        except MyModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        mymodel = self.get_object(pk)
        self.check_object_permissions(request, mymodel)
        serializer = MyModelSerializer(mymodel)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        mymodel = self.get_object(pk)
        self.check_object_permissions(request, mymodel)
        serializer = MyModelSerializer(mymodel, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### 总结

在 Django REST Framework 中，权限管理是确保 API 安全性的重要组成部分。DRF 提供了多种内置权限类，并支持自定义权限类，以满足不同的安全需求。通过合理配置权限，可以有效控制用户对视图和对象的访问权限，保护数据安全。