在 Django 中，表单处理是 Web 开发的一个重要组成部分。Django 提供了一个强大的表单框架来简化表单的创建、验证和处理。通过 Django 表单框架，你可以轻松地生成 HTML 表单、验证用户输入并处理提交的数据。

### 创建表单

#### 创建一个简单的表单类

表单类继承自 `django.forms.Form`，可以包含各种字段（例如文本字段、电子邮件字段、日期字段等）。每个字段都可以有验证规则。

```python
# forms.py

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    email = forms.EmailField(label='Your email')
    message = forms.CharField(widget=forms.Textarea, label='Your message')
```

### 使用表单

#### 在视图中使用表单

在视图中，我们可以实例化表单对象，处理表单提交并进行验证。

```python
# views.py

from django.shortcuts import render
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # 处理表单数据
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            # 可以在这里处理表单数据，例如保存到数据库或发送电子邮件
            return render(request, 'thanks.html', {'name': name})
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})
```

#### 在模板中渲染表单

Django 提供了一些模板标签和过滤器，可以方便地渲染表单。

```html
<!-- contact.html -->

<!DOCTYPE html>
<html>
<head>
    <title>Contact Us</title>
</head>
<body>
    <h1>Contact Us</h1>
    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Submit</button>
    </form>
</body>
</html>
```

### 表单验证

Django 表单框架自动处理大多数的验证逻辑。例如，`EmailField` 会自动验证输入的内容是否为有效的电子邮件地址。

你也可以定义自定义验证逻辑：

```python
# forms.py

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    email = forms.EmailField(label='Your email')
    message = forms.CharField(widget=forms.Textarea, label='Your message')

    def clean_name(self):
        name = self.cleaned_data['name']
        if "spam" in name:
            raise forms.ValidationError("Invalid name - contains forbidden word")
        return name
```

### 模型表单

Django 还提供了 `ModelForm` 类，可以根据模型自动生成表单。这样可以避免重复定义模型和表单字段。

#### 创建模型表单

假设我们有一个 `Contact` 模型：

```python
# models.py

from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name
```

我们可以创建一个模型表单来自动生成表单字段：

```python
# forms.py

from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']
```

#### 在视图中使用模型表单

```python
# views.py

from django.shortcuts import render
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()  # 将表单数据保存到数据库
            return render(request, 'thanks.html', {'name': form.cleaned_data['name']})
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})
```

### 自定义表单小部件

你可以自定义表单小部件，以改变字段的显示方式。例如，改变输入框的 CSS 类：

```python
# forms.py

from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'message': forms.Textarea(attrs={'class': 'form-control'}),
        }
```

### 处理文件上传

处理文件上传需要在表单中使用 `FileField` 或 `ImageField`，并在视图中处理文件数据。

#### 创建文件上传表单

```python
# forms.py

from django import forms

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
```

#### 在视图中处理文件上传

```python
# views.py

from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import UploadFileForm

def upload_file_view(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES['file'])
            return HttpResponseRedirect('/success/url/')
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})

def handle_uploaded_file(f):
    with open('some/file/name.txt', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
```

#### 在模板中渲染文件上传表单

```html
<!-- upload.html -->

<!DOCTYPE html>
<html>
<head>
    <title>Upload File</title>
</head>
<body>
    <h1>Upload File</h1>
    <form method="post" enctype="multipart/form-data">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Upload</button>
    </form>
</body>
</html>
```

### 总结

Django 的表单框架提供了强大且灵活的工具来处理表单，包括创建、验证和处理表单数据。通过使用 Django 表单，可以减少重复代码，并且更容易地管理和处理用户输入的数据。