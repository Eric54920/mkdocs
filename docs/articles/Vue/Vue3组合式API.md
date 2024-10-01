---
comments: true
---

`<script setup>` 是 Vue 3 引入的一种简化的写法，用于使用组合式 API（Composition API）。它能帮助开发者减少样板代码（boilerplate），同时提供更直观、简洁的代码结构。配合 TypeScript 使用时，还能享受静态类型检查和代码提示。

以下是详细介绍 `<script lang="ts" setup>` 的写法，涵盖 Vue 3 组合式 API 的所有核心功能。

### 1. 基本介绍

- **组合式 API**：允许通过组合多个独立的逻辑来组织组件代码，避免 Options API 中的同类逻辑分散问题。
- **`<script setup>`**：是 Vue 3.2 引入的语法糖，省去了 `setup()` 函数和 `return` 的步骤，代码直接写在 `<script setup>` 标签中，自动导出给模板使用。

#### 1.1 基本结构

```html
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts" setup>
const message = 'Hello, Vue 3!'
</script>
```

在这个例子中，`message` 变量会直接暴露给模板中使用，免去返回它的步骤。

### 2. 使用 `props`

在 `<script setup>` 中，`props` 可以直接通过 `defineProps` 获取。

```html
<template>
  <div>{{ title }}</div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
}

const props = defineProps<Props>()
</script>
```

- `defineProps` 是一个编译时的 API，专门用来定义组件的 `props`。
- TypeScript 的类型声明 `Props` 用于定义 `props` 的结构。

### 3. 使用 `emit`

通过 `defineEmits` 可以方便地在 `<script setup>` 中触发自定义事件。

```html
<template>
  <button @click="emitUpdate">Click me</button>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update'])

const emitUpdate = () => {
  emit('update')
}
</script>
```

- `defineEmits` 是用于声明和触发事件的 API。
- `emit('update')` 会触发父组件监听的 `update` 事件。

### 4. 使用 `ref` 和 `reactive`

Vue 3 组合式 API 提供了 `ref` 和 `reactive` 来处理响应式数据。

```html
<template>
  <div>Count: {{ count }}</div>
  <button @click="increment">Increment</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

- `ref` 用于处理基本数据类型的响应式数据，需要通过 `.value` 访问其值。
- `reactive` 适合处理对象或数组的响应式数据。

```html
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})
</script>
```

### 5. 使用 `computed`

`computed` 用于定义计算属性，返回基于其他响应式数据的值。

```html
<template>
  <div>Double: {{ doubleCount }}</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const count = ref(2)
const doubleCount = computed(() => count.value * 2)
</script>
```

- 计算属性会自动缓存，只有当依赖的响应式数据改变时才会重新计算。

### 6. 生命周期钩子

在 `<script setup>` 中，你可以直接使用 Vue 3 的组合式 API 提供的生命周期钩子。

```html
<template>
  <div>Component Mounted</div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  console.log('Component has been mounted')
})

onBeforeUnmount(() => {
  console.log('Component will unmount soon')
})
</script>
```

常用的生命周期钩子有：

- `onMounted`：组件挂载时触发。
- `onBeforeUnmount`：组件销毁前触发。
- 其他的还有 `onUpdated`、`onBeforeUpdate` 等。

### 7. `watch` 和 `watchEffect`

`watch` 和 `watchEffect` 用于监听响应式数据的变化。

- `watch` 用于精确监听特定的响应式数据。

```html
<script lang="ts" setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
</script>
```

- `watchEffect` 是一个立即执行的副作用函数，它会自动依赖所使用的响应式数据。

```html
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  console.log(`Count is now ${count.value}`)
})
</script>
```

### 8. `defineExpose`

通过 `defineExpose`，可以将内部状态或方法暴露给父组件。

```html
<template>
  <div>Child Component</div>
</template>

<script lang="ts" setup>
const internalFunction = () => {
  console.log('Called from parent')
}

defineExpose({
  internalFunction
})
</script>
```

- 父组件可以通过 `ref` 调用子组件暴露出来的 `internalFunction`。

### 9. 使用 `slots` 和 `attrs`

可以使用 `useSlots` 和 `useAttrs` 来获取插槽和 `attrs`。

```html
<template>
  <div>{{ slots.default ? slots.default() : 'No slot content' }}</div>
</template>

<script lang="ts" setup>
const slots = useSlots()
</script>
```

- `useSlots` 用于获取插槽。
- `useAttrs` 用于获取除 `props` 之外传递的其他属性。

### 10. 类型检查和类型推断

当使用 TypeScript 时，Vue 3 的组合式 API 能很好地推断变量、方法和返回值的类型。在 `<script setup>` 中，可以直接使用 TypeScript 的类型声明。

```html
<script lang="ts" setup>
import { ref } from 'vue'

const message: string = 'Hello, TypeScript!'
const count = ref<number>(0)
</script>
```

- TypeScript 的类型可以显式声明，或者依靠 Vue 的自动类型推断。

### 11. CSS作用域和样式

`<script setup>` 与 CSS 一起使用时支持 Vue 组件的样式特性，包括 `scoped`、CSS 预处理器（如 Sass、Less）等。

```html
<template>
  <div class="styled-box">Styled Box</div>
</template>

<script lang="ts" setup>
// your setup logic here
</script>

<style scoped>
.styled-box {
  background-color: lightblue;
  padding: 10px;
}
</style>
```

### 12. 使用模板引用

可以使用 `ref` 来访问 DOM 元素或组件实例。

```html
<template>
  <input ref="inputRef" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>
```

- 通过 `ref` 获取 DOM 元素或组件，并在生命周期钩子中进行操作。

### 13. 异步操作

在 `<script setup>` 中，可以使用 `async/await` 来处理异步操作。

```html
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const message = ref('Loading...')

onMounted(async () => {
  const data = await fetchData()
  message.value = data
})

async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Data loaded!')
    }, 2000)
  })
}
</script>
```

### 14. 总结

Vue 3 的 `<script setup>` 是一种简化组合式 API 的语法糖，提供了更直观、简洁的写法，尤其适合组合式 API 的场景。通过使用 TypeScript，我们可以进一步增强代码的可维护性和类型安全。

主要特点：

- 不需要显式 `setup` 和 `return`。
- 所有组合式 API 可以直接在 `<script setup>` 中使用。
- 与模板紧密结合，减少样板代码。
