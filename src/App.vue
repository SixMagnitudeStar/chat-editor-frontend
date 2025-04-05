
<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import EditPanel  from './components/EditPanel.vue';


const isAgeVerified = ref(false)

function confirmAge() {
  isAgeVerified.value = true
}

function goBack() {
  window.history.back()  // 返回上一頁
}
</script>

<template>
  <div>
    <!-- <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a> -->
    <!-- <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  </div>
<div>
    <!-- 年齡確認彈窗 -->
  <div v-if="!isAgeVerified" class="modal">
    <div class="modal-content">
      <h2>年齡確認</h2>
      <p>基於Gemini AI使用條款，本網站禁止未成年訪問。請問您是否已滿 18 歲？</p>
      <button @click="confirmAge">是，我已滿 18 歲</button>
      <button @click="goBack">否，返回上一頁</button>
    </div>
  </div>

  <!-- 網站內容 -->
  <div v-else>
   <EditPanel msg="" :style="{ left: leftPosition + 'px' }"></EditPanel>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
      <!-- 其他頁面內容 -->
  </div>
</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}


</style>
