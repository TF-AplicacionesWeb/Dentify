<script>
import changelangComponent from "../../misc/changelang.component.vue";

export default {
  name: "toolbar-home.component",
  components: {changelangComponent}

}
</script>

<template>

  <pv-toolbar class="w-full bg-[#D1F2EB] shadow-md fixed top-0 left-0 flex items-center justify-between p-4 pv-toolbar">
    <template #start>
      <pv-button class="text-black rounded-lg text-lg px-6 py-3" @click="this.$router.push('/home')">
        LOGO
      </pv-button>
    </template>
    <template #center class="toolbar-content">

      <pv-button class="mx-3" @click="this.$router.push('/home/dashboard')">
        <i class="pi pi-desktop mx-1"></i>
        {{ $t('Toolbar.Dashboard') }}
      </pv-button>
      <pv-button class="mx-3">
        <i class="pi pi-calendar-clock mx-1"></i>
        {{ $t('Toolbar.Appointments') }}
      </pv-button>
      <pv-button class="mx-3">
        <i class="pi pi-dollar mx-1"></i>
        {{ $t('Toolbar.Payments') }}
      </pv-button>
      <pv-button class="mx-3">
        <i class="pi pi-users mx-1"></i>
        {{ $t('Toolbar.Patients') }}
      </pv-button>
      <pv-button class="mx-3">
        <i class="pi pi-briefcase mx-1"></i>
        {{ $t('Toolbar.Specialists') }}
      </pv-button>
      <pv-button class="mx-3" @click="this.$router.push('/home/support')">
        <i class="pi pi-wrench mx-1"></i>
        {{ $t('Toolbar.Support') }}
      </pv-button>
      <pv-button class="mx-3">
        <i class="pi pi-box mx-1"></i>
        {{ $t('Toolbar.Inventory') }}
      </pv-button>
      <pv-button class ="mx-3">
        <i class="pi pi-file mx-1"></i>
        {{ $t('Toolbar.Reports') }}
      </pv-button>
      <pv-button class="mx-3">
        <i class="pi pi-chart-bar mx-1"></i>
        {{ $t('Toolbar.Metrics') }}
      </pv-button>
    </template>
    <template #end>
      <div class="flex items-center space-x-4">
        <pv-button class="text-black rounded-lg text-lg px-6 py-3">Notif</pv-button>
        <pv-button class="text-black rounded-lg text-lg px-6 py-3" @click="this.$router.push('/home/profile')">Perfil</pv-button>
        <changelang-component></changelang-component>
      </div>
    </template>
  </pv-toolbar>

</template>


<style scoped>
.toolbar-content pv-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.toolbar-content pv-button i {
  margin-right: 0.5rem;
}
</style>