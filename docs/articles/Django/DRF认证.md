---
comments: true
---

Django REST Framework (DRF) 提供了多种认证方式，用于确保只有经过授权的用户才能访问 API 端点。认证是确定请求的用户身份的过程。DRF 内置了几种常见的认证类，同时也支持自定义认证。以下是 DRF 中主要的认证方法及其用法。

### 内置认证类

**BasicAuthentication**
   
   - 基于 HTTP 基本认证，通过传递用户名和密码进行身份验证。
   - 适用于开发和测试环境，不推荐在生产环境中使用，除非通过 HTTPS 保护。

**SessionAuthentication**

   - 使用 Django 的会话框架进行身份验证。
   - 适用于需要在 DRF 中使用标准 Django 认证的情况，通常用于与 Django 视图混合使用。

**TokenAuthentication**

   - 通过令牌进行身份验证。客户端需要在请求头中包含 `Authorization: Token <token>`。
   - 常用于无状态的认证方式，特别适合移动应用和单页应用（SPA）。

**RemoteUserAuthentication**

   - 支持使用 Web 服务器提供的远程用户身份进行身份验证。

**CustomAuthentication**

   - 可以自定义认证类来满足特定需求。

### 使用 Token 认证

Token 认证是 DRF 中常用的一种无状态认证方法。以下是如何使用 Token 认证的详细步骤。

#### 安装和设置

首先，确保你已经安装了 `djangorestframework` 和 `djangorestframework.authtoken` 包：

```bash
pip install djangorestframework djangorestframework.authtoken
```

在 `settings.py` 文件中添加 `rest_framework` 和 `rest_framework.authtoken` 到 `INSTALLED_APPS`：

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework.authtoken',
]
```

配置 REST framework 的认证类：

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

#### 创建和管理令牌

创建一个用于生成和管理用户令牌的视图。DRF 提供了一个内置的视图 `obtain_auth_token`，可以直接使用。

在 `urls.py` 中配置路由：

```python
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    ...
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
```

用户可以通过发送用户名和密码到 `api-token-auth/` 端点来获取认证令牌：

```bash
curl -X POST -d "username=<your_username>&password=<your_password>" http://<your_domain>/api-token-auth/
```

成功请求后，服务器将返回一个令牌：

```json
{
    "token": "a1b2c3d4e5f6g7h8i9j0"
}
```

#### 保护 API 端点

在需要保护的视图中，确保视图类继承自 DRF 的 `APIView` 或使用 DRF 的权限装饰器。以下是一个示例视图，只有经过身份验证的用户才能访问：

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {'message': 'This is a protected view'}
        return Response(content)
```

### 自定义认证类

如果内置的认证类不能满足需求，可以自定义认证类。以下是一个简单的自定义认证类示例：

```python
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        username = request.META.get('HTTP_X_USERNAME')
        if not username:
            return None
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise AuthenticationFailed('No such user')

        return (user, None)
```

在 `settings.py` 中配置自定义认证类：

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'path.to.CustomAuthentication',
    ],
}
```

### 使用 JSON Web Tokens (JWT)

JWT 是一种更为安全和灵活的认证方式，适合分布式系统和跨平台应用。通常使用第三方库如 `djangorestframework-simplejwt` 来实现。

#### 安装和设置

```bash
pip install djangorestframework-simplejwt
```

在 `settings.py` 中配置 JWT 认证：

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

配置 JWT 的 URL 路由：

```python
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

用户可以通过发送用户名和密码到 `api/token/` 端点来获取 JWT：

```bash
curl -X POST -d "username=<your_username>&password=<your_password>" http://<your_domain>/api/token/
```

成功请求后，服务器将返回一个访问令牌和刷新令牌：

```json
{
    "refresh": "your_refresh_token",
    "access": "your_access_token"
}
```

使用获得的 JWT 访问受保护的 API：

```bash
curl -H "Authorization: Bearer your_access_token" http://<your_domain>/protected-api/
```

### 总结

Django REST Framework 提供了多种强大且灵活的认证机制，包括基本认证、会话认证、令牌认证和 JWT 认证。通过配置适当的认证类和权限类，可以有效地保护 API 端点，确保只有经过授权的用户才能访问。这不仅提高了 API 的安全性，还为开发者提供了灵活的认证方案来满足不同的应用场景。