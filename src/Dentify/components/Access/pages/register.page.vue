<script>
import changelangComponent from "../../../../public/changelang.component.vue";
import {AuthenApiService} from "../services/authen-api.service.js";
export default {
  name: "register.component",
  components:{changelangComponent},
  data(){
    return {
      users: null,
      username: '',
      email:'',
      password:'',
      c_password:'',
      errorMessage:null

    };
  },
  mounted() {

  },
  methods:{
    goToLogin(){
      this.$router.push("/login");
    },
    async register() {

      if (!this.username || !this.password || !this.c_password) {
        this.errorMessage = "All data are required.";
        return;
      }

      try {
        const result = await AuthenApiService.register({username:this.username, email:this.email, password:this.password});
        if (result.success) {
          alert("Registration Successful");
          this.$router.push('/login');

        } else {
          this.errorMessage = result.message;
        }
      } catch (error) {
        console.error("Error during login:", error);
        this.errorMessage = "An error occurred during login.";
      }

    }
  }
}
</script>

<template>
  <pv-toolbar  class="w-full fixed top-0 left-0 flex items-center justify-between p-4">
    <template #end>

      <changelangComponent></changelangComponent>
    </template>
  </pv-toolbar>
  <div>
    <div class="flex gap-24 items-center">
      <pv-Image src="src/assets/img/login.png" width="80%" class="w-1/2"></pv-Image>
      <div>
        <div class="flex flex-col items-center justify-center">
          <pv-Image src="src/assets/img/logoDentify.png" width="190px"></pv-Image>
          <h1 class="mt-8 mb-8 text-center" style="font-size: 50px">{{$t('Access.Register')}}</h1>
        </div>
        <div class="flex flex-col gap-3">
          <label for="username" class="text-left">{{$t('Access.Username')}}</label>
          <pv-inputtext id="username" class="custom-input cursor-text" v-model="username" type="text" size="small"
                        placeholder="enter your username"/>

          <label for="email" class="text-left">E-mail</label>
          <pv-inputtext type="text" id="email" class="custom-input cursor-text" v-model="email" size="small" toggleMask
                        placeholder="enter your email"/>

          <label for="password" class="text-left">{{$t('Access.Password')}}</label>
          <pv-inputtext type="password" id="password" class="custom-input cursor-text" v-model="password" size="small" toggleMask
                        placeholder="enter your password"/>
          <label for="confirm-password" class="text-left">{{$t('Access.C_password')}}</label>
          <pv-inputtext type="password" id="confirm-password" class="custom-input cursor-text" v-model="c_password" size="small" toggleMask
                        placeholder="confirm your password"/>

          <pv-button class="mt-4 button" @click="register">{{$t('Access.SignIn')}}</pv-button>

          <a class="underline cursor-pointer text-1xl" @click="goToLogin">{{$t('Access.ToLogin')}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.custom-input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #D1F2EB;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: black;
}

.button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #2C3E50;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: white;
}

.button:hover {
  background-color: #2C3E40;
  color: black;
  border-color: #2C3E50;


}

</style>