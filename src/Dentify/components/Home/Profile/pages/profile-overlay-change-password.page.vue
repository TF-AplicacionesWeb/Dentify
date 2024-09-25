<script>
import ProfileContentComponent from "../components/profile-content.component.vue";
import ProfileChangePasswordComponent from "../components/profile-change-password.component.vue";
export default {
  name: "profile-overlay-change-password.page",
  components: {ProfileContentComponent, ProfileChangePasswordComponent}
}
</script>

<template>
  <profile-content-component></profile-content-component>
  <profile-change-password-component></profile-change-password-component>
</template>

<style scoped>

</style>