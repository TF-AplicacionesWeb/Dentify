<script>
export default {
  name: "profile-change-password",
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  methods: {
    goToProfile(){
      this.$router.push('/home/profile');
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