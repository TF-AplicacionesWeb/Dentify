<script>
import ProfileContentComponent from "../components/profile-content.component.vue";
import ProfileSettingsComponent from "../components/profile-settings.component.vue";

export default {
  name: "profile-overlay-settings.page",
  components: {ProfileContentComponent, ProfileSettingsComponent}
}
</script>

<template>
  <profile-content-component></profile-content-component>
  <profile-settings-component></profile-settings-component>

</template>

<style scoped>

</style>