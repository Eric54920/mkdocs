---
comments: true
---

在 Django 中，模型（Model）是用于定义应用程序数据的结构和行为的核心组件。模型类通常映射到数据库中的表，每个模型类的实例对应数据库表中的一行。通过定义模型，Django 自动为你生成数据库查询 API，使你能够轻松地创建、读取、更新和删除数据库中的数据。下面是有关 Django 模型的详细介绍，包括定义模型、字段类型、模型方法、模型管理器以及如何使用模型进行数据库操作。

### 1. 定义模型

在 Django 中，模型是 `django.db.models.Model` 的子类。每个模型类代表一个数据库表，每个类属性（字段）代表表中的一列。

#### 示例：定义模型

```python
# models.py

from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class Book(models.Model):
    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

### 2. 字段类型

Django 提供了多种字段类型，用于定义数据库列的属性。常见的字段类型包括：

- `CharField`：用于存储字符串，需要指定 `max_length`。
- `IntegerField`：用于存储整数。
- `DateField`：用于存储日期。
- `DateTimeField`：用于存储日期和时间。
- `ForeignKey`：用于定义多对一的关系。
- `ManyToManyField`：用于定义多对多的关系。
- `BooleanField`：用于存储布尔值。

#### 示例：更多字段类型

```python
# models.py

class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    email = models.EmailField()

