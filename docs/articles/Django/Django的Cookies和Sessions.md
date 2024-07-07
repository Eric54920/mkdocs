---
comments: true
---

在 Django 中，Cookies 和 Sessions 是用来在客户端和服务器之间存储和传递数据的重要机制。它们为保持用户状态和跨请求传递数据提供了强大的支持。

### Cookies

#### 什么是 Cookie?

Cookies 是存储在客户端浏览器中的小数据片段，它们用于在不同请求之间保持状态。Django 提供了方便的方式来设置、获取和删除 Cookies。

#### 设置 Cookies

可以使用 `HttpResponse` 对象的 `set_cookie` 方法来设置 Cookies。

```python
from django.http import HttpResponse

def set_cookie_view(request):
    response = HttpResponse("Setting a cookie")
    response.set_cookie('my_cookie', 'cookie_value', max_age=3600)
    return response
```

#### 获取 Cookies

可以通过 `request.COOKIES` 来获取 Cookies。

```python
from django.http import HttpResponse

def get_cookie_view(request):
    cookie_value = request.COOKIES.get('my_cookie', 'Cookie not found')
    return HttpResponse(f"The value of my_cookie is {cookie_value}")
```

#### 删除 Cookies

可以通过 `HttpResponse` 对象的 `delete_cookie` 方法来删除 Cookies。

```python
from django.http import HttpResponse

def delete_cookie_view(request):
    response = HttpResponse("Deleting a cookie")
    response.delete_cookie('my_cookie')
    return response
```

### Sessions

#### 什么是 Session?

Sessions 是一种在服务器端存储数据的机制，通常结合 Cookies 来跟踪用户的会话。Sessions 数据存储在服务器上，客户端只存储一个 session ID 的 Cookie。

#### 设置 Session 数据

可以通过 `request.session` 设置 Session 数据。

```python
from django.http import HttpResponse

def set_session_view(request):
    request.session['my_key'] = 'my_value'
    return HttpResponse("Session data set")
```

#### 获取 Session 数据

可以通过 `request.session` 获取 Session 数据。

```python
from django.http import HttpResponse

def get_session_view(request):
    session_value = request.session.get('my_key', 'Session data not found')
    return HttpResponse(f"The value of my_key in session is {session_value}")
```

#### 删除 Session 数据

可以通过 `request.session` 删除单个键或清除整个 Session。

```python
from django.http import HttpResponse

def delete_session_view(request):
    try:
        del request.session['my_key']
    except KeyError:
        pass
    return HttpResponse("Session key deleted")

def clear_session_view(request):
    request.session.flush()
    return HttpResponse("Session data cleared")
```

### 配置 Session 引擎

Django 支持多种 Session 引擎，可以在 `settings.py` 中配置：

```python
# settings.py

# 使用数据库存储 Session 数据（默认）
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# 使用缓存存储 Session 数据
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

# 使用文件存储 Session 数据
SESSION_ENGINE = 'django.contrib.sessions.backends.file'

# 使用基于 Cookie 的 Session 数据存储（不推荐存储敏感数据）
SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'
```

### 会话超时和过期

可以在 `settings.py` 中配置会话超时和过期时间。

```python
# settings.py

# Session 过期时间（秒）
SESSION_COOKIE_AGE = 1209600  # 2 周

# 是否在浏览器关闭时删除 Session
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# 是否只允许 HTTPS 传输 Session
SESSION_COOKIE_SECURE = True

# 使用 HTTPOnly 标志来防止 JavaScript 访问 Session
SESSION_COOKIE_HTTPONLY = True
```

### 示例代码

以下示例展示了如何设置、获取和删除 Cookies 和 Session 数据。

```python
# views.py

from django.http import HttpResponse
from django.shortcuts import render

def set_cookie_view(request):
    response = HttpResponse("Setting a cookie")
    response.set_cookie('my_cookie', 'cookie_value', max_age=3600)
    return response

def get_cookie_view(request):
    cookie_value = request.COOKIES.get('my_cookie', 'Cookie not found')
    return HttpResponse(f"The value of my_cookie is {cookie_value}")

def delete_cookie_view(request):
    response = HttpResponse("Deleting a cookie")
    response.delete_cookie('my_cookie')
    return response

def set_session_view(request):
    request.session['my_key'] = 'my_value'
    return HttpResponse("Session data set")

def get_session_view(request):
    session_value = request.session.get('my_key', 'Session data not found')
    return HttpResponse(f"The value of my_key in session is {session_value}")

def delete_session_view(request):
    try:
        del request.session['my_key']
    except KeyError:
        pass
    return HttpResponse("Session key deleted")

def clear_session_view(request):
    request.session.flush()
    return HttpResponse("Session data cleared")
```

### 总结

Django 提供了简洁而强大的方式来处理 Cookies 和 Sessions。Cookies 主要用于客户端存储少量数据，而 Sessions 则用于服务器端存储更多的用户会话数据。通过配置 Django 的 Session 引擎和相关设置，可以满足不同的应用需求，同时确保数据的安全性和隐私性。