Django ORM 提供了丰富的模型字段类型，允许开发者精确地定义数据库表的结构。以下是所有主要的 Django ORM 模型字段及其用途：

### 基本字段类型

1. **AutoField**
   
    自动递增的整数，通常用作主键。

    ```python
    id = models.AutoField(primary_key=True)
    ```

2. **BigAutoField**
   
    自动递增的大整数。

    ```python
    id = models.BigAutoField(primary_key=True)
    ```

3. **BigIntegerField**
   
    大整数字段。

    ```python
    big_number = models.BigIntegerField()
    ```

4. **BinaryField**

    二进制数据字段。

    ```python
    data = models.BinaryField()
    ```

5. **BooleanField**

    布尔值字段。

    ```python
    is_active = models.BooleanField(default=True)
    ```

6. **CharField**

    字符串字段，需要指定最大长度。
    
    ```python
    name = models.CharField(max_length=100)
    ```

7. **DateField**

    日期字段。
    
    ```python
    birth_date = models.DateField()
    ```

8.  **DateTimeField**

    日期和时间字段。
    
    ```python
    created_at = models.DateTimeField(auto_now_add=True)
    ```

9.  **DecimalField**

    十进制浮点数字段，需指定最大位数和小数点位数。
    
    ```python
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ```

10. **DurationField**

    时间跨度字段。
    
    ```python
    duration = models.DurationField()
    ```

11. **EmailField**

    电子邮件地址字段。
    
    ```python
    email = models.EmailField()
    ```

12. **FileField**

    文件上传字段。
    
    ```python
    file = models.FileField(upload_to='uploads/')
    ```

13. **FloatField**

    浮点数字段。
    
     ```python
     rating = models.FloatField()
     ```

14. **ImageField**

    图片上传字段，继承自 `FileField`。
    
    ```python
    image = models.ImageField(upload_to='images/')
    ```

15. **IntegerField**

    整数字段。
    
    ```python
    age = models.IntegerField()
    ```

16. **GenericIPAddressField**

    通用 IP 地址字段，可以是 IPv4 或 IPv6。
    
    ```python
    ip_address = models.GenericIPAddressField(protocol='both', unpack_ipv4=False)
    ```

17. **NullBooleanField**

    可以为空的布尔值字段（已弃用，使用 `BooleanField` 和 `NullBooleanField`）。
    
    ```python
    is_verified = models.NullBooleanField()
    ```

18. **PositiveIntegerField**

    正整数字段。
    
    ```python
    positive_number = models.PositiveIntegerField()
    ```

19. **PositiveSmallIntegerField**

    正小整数字段。
    
    ```python
    positive_small_number = models.PositiveSmallIntegerField()
    ```

20. **SlugField**

    用于保存短标签，通常用于 URL。
    
    ```python
    slug = models.SlugField()
    ```

21. **SmallIntegerField**

    小整数字段。
    
    ```python
    small_number = models.SmallIntegerField()
    ```

22. **TextField**

    大文本字段。
    
    ```python
    description = models.TextField()
    ```

23. **TimeField**

    时间字段。
    
    ```python
    start_time = models.TimeField()
    ```

24. **URLField**

    URL 字段。
    
    ```python
    website = models.URLField()
    ```

25. **UUIDField**

    UUID 字段，用于存储全局唯一标识符。
    
    ```python
    uuid = models.UUIDField()
    ```

### 关系字段类型

1. **ForeignKey**

    外键字段，用于定义多对一的关系。
    
    ```python
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    ```

2. **ManyToManyField**

    多对多关系字段。
    
    ```python
    categories = models.ManyToManyField(Category, related_name='posts')
    ```

3. **OneToOneField**

    一对一关系字段。
    
    ```python
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='user')
    ```

### 通用参数

这些参数适用于大多数字段类型：

- `null`: 如果为 `True`，Django 将在数据库中存储 `NULL` 值，而不是空字符串。
- `blank`: 如果为 `True`，该字段允许为空。
- `choices`: 一个包含二元组的可迭代对象，用于选择字段的可选值。
- `default`: 用于设置字段的默认值。
- `primary_key`: 如果为 `True`，该字段将作为模型的主键。
- `unique`: 如果为 `True`，该字段的值必须唯一。
- `verbose_name`: 用于设置字段的可读名称。
- `help_text`: 用于设置字段的帮助文本。

### 示例综合模型

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField()

class Category(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('checked_out', 'Checked Out'),
    ]

    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rating = models.FloatField(default=0)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
```

### 总结

Django 提供了多种字段类型来满足不同的数据存储需求。了解和使用这些字段类型，可以帮助你精确地定义数据库表的结构，并充分利用 Django ORM 提供的功能来简化数据库操作。