class Book(models.Model):
    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    num_pages = models.IntegerField()
    in_stock = models.BooleanField(default=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

### 3. 创建和应用迁移

定义好模型后，需要创建并应用数据库迁移来同步数据库结构。

#### 创建迁移

```bash
python manage.py makemigrations
```

#### 应用迁移

```bash
python manage.py migrate
```

### 4. 模型实例的增删改查

#### 创建实例

```python
# views.py or Django shell

from myapp.models import Author, Book
from datetime import date

# 创建单个记录
author = Author.objects.create(name='John Doe', birth_date='1980-01-01', email='john@example.com')
book = Book.objects.create(title='Django for Beginners', publication_date=date.today(), num_pages=300, author=author)

# 批量创建多个记录
author = Author.objects.create(name='莫言', birth_date='1978-01-01', email='moyan@example.com')
books = Book.objects.bulk_create([
    Book(title="蛙", publication_date=date.today(), num_pages=200, author=author), 
    Book(title="檀香刑", publication_date=date.today(), num_pages=500, author=author)])

# save 创建单个记录
book = Book(title="生死疲劳", publication_date=date.today(), num_pages=200, author=author)
book.save()
```

#### 读取实例

```python
# views.py or Django shell

# 读取多个记录
authors = Author.objects.all()

# 读取单个记录
author = Author.objects.get(id=1)

# 过滤记录
books = Book.objects.filter(author=author)
for book in books:
    print(book.title)

# 以字典展示
books = Book.objects.values()
books = Book.objects.values('title', 'publication_date')
for book in books:
    print(book['title'])

# 以元祖展示
books = Book.objects.values_list()
books = Book.objects.values_list('title', 'publication_date')
for book in books:
    print(book[0])
```

#### 更新实例

```python
# views.py or Django shell

# 单个更新
author = Author.objects.get(id=1)
author.name = 'Jane Doe'
author.save()

# 批量更新
Author.objects.filter(id__lt=4).update({"name": 'Jane Doe'})
```

#### 删除实例

```python
# views.py or Django shell

# 单个删除
author = Author.objects.get(id=1)
author.delete()

# 批量删除
Author.objects.filter(id__lt=4).delete()
```

### 5. 模型方法

可以在模型中定义方法，以提供额外的行为。例如，定义一个方法来获取作者的所有书籍。

#### 示例：定义模型方法

```python
# models.py

class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    email = models.EmailField()

    def get_books(self):
        return self.book_set.all()

class Book(models.Model):
    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    num_pages = models.IntegerField()
    in_stock = models.BooleanField(default=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

#### 使用模型方法

```python
# views.py or Django shell

author = Author.objects.get(id=1)
books = author.get_books()
for book in books:
    print(book.title)
```

### 6. 模型管理器

模型管理器是用于与数据库交互的接口。Django 默认的管理器是 `objects`，可以自定义管理器来添加额外的查询方法。

#### 示例：自定义模型管理器

```python
# models.py

class BookManager(models.Manager):
    def in_stock(self):
        return self.filter(in_stock=True)

class Book(models.Model):
    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    num_pages = models.IntegerField()
    in_stock = models.BooleanField(default=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    objects = BookManager()
```

#### 使用自定义管理器

```python
# views.py or Django shell

in_stock_books = Book.objects.in_stock()
for book in in_stock_books:
    print(book.title)
```

### 7. 关联关系

#### 7.1 外键关系

在定义模型时，使用 `ForeignKey` 来定义外键关系。例如，一个 `Book` 关联一个 `Author`。

**查询操作**

- 正向查询

通过外键字段从 `Book` 查询相关的 `Author`。

```python
# 获取一本书的作者
book = Book.objects.get(title='Django for Beginners')
author = book.author
print(author.name)  # 输出: John Doe
```

- 反向查询

通过 related_name 从 `Author` 查询所有相关的 `Book`。

```python
# 获取一个作者写的所有书
author = Author.objects.get(name='John Doe')
books = author.books.all()
for book in books:
    print(book.title)
```

**复杂查询**

- 使用 `select_related`

`select_related` 用于执行 SQL 连接并提前加载相关对象，以减少数据库查询次数。

```python
# 获取书籍及其作者，使用 select_related 优化查询
books = Book.objects.select_related('author').all()
for book in books:
    print(book.title, book.author.name)
```

- 使用 `prefetch_related`

`prefetch_related` 用于执行单独的查询，并在 Python 中进行联接，适用于多对多关系或反向外键关系。

```python
# 获取作者及其书籍，使用 prefetch_related 优化查询
authors = Author.objects.prefetch_related('books').all()
for author in authors:
    print(author.name)
    for book in author.books.all():
        print(f'  - {book.title}')
```

**更新和删除操作**

- 更新对象

```python
# 更新一本书的作者
book = Book.objects.get(title='Django for Beginners')
new_author = Author.objects.create(name='Jane Smith', birth_date='1975-05-23')
book.author = new_author
book.save()
```

- 级联删除

当删除一个 `Author` 对象时，所有关联的 `Book` 对象也会被删除（因为 `on_delete=models.CASCADE`）。

```python
# 删除一个作者及其所有书籍
author = Author.objects.get(name='John Doe')
author.delete()
```


#### 7.2 一对一关系

使用 `OneToOneField` 来定义一对一关系。假设我们有两个模型：`Profile` 和 `User`，每个用户有且只有一个个人资料。

```python
# models.py

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username
```

**创建和保存对象**

- 创建 `User` 和 `Profile` 对象，并添加关系

```python
# 创建用户对象
user = User.objects.create(username='john_doe', password='password')

# 创建个人资料对象，并关联到用户
profile = Profile.objects.create(user=user, bio='Hello, I am John Doe!', birth_date='1990-01-01')
```

**查询一对一关系**

- 正向查询

通过 `Profile` 查询关联的 `User` 对象。

```python
# 获取个人资料的用户
profile = Profile.objects.get(user__username='john_doe')
user = profile.user
print(user.username)  # 输出: john_doe
```

- 反向查询

通过 `User` 查询关联的 `Profile` 对象。

```python
# 获取用户的个人资料
user = User.objects.get(username='john_doe')
profile = user.profile
print(profile.bio)  # 输出: Hello, I am John Doe!
```

**更新一对一关系**

- 更新对象

```python
# 更新个人资料
profile = Profile.objects.get(user__username='john_doe')
profile.bio = 'Updated bio for John Doe'
profile.save()

# 或者通过用户更新个人资料
user = User.objects.get(username='john_doe')
user.profile.bio = 'Another updated bio for John Doe'
user.profile.save()
```

**删除一对一关系**

由于 `on_delete=models.CASCADE`，删除 `User` 对象时，关联的 `Profile` 对象也会被删除。

```python
# 删除用户及其关联的个人资料
user = User.objects.get(username='john_doe')
user.delete()
```

#### 7.3 多对多关系

使用 `ManyToManyField` 定义多对多关系。假设我们有两个模型：`Book` 和 `Author`，并且一个书籍可以由多位作者共同编写，一个作者可以编写多本书。

```python
# models.py

from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    authors = models.ManyToManyField(Author, related_name='books')

    def __str__(self):
        return self.title
```

**创建和保存对象**

- 创建 `Author` 和 `Book` 对象，并添加关系

```python
# 创建作者对象
author1 = Author.objects.create(name='Author One')
author2 = Author.objects.create(name='Author Two')

# 创建书籍对象
book1 = Book.objects.create(title='Book One')
book2 = Book.objects.create(title='Book Two')

# 添加作者到书籍
book1.authors.add(author1, author2)
book2.authors.add(author1)
```

**查询多对多关系**

- 正向查询

通过 `Book` 查询关联的 `Author` 对象。

```python
# 获取一本书的所有作者
book = Book.objects.get(title='Book One')
authors = book.authors.all()
for author in authors:
    print(author.name)
```

- 反向查询

通过 `Author` 查询关联的 `Book` 对象。

```python
# 获取一个作者编写的所有书籍
author = Author.objects.get(name='Author One')
books = author.books.all()
for book in books:
    print(book.title)
```

**修改多对多关系**

- 添加关系

可以使用 `add` 方法为多对多关系添加关联对象。

```python
# 添加一个新作者到现有书籍
new_author = Author.objects.create(name='New Author')
book1.authors.add(new_author)
```

- 移除关系

可以使用 `remove` 方法移除多对多关系中的关联对象。

```python
# 从书籍中移除一个作者
book1.authors.remove(author2)
```

- 清除关系

可以使用 `clear` 方法清除多对多关系中的所有关联对象。

```python
# 清除一本书的所有作者
book1.authors.clear()
```

**使用 `through` 参数自定义多对多关系**

有时我们需要在多对多关系中存储额外的信息，此时可以使用 `through` 参数自定义中间模型。

```python
# models.py

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    authors = models.ManyToManyField(Author, through='Authorship')

    def __str__(self):
        return self.title

class Authorship(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    contribution = models.CharField(max_length=100)  # 额外的信息，例如作者的贡献

    def __str__(self):
        return f"{self.author.name} - {self.book.title} ({self.contribution})"
```

- 创建带有自定义中间模型的多对多关系

```python
# 创建作者和书籍对象
author1 = Author.objects.create(name='Author One')
book1 = Book.objects.create(title='Book One')

# 创建中间模型对象
Authorship.objects.create(author=author1, book=book1, contribution='Lead Author')
```

- 查询带有自定义中间模型的多对多关系

```python
# 获取一本书的所有作者及其贡献
book = Book.objects.get(title='Book One')
authorships = Authorship.objects.filter(book=book)
for authorship in authorships:
    print(authorship.author.name, authorship.contribution)
```

### 8. 查询集（QuerySet）

查询集是 Django ORM 的核心概念，用于表示从数据库中获取的对象集合。查询集是惰性评估的，只有在被实际使用时才会执行查询。

#### 基本查询

```python
# 获取所有记录
authors = Author.objects.all()

# 过滤记录
young_authors = Author.objects.filter(birth_date__gt='1990-01-01')

# 排序记录
authors = Author.objects.order_by('name')

# 切片和限制
authors = Author.objects.all()[:10]  # 获取前 10 条记录
```

#### 复杂查询

```python
# 排除记录
non_doe_authors = Author.objects.exclude(name='John Doe')

# 链式查询
recent_books = Book.objects.filter(publication_date__year=2023).order_by('-publication_date')
```

#### F 对象

`F` 对象用于在查询中引用模型字段本身。它允许你在不获取数据到 Python 层的情况下，在数据库级别进行字段之间的比较和操作。

```python
from django.db.models import F
from myapp.models import Book

# 使用 `F` 对象进行字段间比较
books = Book.objects.filter(price__gt=F('discount_price'))

# 使用 `F` 对象进行字段更新
Book.objects.update(price=F('price') + 10)
```

#### Q 对象

`Q` 对象用于在查询中构建复杂的查询条件，允许你在一个查询中使用逻辑操作符（AND、OR、NOT）。它们使得构建复杂的查询变得更加容易。

```python
from django.db.models import Q
from myapp.models import Book

# 使用 `Q` 对象进行 OR 查询
books = Book.objects.filter(Q(price__gt=100) | Q(stock__lt=50))

# 使用 `Q` 对象进行 AND 查询
books = Book.objects.filter(Q(price__gt=100) & Q(stock__lt=50))

# 使用 `Q` 对象进行 NOT 查询
books = Book.objects.filter(~Q(price__gt=100))
```

#### 连接查询

通过外键或多对多关系，可以轻松执行联接查询。

```python
# 获取某个作者的所有书籍
author = Author.objects.get(id=1)
books = author.book_set.all()

# 反向查询：获取某本书的作者
book = Book.objects.get(id=1)
author = book.author
```

### 9. 聚合和分组

Django ORM 提供了聚合函数（如 `Count`、`Sum`、`Avg`、`Max`、`Min`、`StdDev`、`Variance` 等）来对查询集进行聚合计算。

```python
from django.db.models import Count, Avg

# 聚合计算
author_count = Author.objects.count()
average_age = Author.objects.aggregate(Avg('age'))

# 分组
authors = Author.objects.annotate(book_count=Count('book'))
for author in authors:
    print(f'{author.name} has written {author.book_count} books')
```

### 10. 原生 SQL 查询

虽然 Django ORM 已经非常强大，但有时你可能需要执行原生 SQL 查询。

```python
from django.db import connection

def my_custom_sql(query):
    with connection.cursor() as cursor:
        cursor.execute(query)
        return cursor.fetchall()

results = my_custom_sql("SELECT * FROM myapp_author")
```

### 11. 高级功能

#### 信号

信号允许你在模型的生命周期中挂钩自定义行为。例如，在保存 `Author` 实例之前执行某些操作。

```python
# models.py

from django.db.models.signals import pre_save
from django.dispatch import receiver

@receiver(pre_save, sender=Author)
def pre_save_author(sender, instance, **kwargs):
    instance.name = instance.name.upper()
```

#### 事务

Django 提供了事务支持，允许你将多个数据库操作包装在一个原子操作中。

```python
from django.db import transaction

with transaction.atomic():
    author = Author.objects.create(name='John Doe', birth_date='1980-01-01')
    Book.objects.create(title='New Book', publication_date='2023-06-23', author=author)
```

### 总结

Django 模型是定义和操作数据库结构的核心组件。通过定义模型类，可以轻松地创建、读取、更新和删除数据库中的数据。Django 提供了丰富的字段类型、模型方法和管理器，使数据操作更加便捷和灵活。了解和掌握这些功能，有助于开发高效、可维护的 Django 应用。