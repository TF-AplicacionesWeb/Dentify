<script>
export default {
  name: "profile-settings.component"
}
</script>

<template>
  <div class="profile-settings-container">
    <p><b>{{ $t('Profile.Settings')}}</b></p>
    <hr class="custom-line">
    <p style="text-decoration: underline;"><b>{{ $t('Profile.egInformation')}}</b></p>
    <p style="text-decoration: underline;"><b>{{ $t('Profile.cPassword')}}</b></p>
  </div>
</template>

<style scoped>
.profile-settings-container {
  background-color: #D1F2EB;
  border-radius: 30px;
  height: 20vw;
  padding: 2em 2em;
  text-align: left;
  margin-top: 1em;
  font-size: 1em;
}

.profile-settings-container p, .profile-settings-container hr {
  margin: 0.7em 0.5em;
}

.custom-line {
  background-color: black;
  height: 0.2em;
}
</style>