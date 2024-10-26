<script>

import {ScheduleApiService} from "../services/schedule-api.service.js";
import {Schedule} from "../model/Schedule.entity.js";

export default {
  name: "available-hours.component",
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    dentistId: {
      type: Number,
      required: true
    },
    dentistFullName: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      date: null,
      startTime: null,
      endTime: null,
      day: null,
      indexDay: null,
      schedules: [],
      newSchedule: new Schedule({}),
      selectedSchedule: new Schedule({})
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.schedules = await ScheduleApiService.getSchedulesByDentist(this.dentistId);
        console.log(this.schedules);
      } catch (error) {
        console.error("Error loading schedules:", error);
      }
    },
    close() {
      this.$emit('close');
    },
    getIndexDayToTranslate(weekday) {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      console.log(days.indexOf(weekday));
      return days.indexOf(weekday);
    },
    getWeekDay() {
      let dateObject = new Date(this.date);
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      this.indexDay = dateObject.getDay();
      return days[this.indexDay];
    },
    async insertSchedule() {
      this.newSchedule.id = null;
      this.newSchedule.dentist_id = this.dentistId;
      this.newSchedule.weekday = this.getWeekDay();
      this.newSchedule.start_time = this.startTime;
      this.newSchedule.end_time = this.endTime;
      this.newSchedule.date = this.date;
      this.newSchedule.user_id = this.userId;
      try {
        await ScheduleApiService.insertSchedule(this.newSchedule);
        await this.getData();
        console.log(this.newSchedule);
      } catch (error) {
        console.error("Error creating schedule:", error);
      }
    },
    async deleteSchedule(schedule) {
      this.selectedSchedule = schedule;
      try {
        await ScheduleApiService.deleteSchedule(this.selectedSchedule.id);
        await this.getData();
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  }
}
</script>

<template>
  <div v-if="isVisible" class="overlay flex justify-center items-center">
    <pv-card class="w-5/12 h-[80vh] rounded-bl-3xl justify-center">
      <template #header>
        <div class="bg-[#2C3E50] flex justify-items-start items-center rounded-t-2xl sticky top-0 z-10">
          <i class="pi pi pi-clock py-8 px-5 text-white" style="font-size: 1rem;"></i>
          <p class="text-white px-5" style="font-weight: bold;">{{ $t('Specialists.aHours') }}: {{dentistFullName}}</p>
        </div>
      </template>
      <template #content>
        <div class="h-[15vh] overflow-y-auto bg-[#D1F2EB]">
          <form class="py-2 px-6 flex space-x-4 items-center">
            <div class="form-group w-full">
              <label for="date" class="block mb-1"><b>{{ $t('Specialists.date') }}</b></label>
              <pv-inputtext id="date" v-model="date" type="date" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.date')" />
            </div>

            <div class="form-group w-full">
              <label for="startTime" class="block mb-1"><b>{{ $t('Specialists.sTime') }}</b></label>
              <pv-inputtext id="startTime" v-model="startTime" type="time" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.sTime')"/>
            </div>

            <div class="form-group w-full">
              <label for="endTime" class="block mb-1"><b>{{ $t('Specialists.eTime') }}</b></label>
              <pv-inputtext id="endTime" v-model="endTime" type="time" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.eTime')"/>
            </div>

            <div class="form-group">
              <pv-button class="button" @click="insertSchedule">{{ $t('Specialists.add') }}</pv-button>
            </div>
          </form>
        </div>
        <div class="h-[30vh] overflow-y-auto bg-[#D1F2EB] py-1 px-6">
          <b class="ml-1">{{ $t('Specialists.raHours') }}:</b>
          <div v-for="schedule in schedules" :key="schedule.id" class="grid grid-cols-2 gap-6">
            <div class="schedule-container mb-1.5 mt-1.5 flex items-center">
              <pv-button class="mr-2" @click="deleteSchedule(schedule)">
                <i class="pi pi pi-trash text-[#2C3E50]"></i>
              </pv-button>
              <div class="ml-2">
                <p>{{ schedule.weekday }}</p>
                <p>{{ schedule.date }}</p>
                <p>{{ schedule.start_time }} - {{ schedule.end_time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="sticky bottom-0 z-10 bg-[#D1F2EB] py-6 flex justify-center rounded-b-2xl gap-1">
          <pv-button class="button" @click="close">{{ $t('Specialists.ok') }}</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.button {
  border: none;
  border-radius: 30px;
  font-size: 1em;
  font-weight: bold;
  padding: 0.4em 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  background-color: #2C3E50;
  color: white;
}

.sticky {
  position: sticky;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>