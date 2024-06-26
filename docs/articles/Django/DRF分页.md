在 Django REST Framework (DRF) 中，分页是用于将大量数据分割成多个较小的部分，以便于客户端逐步获取数据，减轻服务器压力。DRF 提供了多种分页方案，并允许开发者自定义分页逻辑。以下是详细介绍 DRF 分页的内容：

### 内置分页类

DRF 提供了几种内置的分页类，位于 `rest_framework.pagination` 模块中：

1. **PageNumberPagination**：基于页码的分页。
2. **LimitOffsetPagination**：基于限制和偏移量的分页。
3. **CursorPagination**：基于游标的分页，适用于时间敏感的数据流。

### 配置分页

首先，需要在 DRF 的配置文件中配置默认的分页类和相关参数：

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10  # 每页显示10条记录
}
```

### 使用内置分页类

#### PageNumberPagination

基于页码的分页。默认情况下，DRF 使用 `page` 参数指定页码，`page_size` 参数指定每页的大小（如果启用的话）。

```python
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MyModel
from .serializers import MyModelSerializer

class MyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class MyModelList(APIView):
    pagination_class = MyPagination

    def get(self, request, format=None):
        queryset = MyModel.objects.all()
        paginator = MyPagination()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = MyModelSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = MyModelSerializer(queryset, many=True)
        return Response(serializer.data)
```

#### LimitOffsetPagination

基于限制和偏移量的分页。`limit` 参数指定返回记录的数量，`offset` 参数指定从哪条记录开始返回。

```python
from rest_framework.pagination import LimitOffsetPagination

class MyPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class MyModelList(APIView):
    pagination_class = MyPagination

    def get(self, request, format=None):
        queryset = MyModel.objects.all()
        paginator = MyPagination()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = MyModelSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = MyModelSerializer(queryset, many=True)
        return Response(serializer.data)
```

#### CursorPagination

基于游标的分页，适用于时间敏感的数据流。`cursor` 参数用于标识数据的位置。

```python
from rest_framework.pagination import CursorPagination

class MyPagination(CursorPagination):
    page_size = 10
    ordering = 'created'  # 依据某个字段排序，通常是时间字段

class MyModelList(APIView):
    pagination_class = MyPagination

    def get(self, request, format=None):
        queryset = MyModel.objects.all()
        paginator = MyPagination()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = MyModelSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = MyModelSerializer(queryset, many=True)
        return Response(serializer.data)
```

### 在视图集中使用分页

分页类通常与视图集一起使用，在视图集中配置分页类和分页参数即可。

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from .models import MyModel
from .serializers import MyModelSerializer

class MyPagination(PageNumberPagination):
    page_size = 10

class MyModelViewSet(ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer
    pagination_class = MyPagination
```

### 自定义分页类

如果内置分页类不能满足需求，可以创建自定义分页类。自定义分页类需要继承 `BasePagination` 并实现 `paginate_queryset` 和 `get_paginated_response` 方法。

#### 示例：自定义分页类

```python
from rest_framework.pagination import BasePagination
from rest_framework.response import Response

class MyCustomPagination(BasePagination):
    def paginate_queryset(self, queryset, request, view=None):
        # 自定义分页逻辑
        page_size = 10
        page_number = int(request.query_params.get('page', 1))
        start = (page_number - 1) * page_size
        end = page_number * page_size
        return queryset[start:end]

    def get_paginated_response(self, data):
        return Response({
            'count': len(data),
            'results': data
        })

class MyModelList(APIView):
    pagination_class = MyCustomPagination

    def get(self, request, format=None):
        queryset = MyModel.objects.all()
        paginator = MyCustomPagination()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = MyModelSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = MyModelSerializer(queryset, many=True)
        return Response(serializer.data)
```

### 总结

在 Django REST Framework 中，分页是处理大量数据时的重要工具。通过使用内置分页类（如 `PageNumberPagination`、`LimitOffsetPagination` 和 `CursorPagination`）或者自定义分页类，可以灵活地实现分页功能，提升 API 的性能和用户体验。希望这些示例和配置方法能够帮助你在项目中更好地实现分页功能。