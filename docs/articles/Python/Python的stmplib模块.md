---
comments: true
---

`smtplib` 模块是 Python 标准库中用于发送邮件的模块，它提供了一个简单而强大的接口，可以用来构建和发送邮件消息。使用 `smtplib` 模块需要连接到 SMTP 服务器，并通过 SMTP 协议来发送邮件。

### 1. 基本用法示例

以下是使用 `smtplib` 模块发送邮件的基本步骤和示例代码：

#### 1.1 导入模块

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
```

#### 1.2 设置邮件内容

```python
# 邮件内容设置
sender_email = "your_email@example.com"
receiver_email = "recipient_email@example.com"
subject = "Test Email from Python"
body = "This is a test email sent from Python using smtplib."
```

#### 1.3 创建邮件消息

```python
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject
```

#### 1.4 添加邮件正文

```python
msg.attach(MIMEText(body, 'plain'))
```

#### 1.5 连接到 SMTP 服务器并发送邮件

```python
# 连接到 SMTP 服务器
smtp_server = 'smtp.example.com'
smtp_port = 587  # 使用 TLS 加密的 SMTP 端口号
smtp_user = 'your_username'
smtp_password = 'your_password'

with smtplib.SMTP(smtp_server, smtp_port) as server:
    # 使用 TLS 加密通信
    server.starttls()
    
    # 登录到 SMTP 服务器
    server.login(smtp_user, smtp_password)
    
    # 发送邮件
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
    
    print("邮件发送成功！")
```

### 2. 说明

- **MIME 类型**: `MIMEText` 用于创建纯文本或 HTML 格式的邮件内容，`MIMEMultipart` 用于创建多部分邮件消息，可以包含附件。
- **附件**: 如果需要发送附件，可以使用 `MIMEBase` 类和 `encoders` 模块来添加和编码附件。
- **SMTP 设置**: 需要根据你的邮件提供商设置正确的 SMTP 服务器地址、端口号和登录信息。示例中使用了 `starttls()` 方法启用 TLS 加密通信。
- **邮件发送**: 使用 `server.sendmail()` 方法发送邮件，指定发件人、收件人和邮件内容。

### 3. 示例

以下是一个完整的示例，展示了如何使用 `smtplib` 模块发送一封带有附件的邮件：

```python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# 邮件内容设置
sender_email = "your_email@example.com"
receiver_email = "recipient_email@example.com"
subject = "Email with Attachment from Python"
body = "This is an email with attachment sent from Python using smtplib."

# 创建邮件消息
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject

# 添加邮件正文
msg.attach(MIMEText(body, 'plain'))

# 添加附件
filename = "example_attachment.txt"
attachment = open(filename, "rb")

part = MIMEBase('application', 'octet-stream')
part.set_payload(attachment.read())
encoders.encode_base64(part)
part.add_header('Content-Disposition', f'attachment; filename= {filename}')
msg.attach(part)

# 连接到 SMTP 服务器并发送邮件
smtp_server = 'smtp.example.com'
smtp_port = 587  # 使用 TLS 加密的 SMTP 端口号
smtp_user = 'your_username'
smtp_password = 'your_password'

with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls()
    server.login(smtp_user, smtp_password)
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
    print("邮件发送成功！")
```

### 4. 总结

使用 `smtplib` 模块可以方便地在 Python 中发送邮件，可以设置邮件的内容、附件以及连接到 SMTP 服务器进行发送。通过掌握 `smtplib` 的基本用法，可以实现邮件通知、自动化邮件发送等功能，非常适用于开发中需要邮件通信的场景。