<script>
import ProfileContentComponent from "../components/profile-content.component.vue";
import ProfileEditInformationComponent from "../components/profile-edit-information.component.vue";
export default {
  name: "profile-overlay-edit-information.page",
  components: {ProfileContentComponent, ProfileEditInformationComponent}
}
</script>

<template>
  <profile-content-component></profile-content-component>
  <profile-edit-information-component></profile-edit-information-component>
</template>

<style scoped>

</style>