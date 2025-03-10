<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const iframe = ref(null);


const handleClick = ()=>{
    alert('click喔!');
    iframe.value.srcdoc = "<h1>Hello, World!</h1><p>This is embedded content.</p>";
}

const count = ref(0)


</script>

<template>
  <h1>{{ msg }}</h1>

<h1>這是一個可編輯面板xx</h1>
<p @click="handleClick">測試面板</p>
<iframe ref="iframe"  id="myiframe" width="600" height="400"></iframe>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
