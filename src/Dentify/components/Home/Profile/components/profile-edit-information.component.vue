<script>

export default {
  name: "profile-edit-information",
  data() {
    return {
      name: '',
      email: '',
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
      <pv-button class="button-save-changes">{{ $t('Profile.cChanges') }}</pv-button>
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