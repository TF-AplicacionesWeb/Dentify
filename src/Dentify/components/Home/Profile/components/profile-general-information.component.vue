<script>
import {ProfileApiService} from "../services/profile-api.service.js";

export default {
  name: "profile-general-information.component",
  data() {
    return {
      profiles: [],
      profile: null,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      ProfileApiService.getData().then((profiles)=>{
        this.profiles = profiles;
        this.profile = profiles[0];
      })
    }
  }
}
</script>

<template>
  <div class="profile-general-information-container">
    <p><b>{{ $t('Profile.gInformation')}}</b></p>
    <hr class="custom-line">
    <p><b>{{ $t('Profile.Name')}}:</b> {{profile?.name}} {{profile?.lastname}}</p>
    <p><b>{{ $t('Profile.Email')}}:</b> {{profile?.email}}</p>
  </div>
</template>

<style scoped>
.profile-general-information-container {
  background-color: #D1F2EB;
  border-radius: 30px;
  padding: 2em 2em;
  text-align: left;
  margin-top: 1em;
  font-size: 1em;
}

.profile-general-information-container p, .profile-general-information-container hr {
  margin: 0.7em 0.5em;
}

.custom-line {
  background-color: black;
  height: 0.2em;
}
</style>