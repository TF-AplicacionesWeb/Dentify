<script>
import profileContentComponent from "./profile-content.component.vue";
import profileGeneralInformationComponent from "./profile-general-information.component.vue";

export default {
  name: "profile-overlay.component",
  components: {profileContentComponent, profileGeneralInformationComponent}
}
</script>

<template>
  <profile-content-component></profile-content-component>
  <profile-general-information-component></profile-general-information-component>
</template>

<style scoped>

</style>