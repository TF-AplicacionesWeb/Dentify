<script setup>
import login from "./Dentify/components/Access/login.component.vue";
import register from "./Dentify/components/Access/register.component.vue";
</script>

<template>
  <router-link to="/home"></router-link>
  <router-link to="/register"></router-link>
  <router-link to="/login"></router-link>
  <router-link to="/dashboard"></router-link>
  <router-link to="/support"></router-link>
  <router-view />

</template>

<style scoped>

</style>
