<script>
import {ProfileApiService} from "../services/profile-api.service.js";

export default {
  name: "profile-change-password",
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      profiles: [],
      profile: null,
    }
  },
  async mounted() {
    try {
      const profiles = await ProfileApiService.getData();
      this.profiles = profiles;
      this.profile = profiles[0];
      console.log(this.profile);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  },
  methods: {
    async goToProfile(){
      if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
        alert(this.$t('Fill all fields, please'));
        return;
      } else if (this.currentPassword !== this.profile.password) {
        alert(this.$t('Wrong current password'));
        return;
      } else if (this.newPassword !== this.confirmPassword) {
        alert(this.$t('New passwords do not match'));
        return;
      } else if (this.newPassword.length < 8) {
        alert(this.$t('New password must be at least 8 characters long'));
        return;
      }

      ProfileApiService.updatePassword(this.profile.id, this.newPassword)
          .then(() => {
            alert(this.$t('Password updated successfully'));
            this.$router.push('/home/profile');
          })
          .catch(error => {
            console.error("Error updating password:", error);
            alert(this.$t('Error updating password'));
          });
    }
  }
}
</script>

<template>
  <div class="profile-settings-container">
    <p><b>{{ $t('Profile.Settings')}} > {{ $t('Profile.cPassword') }}</b></p>
    <hr class="custom-line">

    <div class="current-password-container">
      <label for="currentPassword" class="label-left">{{ $t('Profile.cuPassword')}}:</label>
      <pv-inputtext class="input-right" id="currentPassword" v-model="currentPassword" type="password" size="small"
                    :placeholder="$t('Profile.ecPassword')"></pv-inputtext>
    </div>

    <div class="new-password-container">
      <label for="newPassword" class="label-left">{{ $t('Profile.nPassword')}}:</label>
      <pv-inputtext class="input-right" id="newPassword" v-model="newPassword" type="password" size="small"
                    :placeholder="$t('Profile.enPassword')"></pv-inputtext>
    </div>

    <div class="confirm-password-container">
      <label for="confirmPassword" class="label-left">{{ $t('Profile.ccPassword')}}:</label>
      <pv-inputtext class="input-right" id="confirmPassword" v-model="confirmPassword" type="password" size="small"
                    :placeholder="$t('Profile.rnPassword')"></pv-inputtext>
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

.current-password-container, .new-password-container, .confirm-password-container {
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
  width: 25ch;
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