---
comments: true
---

FastAPI 提供了强大的后台任务功能，允许你在处理请求后执行一些任务，而无需阻塞响应。这对于处理需要较长时间运行的任务或必须在请求完成后执行的任务（如发送电子邮件、执行数据库更新等）非常有用。

### 1. 背景

FastAPI 使用 Starlette 的后台任务机制来实现这一功能。后台任务是在响应返回给客户端后执行的，这样可以使请求处理更快，同时后台任务可以在后台无缝运行。

### 2. 使用 `BackgroundTasks`

FastAPI 提供了 `BackgroundTasks` 类，用于定义和运行后台任务。以下是详细的步骤和示例：

#### 2.1 安装依赖

确保你已经安装了 FastAPI 和 Uvicorn：

```bash
pip install fastapi uvicorn
```

#### 2.2 基本使用

下面是一个基本示例，展示如何在 FastAPI 中使用后台任务。

```python
from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def write_log(message: str):
    with open("log.txt", "a") as log_file:
        log_file.write(message + "\n")

@app.post("/send-notification/")
async def send_notification(background_tasks: BackgroundTasks, email: str, message: str):
    background_tasks.add_task(write_log, f"Notification sent to {email} with message: {message}")
    return {"message": "Notification sent"}
```

在这个示例中，`write_log` 函数被添加为一个后台任务。请求处理完成后，`write_log` 函数将在后台运行。

#### 2.3 在请求处理过程中添加多个后台任务

你可以在请求处理过程中添加多个后台任务。

```python
@app.post("/send-notifications/")
async def send_notifications(background_tasks: BackgroundTasks, emails: list[str], message: str):
    for email in emails:
        background_tasks.add_task(write_log, f"Notification sent to {email} with message: {message}")
    return {"message": "Notifications sent"}
```

在这个例子中，`write_log` 函数被多次添加为后台任务，每个邮件地址都会产生一个单独的后台任务。

### 3. 与依赖项一起使用

你可以将后台任务与依赖项结合使用，以实现更加复杂的逻辑。例如，发送电子邮件通知。

```python
from fastapi import Depends

def get_background_tasks(background_tasks: BackgroundTasks):
    return background_tasks

@app.post("/process/")
async def process(background_tasks: BackgroundTasks = Depends(get_background_tasks), data: dict):
    background_tasks.add_task(write_log, f"Processing data: {data}")
    return {"message": "Processing started"}
```

### 4. 实际应用示例

下面是一个更实际的示例，展示如何在处理请求后发送电子邮件通知。

```python
import smtplib
from email.mime.text import MIMEText

def send_email(email: str, subject: str, body: str):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = "you@example.com"
    msg["To"] = email

    with smtplib.SMTP("localhost") as server:
        server.sendmail("you@example.com", [email], msg.as_string())

@app.post("/notify/")
async def notify(background_tasks: BackgroundTasks, email: str, subject: str, body: str):
    background_tasks.add_task(send_email, email, subject, body)
    return {"message": "Notification will be sent"}
```

在这个例子中，`send_email` 函数被添加为一个后台任务，以便在响应返回后发送电子邮件通知。

### 5. 使用第三方库的后台任务

如果你需要更强大的后台任务处理能力，可以使用像 Celery 这样的库。下面是一个使用 Celery 的示例。

#### 5.1 安装 Celery 和 Redis

```bash
pip install celery redis
```

#### 5.2 配置 Celery

```python
from celery import Celery

celery_app = Celery(
    "worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery_app.task
def send_email(email: str, subject: str, body: str):
    # 发送邮件的逻辑
    pass
```

#### 5.3 使用 Celery 任务

```python
@app.post("/notify/")
async def notify(email: str, subject: str, body: str):
    send_email.delay(email, subject, body)
    return {"message": "Notification will be sent"}
```

在这个例子中，`send_email.delay` 用于异步调用 Celery 任务。

### 6. 总结

FastAPI 提供了简洁而强大的后台任务功能，通过使用 `BackgroundTasks`，你可以在不阻塞响应的情况下执行一些需要较长时间的任务。无论是写日志、发送电子邮件，还是执行其他后台操作，FastAPI 的后台任务功能都能很好地满足需求。如果需要更复杂的任务队列和调度功能，可以集成 Celery 等第三方任务队列库。通过合理使用后台任务，可以提升应用的性能和用户体验。