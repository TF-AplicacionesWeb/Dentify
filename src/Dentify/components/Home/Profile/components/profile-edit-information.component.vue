<script>
import {ProfileApiService} from "../services/profile-api.service.js";

export default {
  name: "profile-edit-information",
  data() {
    return {
      name: '',
      email: '',
      profiles: [],
      profile: null,
    }
  },
  async mounted() {
    try {
      this.profiles = await ProfileApiService.getData();
      this.profile = this.profiles[0];
      console.log(this.profile);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  },
  methods: {
    goToProfile(){
      if (!this.name && !this.email) {
        alert(this.$t('Fill all fields, please'));
        return;
      }

      let profileUpdated = false;

      if(this.name) {
        const fullName = this.name.trim().split(/\s+/);
        if (fullName.length < 2) {
          alert(this.$t('Enter your first name and last name, please'));
          return;
        }

        this.profile.first_name = fullName[0];
        this.profile.last_name = fullName[1];
        profileUpdated = true;
      }

      if(this.email) {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(this.email)) {
          alert(this.$t('Invalid email format'));
          return;
        }

        this.profile.email = this.email;
        profileUpdated = true;
      }

      if (profileUpdated) {
        ProfileApiService.updateProfile(this.profile.id, this.profile);
      }

      this.$router.push('/home/profile');
    }
  }
}
</script>

<template>
  <div class="profile-settings-container">
    <p><b>{{ $t('Profile.Settings')}} > {{ $t('Profile.egInformation') }}</b></p>
    <hr class="custom-line">
    <div class="name-container">
      <label for="name" class="label-left">{{ $t('Profile.Name')}}:</label>
      <pv-inputtext class="input-right" id="name" v-model="name" type="text" size="small"
                    :placeholder="$t('Profile.pName')"></pv-inputtext>
    </div>
    <div class="email-container">
      <label for="email" class="label-left">{{ $t('Profile.Email')}}:</label>
      <pv-inputtext class="input-right" id="email" v-model="email" type="email" size="small"
                    :placeholder="$t('Profile.pEmail')"></pv-inputtext>
    </div>
    <div class="button-container">
      <pv-button class="button-save-changes" @click="goToProfile">{{ $t('Profile.cChanges') }}</pv-button>
    </div>
  </div>
</template>

<style scoped>
.profile-settings-container {
  background-color: #D1F2EB;
  border-radius: 30px;
  padding: 2em 2em;
  text-align: left;
  margin-top: 1em;
  font-size: 1em;
}

.custom-line {
  background-color: black;
  height: 0.2em;
}

.name-container, .email-container {
  margin: 1em 0;
}

.label-left {
  margin-right: 1em;
  font-weight: bold;
}

.input-right {
  margin-left: 1em;
  border-radius: 15px;
  padding: 0.3em;
}

.button-container {
  text-align: center;
  margin-top: 5em;
}

.button-save-changes {
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

.button-save-changes:hover {
  background-color: #5c738a;
  color: white;
}

</style>