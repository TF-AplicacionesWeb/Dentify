<script>
import {ProfileApiService} from "../services/profile-api.service.js";
import { mapGetters } from 'vuex';

export default {
  name: "profile-content.component",
  computed: {
    ...mapGetters(['getUser']),

    userLogged(){
      return this.getUser;
    }
  },
  data() {
    return {
      profiles: [],
      profile: null,
    }
  },
  async mounted() {
    try {
      this.profile = this.userLogged;
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  },
  methods: {
    goToSettings(){
      this.$router.push('/home/profileSettings');
    }
  }
}
</script>

<template>
  <div class="profile-container">
    <div class="title-section-container">
      <p>{{ $t('Profile.Profile')}}</p>
    </div>
    <div class="header-profile-container">
      <div class="profile-logo-container">
        <pv-Image src="src/assets/img/dental-clinic-logo.png" alt="Logo"
                  class="profile-logo" width="128px"></pv-Image>
      </div>
      <div class="dental-clinic-name-container">
        <p class="name-clinic">{{profile?.company}}</p>
        <p class="dental-clinic">{{ $t('Profile.DentalCenter')}}</p>
      </div>
    </div>
    <div class="button-edit-profile-container">
      <pv-button class="button-edit-profile" @click="goToSettings">{{ $t('Profile.EditProfile')}}</pv-button>
    </div>


  </div>
</template>

<style scoped>
.profile-logo {
  width: 20vw;
  height: 20vw;
  max-width: 200vw;
  max-height: 200px;
  object-fit: cover;
  margin: auto;
}

.header-profile-container {
  background-color: #D1F2EB;
  width: 100%;
  margin: auto;
  display: flex;
  padding: 2em;
  border-radius: 30px;
}

.profile-container {
  width: 60vw;
  margin: 0 auto;
}

.title-section-container {
  font-size: 3em;
  font-weight: bold;
  display: flex;
  justify-content: left;
  margin-bottom: 0.5em;
  margin-top: 1.5em;
}

.profile-logo-container {
  margin-right: 1em;
}

.dental-clinic-name-container {
  margin-left: 1em;
}

.name-clinic {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 0.5em;
  padding: 0;
}

.dental-clinic {
  font-size: 1em;
  margin-bottom: 0.5em;
  padding: 0;
  transform: translateY(-1em);
  display: flex;
  justify-content: start;
}

.button-edit-profile {
  background-color: #2C3E50;
  border: none;
  border-radius: 30px;
  font-size: 1em;
  font-weight: normal;
  padding: 0.8em 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: white;
}

.button-edit-profile-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
}

.button-edit-profile:hover {
  background-color: #5c738a;
  color: white;
}
</style>