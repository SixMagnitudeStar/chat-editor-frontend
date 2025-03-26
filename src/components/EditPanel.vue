<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


defineProps({
  msg: String,
})


const testdiv = ref(null); // 確保 ref 正確綁定
const iframe = ref(null);
const text1 = ref(null);
const code1 = ref(null);

onMounted(() => {
  // 取得 <code> 內部的內容，並寫入 HTML
  testdiv.value.querySelector("code").textContent = "<h1>顯示看看</h1>\n<h2>似乎成功</h2>";
  iframe.value.srcdoc =  "<h1>顯示看看</h1><h2>似乎成功</h2>";

  // 讓 Prism.js 解析這段程式碼
  window.Prism.highlightElement(testdiv.value.querySelector("code"));
});

const handleClick = async () => {
    alert('click喔!');
   // iframe.value.srcdoc = "<h1>Hello, World!</h1><p>This is embedded content.</p>";
    //text1.value.value = "測試文本ㄅㄅㄅ";
    let prompt = text1.value.value;
    const encodedPrompt = encodeURIComponent(prompt);
    alert('輸出值:'+`http://localhost:3000/api/getCode?message=${encodedPrompt}`);
    console.log(`http://localhost:3000/api/getCode?message=${encodedPrompt}`);

    // 發送API請求
    // 發送API請求
    try {
        const response = await axios.get(`http://localhost:3000/api/getCode?message=${encodedPrompt}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

       // text1.value.value = response.data.generatedText;
       console.log('請求');

       alert(response.data.generatedText);
       //let cleanHtml = response.data.generatedText.replace(/^```html|```$/g, "").trim();
       let cleanHtml = response.data.generatedText.replace(/^```(?:html)?\n|\n```$/g, "").trim();


      //iframe.value.srcdoc = response.data.generatedText;
       iframe.value.srcdoc =  cleanHtml;
      // code1.value.innerHTML = response.data.generatedText;
       code1.value.textContent = cleanHtml ;

        // 直接取得回應的資料
        console.log('API response:', response.data);
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}


const handleEnter = async (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();  // 防止輸入框換行
    alert('Enter 被按下了');
    // 在這裡處理按下 Enter 後的邏輯
    let prompt = text1.value.value;
    const encodedPrompt = encodeURIComponent(prompt);
    alert('輸出值:'+`http://localhost:3000/api/getCode?message=${encodedPrompt}`);
    console.log(`http://localhost:3000/api/getCode?message=${encodedPrompt}`);

    // 發送API請求
    // 發送API請求
    try {
        const response = await axios.get(`http://localhost:3000/api/getCode?message=${encodedPrompt}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

       // text1.value.value = response.data.generatedText;
       console.log('請求');

       iframe.value.srcdoc = response.data.generatedText;
       code1.value.innerHTML = response.data.generatedText;

        // 直接取得回應的資料
        console.log('API response:', response.data);
    } catch (error) {
        console.error('Error fetching API:', error);
    }
  }
}


const count = ref(0)


</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->

<div class="content">
  <h1>Chat Editor</h1>
  <h2 class="title">一種基於自然語言的網頁開發方式</h2>
  <pre ref="testdiv"><code class="language-html"></code></pre>

  <pre>
  輸入你想要的網頁類型，並依據下方顯示的瀏覽模樣，輸入prompt調整至期望樣式
  例如，想要一個登入登出畫面，並依據顯示的樣子，進一步修正，如背景想要的顏色、字體擺放位置與大小等等
  </pre>

  <p @click="handleClick">測試面板</p>

  <textarea id="text1" ref = "text1" @keydown.enter="handleEnter" >===</textarea>
  <div id = 'container1'>
    <div id="container2">
      code
      <pre><code id="code1" ref="code1"></code></pre>

    </div>
  <iframe ref="iframe"  id="myiframe" ></iframe>
  </div>


</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

#text1{
  width: 30vw;
  display: block;
  height: 15vw;
  border-radius: 3%;
  margin :1vw;
  left : 15vw;

  position: relative;
}

code {
  display: block;
  white-space: pre-wrap; /* 避免單行文本過長不換行 */
  word-wrap: break-word; /* 長單字會自動換行 */
}

#code1{
  display: block;
  width: 25vw;
  height: auto;
  overflow: auto;
  white-space: pre-wrap;
  margin : 1vw;

  left: 0;


  color: #abb2bf; 
  font-family: "Courier New", Courier, monospace; /* 等寬字型 */
  padding: 2px 4px;
  border-radius: 4px;
}

#container1{
  display: flex;
  margin :1vw;
}

#container2{
  border: 1px solid black;
  margin: 1vw;
  background-color: #f0f0f0; 
}

#myiframe{
  margin : 1vw;
  width: 60vw;
  height: 50vh;
}


pre {
    font-family: 'Courier New', monospace; /* 使用等寬字體，適合顯示程式碼或預格式化文字 */
    font-size: 16px; /* 調整字體大小，讓文字更加清晰 */
    line-height: 1.5; /* 行間距，使文字間距更舒適 */
    padding: 10px; /* 內邊距，避免文字貼邊 */

    position: relative;
    left: 10vw;

    text-align: left;

    overflow: auto; /* 內容超過邊界時顯示滾動條 */
    white-space: pre-wrap; /* 允許文本換行，但保留空格 */

    word-wrap: break-word; /* 讓長單詞在必要時換行 */
    margin: 20px 0; /* 外邊距，讓元素周圍有些空間 */
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

</style>
<!DOCTYPE html>
