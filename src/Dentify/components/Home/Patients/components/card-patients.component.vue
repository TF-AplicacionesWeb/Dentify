<script>
import {PatientsService} from "../services/patients.service.js";
import { mapGetters } from 'vuex';

export default {
  name: "card-patients.component",
  data(){
    return {
      patients: [],
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(['getUser']),

    userLogged(){
      return this.getUser;
    }
  },
  async mounted(){
    const sInstance = new PatientsService();
    try {
      this.patients = await sInstance.getData(this.userLogged.id);

      }catch(error){
      console.error("Error", error);
      this.errorMessage = "Failed save names"
    }
  }

}
</script>

<template>
<div v-if="patients.length">
  <pv-card v-for="patient in patients" :key="patient.id" class="mt-12 w-full">
    <template #header>
      <div class="bg-[#2C3E50] flex justify-items-start items-center rounded-t-2xl">
        <i class="pi pi-user py-12  px-5 text-white"></i>
        <p class="text-white px-5">{{patient.first_name}} {{patient.last_name}}</p>
      </div>
    </template>
    <template #content>
      <pv-toolbar class="py-8 bg-[#D1F2EB] rounded-b-2xl">
        <template #start class="toolbar-content">
          <pv-button class="mx-10">{{$t('Patients.Personal_doc')}}</pv-button>
          <pv-button class="mx-10">{{$t('Patients.Misc_doc')}}</pv-button>
        </template>
      </pv-toolbar>
    </template>
  </pv-card>
</div>
</template>

<style scoped>
.toolbar-content pv-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>