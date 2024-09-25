<script>
import cardPatientsComponent from "../components/card-patients.component.vue";
export default {
  name: "patients.page",
  components:{cardPatientsComponent},
}
</script>

<template>

  <h1 class="mt-24 text-4xl mb-5">{{$t('Patients.header')}}</h1>
  <div class="flex justify-between">
    <pv-toolbar class="bg-[#D1F2EB] shadow-md w-4/12 rounded-3xl flex items-center justify-between p-4">
      <template #start>
        <pv-iconfield>
          <pv-inputicon class="mr-3">
            <i class="pi pi-search"/>
          </pv-inputicon>
          <pv-inputtext class="bg-[#D1F2EB] w-80" placeholder="Search"/>
        </pv-iconfield>
      </template>
      <template #end>
        <i class="pi pi-sliders-h"/>
      </template>
    </pv-toolbar>
    <pv-button class="button">{{$t('Patients.button')}}</pv-button>
  </div>

  <card-patients-component></card-patients-component>




</template>

<style scoped>

.button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #2C3E50;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: white;
}

.button:hover {
  background-color: #2C3E40;
  color: black;
  border-color: #2C3E50;
}

.toolbar-content pv-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}


</style>