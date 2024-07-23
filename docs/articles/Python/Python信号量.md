---
comments: true
---

在 Python 中，信号量（Semaphore）是一种同步原语，用于管理并发访问的资源。信号量维护一个内部计数器，该计数器表示还剩余多少资源可供使用。当需要使用资源时，线程可以尝试获取信号量，如果信号量计数大于零，则减少计数并允许访问资源；如果计数为零，则线程需要等待直到有资源可用或超时。下面详细介绍 Python 中信号量的使用方法。

### 1. 使用 `threading.Semaphore`

Python 提供了 `threading` 模块，其中的 `Semaphore` 类用于创建信号量对象。主要方法包括：

- `acquire()`：尝试获取信号量。如果信号量计数大于零，则计数减一并立即返回；如果计数为零，则阻塞直到有资源可用。
- `release()`：释放信号量。增加信号量计数，通常在使用完资源后调用。

**示例**

```python
import threading
import time

# 创建信号量对象，设置初始计数为2
semaphore = threading.Semaphore(2)

def access_resource(name):
    print(f"{name} is trying to access")
    semaphore.acquire()
    print(f"{name} is accessing the resource")
    time.sleep(2)  # 模拟访问资源
    print(f"{name} is releasing")
    semaphore.release()

# 创建多个线程访问资源
thread1 = threading.Thread(target=access_resource, args=("Thread 1",))
thread2 = threading.Thread(target=access_resource, args=("Thread 2",))
thread3 = threading.Thread(target=access_resource, args=("Thread 3",))

thread1.start()
thread2.start()
thread3.start()

thread1.join()
thread2.join()
thread3.join()
```

输出结果可能类似于：
```
Thread 1 is trying to access
Thread 1 is accessing the resource
Thread 2 is trying to access
Thread 2 is accessing the resource
Thread 1 is releasing
Thread 3 is trying to access
Thread 3 is accessing the resource
Thread 2 is releasing
Thread 3 is releasing
```

### 2. 使用 `asyncio.Semaphore`（异步）

在异步编程中，可以使用 `asyncio` 模块提供的 `Semaphore` 类来实现类似的功能。`Semaphore` 对象与 `threading.Semaphore` 类似，但是适用于协程而非线程。

**示例**

```python
import asyncio

# 创建信号量对象，设置初始计数为2
semaphore = asyncio.Semaphore(2)

async def access_resource(name):
    print(f"{name} is trying to access")
    async with semaphore:
        print(f"{name} is accessing the resource")
        await asyncio.sleep(2)  # 模拟访问资源
        print(f"{name} is releasing")

# 创建多个协程访问资源
async def main():
    tasks = [access_resource(f"Coroutine {i}") for i in range(3)]
    await asyncio.gather(*tasks)

# 运行事件循环
asyncio.run(main())
```

输出结果可能类似于：
```
Coroutine 0 is trying to access
Coroutine 0 is accessing the resource
Coroutine 1 is trying to access
Coroutine 1 is accessing the resource
Coroutine 0 is releasing
Coroutine 2 is trying to access
Coroutine 2 is accessing the resource
Coroutine 1 is releasing
Coroutine 2 is releasing
```

### 3. 总结

信号量在多线程和异步编程中都是非常有用的同步工具，可以有效地管理并发访问的资源，避免竞态条件和资源争用问题。在编写并发程序时，根据需要选择合适的信号量类（`threading.Semaphore` 或 `asyncio.Semaphore`），并正确使用其 `acquire()` 和 `release()` 方法来确保程序的正确性和效率。