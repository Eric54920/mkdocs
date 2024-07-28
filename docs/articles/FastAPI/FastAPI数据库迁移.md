---
comments: true
---

使用 FastAPI 和 SQLAlchemy 进行数据库操作时，数据库迁移是一个重要的步骤。Alembic 是一个用于处理数据库迁移的工具，可以帮助你管理数据库模式的变更。下面是一个完整的步骤指南，介绍如何在 FastAPI 项目中使用 Alembic 进行数据库迁移。

### 1. 安装必要的包

首先，确保你已经安装了 FastAPI、SQLAlchemy 和 Alembic：

```bash
pip install fastapi sqlalchemy alembic pymysql
```

### 2. 设置项目结构

假设你的项目结构如下：

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── crud.py
│   ├── schemas.py
│   └── database.py
└── alembic
    ├── env.py
    ├── README
    ├── script.py.mako
    └── versions
        ├── .gitkeep
```

### 3. 配置数据库和模型

#### 3.1 `database.py`

创建和配置数据库连接：

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://username:password@localhost/dbname"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

#### 3.2 `models.py`

定义你的数据模型：

```python
from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(50), unique=True, index=True)
```

### 4. 初始化 Alembic

在项目根目录下初始化 Alembic：

```bash
alembic init alembic
```

### 5. 配置 Alembic

编辑 `alembic.ini` 文件，设置数据库连接字符串：

```ini
# Replace with your actual database URL
sqlalchemy.url = mysql+pymysql://username:password@localhost/dbname
```

在 `alembic/env.py` 文件中，修改 `run_migrations_online` 函数以包含你的 SQLAlchemy 基础类（`Base`）：

```python
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
from app.models import Base
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well. By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

### 6. 创建迁移脚本

使用 Alembic 自动生成迁移脚本：

```bash
alembic revision --autogenerate -m "Initial migration"
```

### 7. 应用迁移

运行以下命令以应用迁移到数据库：

```bash
alembic upgrade head
```

### 8. 添加新字段

假设你需要在 `User` 表中添加一个 `age` 字段：

- 更新你的 `User` 模型：

    ```python
    class User(Base):
        __tablename__ = "users"
        id = Column(Integer, primary_key=True, index=True)
        name = Column(String(50), index=True)
        email = Column(String(50), unique=True, index=True)
        age = Column(Integer, nullable=True)  # 新增字段
    ```

- 创建新的迁移脚本：

    ```bash
    alembic revision --autogenerate -m "Add age column to user table"
    ```

- 在生成的迁移脚本中，你应该会看到：

    ```python
    def upgrade():
        op.add_column('users', sa.Column('age', sa.Integer(), nullable=True))

    def downgrade():
        op.drop_column('users', 'age')
    ```

- 应用迁移：

    ```bash
    alembic upgrade head
    ```

通过这些步骤，你可以使用 Alembic 在 FastAPI 项目中轻松地管理数据库迁移，包括添加、删除或修改字段。这样可以确保你的数据库模式与应用程序的模型保持一致，并且可以轻松地进行版本控制和回滚。