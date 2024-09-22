<script>
import {AuthenApiService} from "../../services/authen-api.service.js";


export default {
  name: "login.vue",
  data(){
    return {
      users: null,
      username: '',
      password: '',
      errorMessage: null,
    }
  },
  created(){
    this.getData();
  },
  methods:{
    goToRegister(){
      this.$router.push('/register');
    },
    getData(){
      AuthenApiService.getData().then((users)=>{
        this.users = users;
      });

    },
    login(){

      if (!this.username || !this.password) {
        this.errorMessage = "Please, enter your username and password";
        return;
      }

      console.log(this.username + " " + this.password);
      AuthenApiService.login(this.username, this.password)
          .then((response) => {
            if (response.success) {

              this.$router.push('/home');
            } else {

              this.errorMessage = "username or password is incorrect";
            }
          })
          .catch((error) => {
            this.errorMessage = "problem with the authentication" + error.message;
          });
    }
  },


}
</script>

<template>
  <div>
    <div class="flex gap-24 items-center">
      <pv-Image src="src/assets/img/login.png" width="80%" class="w-1/2"></pv-Image>
      <div>
        <div class="flex flex-col items-center justify-center">
          <pv-Image src="src/assets/img/logoDentify.png" width="190px"></pv-Image>
          <h1 class="mt-8 mb-8 text-center" style="font-size: 50px">Log In</h1>
        </div>
        <div class="flex flex-col gap-3">
          <label for="username" class="text-left">Username</label>
          <pv-inputtext id="username" class="custom-input" v-model="username" type="text" size="small"
                        placeholder="enter your username"/>

          <label for="password" class="text-left">Password</label>
          <pv-inputtext type="password" id="password" class="custom-input" v-model="password" size="small" toggleMask
                        placeholder="enter your password"/>

          <!-- Mostrar mensaje de error si lo hay -->
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

          <pv-button class="mt-4 button" @click="login">Log In</pv-button>
          <a class="underline cursor-pointer text-1xl" @click="goToRegister">Don't have an account yet?</a>
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

button:hover {
  background-color: #2C3E40;
  color: black;
  border-color: #2C3E50;


}

</style>