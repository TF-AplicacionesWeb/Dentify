
<script>
import { mapActions } from 'vuex';
import { AuthenApiService } from "../services/authen-api.service.js";
import changelangComponent from "../../../../public/changelang.component.vue";

export default {
  name: "login.vue",
  components: { changelangComponent },
  data() {
    return {
      users: null,
      username: '',
      password: '',
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions(['loginStore']),
    async login() {
      this.errorMessage = null;
      if (!this.username || !this.password) {
        this.errorMessage = "Username and password are required.";
        return;
      }
      try {
        const result = await AuthenApiService.login(this.username, this.password);
        if (result.success) {

          this.loginStore(result.user);

          this.$router.push('/home/dashboard');
        } else {
          this.errorMessage = result.message;
        }
      } catch (error) {
        console.error("Error during login:", error);
        this.errorMessage = "An error occurred during login.";
      }
    }
    ,goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<template>
  <pv-toolbar class="w-full fixed top-0 left-0 flex items-center justify-between p-4">
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
          <h1 class="mt-8 mb-8 text-center" style="font-size: 50px">{{$t('Access.Login')}}</h1>
        </div>
        <div class="flex flex-col gap-3">
          <label for="username" class="text-left">{{$t('Access.Username')}}</label>
          <pv-inputtext id="username" class="custom-input" v-model="username" type="text" size="small"
                        placeholder="enter your username"/>

          <label for="password" class="text-left">{{$t('Access.Password')}}</label>
          <pv-inputtext type="password" id="password" class="custom-input" v-model="password" size="small" toggleMask
                        placeholder="enter your password"/>

          <!-- Mostrar mensaje de error si lo hay -->
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

          <pv-button class="mt-4 button" @click="login">{{$t('Access.Login')}}</pv-button>
          <a class="underline cursor-pointer text-1xl" @click="goToRegister">{{$t('Access.ToRegister')}}</a>
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
