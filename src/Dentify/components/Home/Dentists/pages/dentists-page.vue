<script>
import {DentistApiService} from "../services/dentist-api.service.js";
import ConfirmationDialogComponent from "../components/confirmation-dialog.component.vue";
import PersonalProfileComponent from "../components/personal-profile.component.vue";
import AvailableHoursComponent from "../components/available-hours.component.vue";
import { mapGetters } from 'vuex';

export default {
  name: "dentists-list.component",
  components: {PersonalProfileComponent, ConfirmationDialogComponent, AvailableHoursComponent},
  data() {
    return {
      dentists: [],
      showConfirmationDialog: false,
      selectedDentist: null,
      showPersonalProfile: false,
      isEditing: false,
      isCreating: false,
      dentistId: null,
      showAvailableHours: false,
      dentistFullName: null,
      userId: null
    }
  },
  computed: {
    ...mapGetters(['getUser']),

    userLogged(){
      return this.getUser;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.dentists = await DentistApiService.getData(this.userLogged.id);
        this.userId = this.userLogged.id;
        console.log(this.dentists);
      } catch (error) {
        console.error("Error loading dentists:", error);
      }
    },
    openConfirmationDialog(dentist) {
      this.selectedDentist = dentist;
      this.showConfirmationDialog = true;
    },
    cancelDelete() {
      this.selectedDentist = null;
      this.showConfirmationDialog = false;
    },
    async confirmDelete() {
      try {
        await DentistApiService.deleteDentist(this.selectedDentist.id);
        await this.getData();
        this.showConfirmationDialog = false;
      } catch(error) {
        console.error("Error deleting dentist:", error);
      }
    },
    openUpdatePersonalProfile(dentist) {
      this.selectedDentist = dentist;
      this.dentistId = dentist.id;
      this.showPersonalProfile = true;
      this.isCreating = false;
      this.isEditing = true;
    },
    openCreatePersonalProfile() {
      this.dentistId = null;
      this.showPersonalProfile = true;
      this.isEditing = false;
      this.isCreating = true;
    },
    closePersonalProfile() {
      this.getData();
      this.showPersonalProfile = false;
      this.isEditing = false;
      this.isCreating = false;
    },
    openAvailableHours(dentist) {
      this.selectedDentist = dentist;
      this.dentistId = dentist.id;
      this.dentistFullName = dentist.first_name + " " + dentist.last_name;
      this.showAvailableHours = true;
    },
    closeAvailableHours() {
      this.showAvailableHours = false;
    }
  }
}
</script>

<template>
  <h1 class="mt-24">{{ $t('Specialists.sSpecialists') }}</h1>

  <div class="button-container">
    <pv-button class="button" @click="openCreatePersonalProfile">{{ $t('Specialists.nSpecialist') }}</pv-button>
  </div>

  <pv-card v-for="dentist in dentists" :key="dentist.dni" class="mt-12 w-full">
    <template #header>
      <div class="bg-[#2C3E50] flex justify-items-start items-center rounded-t-2xl">
        <i class="pi pi-id-card py-12  px-5 text-white" style="font-size: 1rem;"></i>
        <p class="text-white px-5" style="font-weight: bold;">Dr. {{dentist.first_name}} {{dentist.last_name}}</p>
      </div>
    </template>
    <template #content>
      <pv-toolbar class="py-8 bg-[#D1F2EB] rounded-b-2xl flex justify-between">
        <template #start>
          <div class="flex">
            <pv-button class="mx-10 item-toolbar" @click="openUpdatePersonalProfile(dentist)">{{ $t('Specialists.pProfile') }}</pv-button>
            <pv-button class="mx-10 item-toolbar" @click="openAvailableHours(dentist)">{{ $t('Specialists.aHours') }}</pv-button>
          </div>
        </template>
        <template #end>
          <pv-button class="mx-10 button" @click="openConfirmationDialog(dentist)">{{ $t('Specialists.delete') }}</pv-button>
        </template>
      </pv-toolbar>
    </template>
  </pv-card>

  <confirmation-dialog-component :isVisible="showConfirmationDialog"
                                 :dentistName="selectedDentist ? selectedDentist.first_name + ' ' + selectedDentist.last_name : ''"
                                 @confirm="confirmDelete"
                                 @cancel="cancelDelete">
  </confirmation-dialog-component>

  <div v-if="showPersonalProfile">
    <personal-profile-component :id="this.dentistId" :isEditing="isEditing" :isCreating="isCreating"
                                :isVisible="showPersonalProfile" :userId="this.userId" @confirm="closePersonalProfile"
                                @cancel="closePersonalProfile">

    </personal-profile-component>
  </div>

  <div v-if="showAvailableHours">
    <available-hours-component :isVisible="showAvailableHours" :dentistId="this.dentistId"
                               :dentistFullName="this.dentistFullName" :userId="this.userId" @close="closeAvailableHours">

    </available-hours-component>
  </div>
</template>

<style scoped>
.button {
  background-color: #2C3E50;
  border: none;
  border-radius: 30px;
  font-size: 1em;
  font-weight: normal;
  padding: 0.5em 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: white;
}

.item-toolbar {
  font-weight: bold;
  text-decoration: underline;
}

.button-container {
  margin: 2em 0;
  display: flex;
  justify-content: end;
}

h1 {
  font-size: 3em;
  font-weight: bold;
}
</style>