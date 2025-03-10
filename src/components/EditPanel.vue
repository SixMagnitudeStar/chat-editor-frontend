<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineProps({
  msg: String,
})

const iframe = ref(null);
const text1 = ref(null);



const handleClick = async () => {
    alert('click喔!');
    iframe.value.srcdoc = "<h1>Hello, World!</h1><p>This is embedded content.</p>";
    text1.value.value = "測試文本ㄅㄅㄅ";

    // 發送API請求
    // 發送API請求
    try {
        const response = await axios.get('http://localhost:3000/generate?message=hi', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        text1.value.value = response.data.generatedText;

        // 直接取得回應的資料
        console.log('API response:', response.data);
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

const count = ref(0)


</script>

<template>
  <h1>{{ msg }}</h1>

<h1>這是一個可編輯面板xx</h1>
<p @click="handleClick">測試面板</p>
<textarea ref = "text1" >===</textarea>
<iframe ref="iframe"  id="myiframe" width="600" height="400"></iframe>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
