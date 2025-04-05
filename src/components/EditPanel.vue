<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


defineProps({
  msg: String,
})


const code_monitor = ref(null);
const requestPanel = ref(null);
const code_content = ref(null);
const loading = ref(false);  // 控制 loading 顯示
let message_queue = [];

onMounted(() => {
  // 取得 <code> 內部的內容，並寫入 HTML
  //code_monitor.value.srcdoc =  "<h1>顯示看看</h1><h2>似乎成功</h2>";

  // 讓 Prism.js 解析這段程式碼
  //window.Prism.highlightElement(testdiv.value.querySelector("code"));
});


function createMessage(role, content){
  return{
    role : role,
    content : content
  }
}


const handleEnter = async (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();  // 防止輸入框換行
    //alert('Enter 被按下了');
    // 在這裡處理按下 Enter 後的邏輯

    loading.value = true;

    let prompt = null;
    
    if (message_queue){

      //當總文本數大於4000，移除訊息列隊最前方的訊息 //最前方的應該是user輸入
      if (JSON.stringify(message_queue).length > 4000){
        message_queue.shift();

        //再次移除 //移除的是ai的回覆
        if (!message_queue){
          message_queue.shift();
        }
      }

      prompt = JSON.stringify(message_queue)
             + "請參考以上對話，回答以下內容："
             + requestPanel.value.value;
    }else{
      prompt = requestPanel.value.value;
    }

    const encodedPrompt = encodeURIComponent(prompt);

    // 發送API請求
    try {
        const response = await axios.get(`http://localhost:3000/api/getCode?message=${encodedPrompt}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

       console.log('請求');

       code_monitor.value.srcdoc = response.data.generatedText;
       code_content.value.textContent = response.data.generatedText;

       message_queue.push(createMessage("user", prompt));
       message_queue.push(createMessage("assistant", response.data.generatedText));

        // 直接取得回應的資料
        console.log('API response:', response.data);
    } catch (error) {
        console.error('Error fetching API:', error);
    }finally{
      //隱藏loading動畫
      loading.value = false;
    }
  }
}

const count = ref(0)


</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->



  <div class="content">
    <h1>Chat Editor</h1>
    <h2 class="title">純文字靜態網頁創建編輯工具</h2>
      <!-- Loading 遮罩 -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <span>等候頁面生成...</span>
      </div>

    <textarea id="requestPanel" ref = "requestPanel" @keydown.enter="handleEnter"  placeholder="請描述你想要的網頁，描述越清晰得到的頁面將越完整"></textarea>
    <hr>
    <div id = 'container'>
      <div id="code_container">
        <p>code</p>
        <pre><code id="code_content" ref="code_content" class="language-html"></code></pre>
      </div>
    <iframe ref="code_monitor"  id="code_monitor" ></iframe>
    </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}

#requestPanel{
  width: 30vw;
  display: block;
  height: 15vw;
  border-radius: 3%;
  margin :1vw;
  left : 15vw;

  position: relative;
}


#container{
  display: flex;
  margin :1vw;
}

#code_container{
  background-color: rgba(0, 0, 0, 0.8);/* 半透明黑色背景 */
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto; /* 避免長行溢出 */
}

#code_content{
  display: block;
  height: 40vh;
  width: 30vw;
  left: 0;
  border-color: transparent;
}

p{
  color: white;
}



#code_monitor{
  margin : 1vw;
  width: 60vw;
  height: 50vh;
}

pre{
  text-align: left;
}


.title {
    font-family: 'Brush Script MT', cursive; /* 選擇藝術字型 */
    font-size: 48px; /* 調整字體大小 */
    background: linear-gradient(45deg, #1e90ff, #4682b4); /* 藍色漸變 */
    -webkit-background-clip: text; /* 讓背景漸變只顯示在文字上 */

    font-style: italic; /* 文字偏斜 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 加入陰影效果 */
    transform: skewX(-10deg); /* 文字在水平方向上傾斜 */
    margin: 20px 0;
}

.content{
  position: relative;
  left: 0;
}

/* 遮罩背景 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 確保在最上層 */
  color: white;
  font-size: 20px;
}

/* 旋轉圈圈 */
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid white;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


</style>
<!DOCTYPE html>
