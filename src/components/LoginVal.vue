<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name</label>
        <vInput id="name" type="text" v-model="formData.username" class="border-blue-300" placeholder="輸入"></vInput>
        <span v-if="vuelidate.username.$invalid">
          {{ vuelidate.username.required.$message }}
        </span>
      </div>

      <div>
        <label for="email">Email</label>
        <!-- <vInput id="email" type="email" v-model="loginData.username" class="border-blue-300" placeholder="輸入"></vInput> -->
        <vInput id="email" type="email" v-model="formData.useremail" class="border-blue-300" placeholder="輸入"></vInput>
        <span v-if="vuelidate.useremail.$invalid">
          {{ vuelidate.useremail.email.$message }}
        </span>
      </div>

      <div>
        <label for="password">psssword</label>
        <vInput id="password" type="password" v-model="formData.password" class="border-blue-300" placeholder="輸入">
        </vInput>
        <!-- <span v-if="vuelidate.useremail.$invalid">
          {{ vuelidate.useremail.email.$message }}
        </span> -->
      </div>
      <button type="submit">Submit</button>
    </form>
    <button type="submit" @click='login'>login登入</button>
  </div>
</template>

<script>
import { reactive } from 'vue';
import vInput from './vInput.vue';
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios';
import Cookies from 'js-cookie';


export default {
  name: "LoginVal",
  components: {
    vInput
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup() {

    const formData = reactive({
      username: 'example',
      useremail: 'free@gmail.com',
      password: ''
    });


    const rules = {
      username: { required },
      useremail: { required, email },
      password: { required }
    }
    // https://vicky-yu0318.github.io/vue-project/#/admin/products
    // http://localhost:8080/?

    // const vuelidate = useVuelidate(rules, { username, useremail })
    const vuelidate = useVuelidate(rules, formData)

    const submitForm = () => {
      vuelidate.value.$touch();
      if (vuelidate.value.$invalid) {
        console.log('Form is invalid');
      } else {
        console.log('Form is valid');
      }
    };

    // ============================

    const VUE_APP_API = 'https://vue3-course-api.hexschool.io/';
    // const VUE_APP_PATH = 'freedom'
    // eyJhbGciOiJSUzI1NiIsImtpZCI6InlyeHEtUSJ9

    const login = async () => {

      // const res = await fetch(api)
      // const data = await res.json();

      // TODO: 登入 api
      const userData = { username: "freed8v@gmail.com", password: "q53" }
      const api = `${VUE_APP_API}admin/signin`;
      axios.post(api, userData).then((res) => {
        const { token, expired } = res.data
        document.cookie = `hexLogin=${token}; expires=${new Date(expired)}`;
        Cookies.set('token', token);
      }).catch((err) => console.log(err)).finally((fin) => console.log('fin :>> ', fin)) //必須給 catch 才不會直接在畫面噴錯

      console.log('Cookies :>> ', Cookies, axios);
      // const now = new Date();
      // const expires = new Date(now.getTime() + 10 * 60 * 1000);

      // console.log('expires :>> ', expires);
      // console.log(`Expiry time: ${expires.toISOString()}`);
      // Cookies.set('token', 'vicky', { expires: expires });

      // TODO: 確認 api
      // const api = `${VUE_APP_API}api/user/check`;
      // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexLogin\s*=\s*([^;]*).*$)|^.*$/, '$1') //如果找到了 hexLogin cookie，将其值提取出来并返回。如果没有找到，则返回空字符串。
      // const token2 = Cookies.get('token') //如沒有就是 undefined

      // console.log('axios.defaults.headers :>> ', axios.defaults.headers.common.Authorization);
      // default-> undefined

      // axios.defaults.headers.common.Authorization = token;
      // axios.post(api).then((res) => console.log('res >> ', res))

      // 以上code 有個問題，會讓使用者看到畫面，再執行 mounted 去判斷是否將使用者踢出該頁，請問要怎麼更好的處理這個問題呢？
      // router 檔案建立屬性 beforeEnter


      function setCookie(name, value, minutes) {
        const now = new Date();
        now.setTime(now.getTime() + (minutes * 60 * 1000));
        const expires = now.toString(); // 直接使用本地时间字符串
        document.cookie = `${name}=${value};expires=${expires};path=/`;
      }

      // 设置一个名为 'token' 的 cookie，并设置过期时间为 10 分钟
      setCookie('token', 'vicky', 10);

    }
    return {
      formData,
      vuelidate,
      submitForm,
      login
    }

  }
}
</script>