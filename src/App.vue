<script setup>
import login from "./Dentify/components/Access/login.component.vue";
import register from "./Dentify/components/Access/register.component.vue";
</script>

<template>
  <router-link to="/home"></router-link>
  <router-link to="/register"></router-link>
  <router-link to="/login"></router-link>

  <transition mode="out-in"
              enter-active-class="transition-opacity duration-500"
              leave-active-class="transition-opacity duration-500"
              enter-class="opacity-0"
              leave-to-class="opacity-0">
    <router-view />
  </transition>
</template>

<style scoped>

</style>
