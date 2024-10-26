<script>
export default {
  name: "profile-settings.component",
  methods: {
    goToEditInformation(){
      this.$router.push('/home/profileEditInformation');
    },
    goToChangePassword(){
      this.$router.push('/home/profileChangePassword');
    }
  }
}
</script>

<template>
  <div class="profile-settings-container">
    <p><b>{{ $t('Profile.Settings')}}</b></p>
    <hr class="custom-line">
    <a style="text-decoration: underline;" @click="goToEditInformation"><b>{{ $t('Profile.egInformation')}}</b></a>
    <br>
    <a style="text-decoration: underline;" @click="goToChangePassword"><b>{{ $t('Profile.cPassword')}}</b></a>
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

.profile-settings-container a, .profile-settings-container hr {
  margin: 0.7em 0.5em;
}

.custom-line {
  background-color: black;
  height: 0.2em;
}

.profile-settings-container a {
  cursor: pointer;
}
</style>