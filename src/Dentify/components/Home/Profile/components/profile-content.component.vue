<script>

import { mapGetters } from 'vuex';
import {ProfileApiService} from "../services/profile-api.service.js";

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
      showModal: false,
      nameCompany: null

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
    },
    goToLogin(){
      this.$router.push('/login');
    },
    async updateCompanyName(){
      const service = new ProfileApiService();
      try {
        await service.updateCompany(this.userLogged.id, {company: this.nameCompany});
        this.profile.company = this.nameCompany;
        this.showModal = false;
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  }
}
</script>

<template>
  <div class="profile-container">
    <div class="title-section-container">
      <p>{{ $t('Profile.Profile')}}</p>
      <pv-button class="mx-5" @click="this.showModal = true">
        <i class="pi pi-pencil mx-1 w-0.5" ></i>
      </pv-button>
    </div>
    <div class="header-profile-container">
      <div class="dental-clinic-name-container">
        <p class="name-clinic">{{profile?.company}}</p>
        <p class="dental-clinic">{{ $t('Profile.DentalCenter')}}</p>

      </div>
    </div>
    <div class="button-edit-profile-container">
      <pv-button class="button-edit-profile" @click="goToSettings">{{ $t('Profile.EditProfile')}}</pv-button>
      <pv-button class="button-edit-profile" @click="goToLogin">Log Out</pv-button>
    </div>


  </div>

  <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-[#082f49] mb-4">Edit Company Name</h2>

      <form @submit.prevent="updateCompanyName">
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Insert New Company Name </label>
          <input v-model="nameCompany" type="text"
                 class="w-full border border-gray-300 rounded px-3 py-2" required/>
        </div>
        <div class="flex justify-end">
          <button
              type="button"
              @click="showModal = false"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>


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
  font-size: 2em;
  font-weight: bold;
  display: flex;
  justify-content: left;
  margin-bottom: 0.5em;
  margin-top: 3.5em;
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