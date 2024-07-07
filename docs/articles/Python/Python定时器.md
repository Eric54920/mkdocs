---
comments: true
---

在 Python 中，可以使用 `threading.Timer` 类来创建定时器，这个类允许您在指定的时间间隔后执行特定的函数或代码块。定时器可以用于执行周期性的任务或延时执行任务。

### 使用 `threading.Timer`

`threading.Timer` 是 Python 中用于创建定时器的类，它继承自 `threading.Thread`，因此可以像线程一样创建和管理定时任务。

#### 示例：

下面是一个简单的示例，演示如何使用 `threading.Timer` 创建一个定时器，在指定的时间后执行特定的任务：

```python
import threading
import time

def periodic_task():
    print("Periodic task is running...")
    # 这里可以放置需要周期执行的任务逻辑
    # 这里暂时设定为每隔 2 秒执行一次
    threading.Timer(2, periodic_task).start()

if __name__ == "__main__":
    print("Starting periodic task...")
    periodic_task()
    
    # 让主线程持续运行，否则定时器会被销毁
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Exiting...")
```

**说明**：
- `periodic_task()` 函数定义了周期性执行的任务，这里简单地打印一条消息。
- `threading.Timer(2, periodic_task).start()` 创建了一个定时器，每隔 2 秒执行一次 `periodic_task()` 函数。
- 在主程序中，通过一个简单的 `try-except` 结构来保持主线程持续运行，否则定时器会在主线程结束时被销毁。

#### 运行结果示例：
```
Starting periodic task...
Periodic task is running...
Periodic task is running...
Periodic task is running...
Exiting...
```

### 取消定时器

使用 `threading.Timer` 创建的定时器对象可以调用 `cancel()` 方法来取消定时器的执行。例如，在某些条件下不再需要定时器时，可以通过取消定时器来释放资源。

#### 示例：

```python
import threading
import time

def periodic_task():
    print("Periodic task is running...")
    # 这里可以放置需要周期执行的任务逻辑
    # 这里暂时设定为每隔 2 秒执行一次
    global timer
    timer = threading.Timer(2, periodic_task)
    timer.start()

if __name__ == "__main__":
    print("Starting periodic task...")
    timer = threading.Timer(2, periodic_task)
    timer.start()
    
    # 模拟运行一段时间后取消定时器
    time.sleep(10)
    timer.cancel()
    print("Timer canceled. Exiting...")
```

**说明**：
- 在这个示例中，定时器 `timer` 每隔 2 秒执行一次 `periodic_task()` 函数。
- 主程序中通过 `time.sleep(10)` 模拟程序运行一段时间后，调用 `timer.cancel()` 取消定时器的执行。
- 当定时器被取消后，再次调用 `timer.start()` 将不会再次启动定时器，需要重新创建和启动。

#### 运行结果示例：
```
Starting periodic task...
Periodic task is running...
Periodic task is running...
Periodic task is running...
Periodic task is running...
Periodic task is running...
Timer canceled. Exiting...
```

### 注意事项

- 定时器的回调函数应该尽量简短，避免阻塞定时器线程，影响定时器的精确性。
- 定时器的实现依赖于 Python 的线程调度器，因此在某些场景下可能会存在一定的延迟和误差。

使用 `threading.Timer` 类可以方便地实现在指定时间间隔后执行任务的功能，适用于需要定期执行某些操作的场景，如定时任务、定时检查等。