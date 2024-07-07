---
comments: true
---

在 Python 中，处理并发（Concurrency）和并行（Parallelism）是涉及到多任务处理的两个重要概念，它们通常用于描述程序同时执行多个任务的能力，但在实现方式和应用场景上有所不同。

### 1. 并发（Concurrency）

并发是指程序设计的一种特性，允许多个任务在重叠的时间段内执行，但不一定同时执行。在单核 CPU 上，通过任务切换和时间片分配来实现多任务之间的切换，从而在单个 CPU 上实现并发。Python 中实现并发通常使用以下方式：

- **多线程**：通过 `threading` 模块可以创建多个线程，每个线程可以执行不同的任务，利用 CPU 时间片轮转来实现并发执行。

- **异步编程**：通过 `asyncio`、`async` 和 `await` 关键字等异步编程工具，可以实现单线程内的任务并发执行，适用于 I/O 密集型任务，如网络请求、文件读写等。

### 示例：使用 `asyncio` 实现并发

```python
import asyncio

async def task1():
    print("Task 1 started")
    await asyncio.sleep(1)
    print("Task 1 finished")

async def task2():
    print("Task 2 started")
    await asyncio.sleep(2)
    print("Task 2 finished")

async def main():
    await asyncio.gather(task1(), task2())

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. 并行（Parallelism）

并行是指多个任务同时执行，通常在多核 CPU 或多处理器环境下实现。每个任务可以独立地分配给不同的 CPU 核心或处理器执行，从而同时完成。Python 中实现并行通常使用以下方式：

- **多进程**：通过 `multiprocessing` 模块可以创建多个进程，每个进程独立运行在其分配的 CPU 核心上，从而实现真正的并行执行。

- **并行计算库**：如 `concurrent.futures`、`joblib`、`dask` 等库，提供了高级接口来管理和分发任务到多个处理器核心或节点上执行。

### 示例：使用 `multiprocessing` 实现并行

```python
import multiprocessing
import time

def task1():
    print("Task 1 started")
    time.sleep(1)
    print("Task 1 finished")

def task2():
    print("Task 2 started")
    time.sleep(2)
    print("Task 2 finished")

if __name__ == "__main__":
    process1 = multiprocessing.Process(target=task1)
    process2 = multiprocessing.Process(target=task2)

    process1.start()
    process2.start()

    process1.join()
    process2.join()
```

### 区别和选择

- **并发 vs 并行**：并发更侧重于任务之间的交替执行和任务管理，适合于处理大量 I/O 操作；而并行则更关注任务的同时执行，适合于 CPU 密集型任务。

- **Python 中的选择**：根据任务类型和性能需求选择合适的并发或并行模型。对于 I/O 密集型任务，使用异步编程是一个很好的选择；对于 CPU 密集型任务，使用多进程来充分利用多核 CPU 的性能更为有效。

综上所述，Python 提供了多种实现并发和并行的工具和库，开发者可以根据具体场景和需求选择合适的方式来提高程序的效率和性能。