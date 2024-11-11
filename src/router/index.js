
import { createRouter, createWebHistory } from "vue-router";
import loginComponent from "../Dentify/components/Access/pages/login.page.vue";
import registerComponent from "../Dentify/components/Access/pages/register.page.vue";
import homeComponent from "../Dentify/components/Home/page/home.component.vue";
import notFoundComponent from "../public/not-found.component.vue";
import dashboardComponent from "../Dentify/components/Home/Dashboard/pages/dashboard.page.vue";
import supportComponent from "../Dentify/components/Home/Support/support.component.vue";
import profileOverlayComponent from "../Dentify/components/Home/Profile/pages/profile-overlay.page.vue";
import paymentsComponent from "../Dentify/components/Home/Payments/pages/payments.page.vue";
import paymentsAppointmentsComponent from "../Dentify/components/Home/Payments/pages/payments-appointments.page.vue";

import profileOverlaySettingsPage from "../Dentify/components/Home/Profile/pages/profile-overlay-settings.page.vue";
import profileOverlayEditInformationPage from "../Dentify/components/Home/Profile/pages/profile-overlay-edit-information.page.vue";
import profileOverlayChangePasswordPage from "../Dentify/components/Home/Profile/pages/profile-overlay-change-password.page.vue";
import patientsPage from "../Dentify/components/Home/Patients/pages/patients.page.vue";
import paymentsInvoicePage from "../Dentify/components/Home/Payments/pages/payments-invoice.page.vue";


import dentistsPage from "../Dentify/components/Home/Dentists/pages/dentists-page.vue";

import inventoryComponent from "../Dentify/components/Home/Inventory/page/inventory.page.vue";

import appointmentCardComponent from "../Dentify/components/Home/Appointments/components/appointment-card.component.vue";
import reportsPage from "../Dentify/components/Home/Reports/pages/reports.page.vue";

import validationStore from "../shared/stores/validation-store.js";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/", redirect: "/register"
        },
        {
            path: "/login", component: loginComponent, name: "login"
        },
        {
            path: "/register", component: registerComponent, name: "register"
        },
        {
            path: "/home", component: homeComponent, name: "home",
            children: [
                {
                    path: "dashboard",
                    component: dashboardComponent
                },
                {
                    path:"reports",
                    component: reportsPage,
                    beforeEnter: (to, from, next) => {

                        if (validationStore.getters.isTrialUser) {
                            next("/home/dashboard");
                        } else {
                            next();
                        }
                    },
                },
                {
                    path: "support",
                    component: supportComponent
                },
                {
                    path: "profile",
                    component: profileOverlayComponent
                },
                {
                    path: "profileSettings", component: profileOverlaySettingsPage, name: "profileSettings",
                },
                {
                    path: "profileEditInformation", component: profileOverlayEditInformationPage, name: "profileEditInformation",
                },
                {
                    path: "profileChangePassword", component: profileOverlayChangePasswordPage, name: "profileChangePassword",
                },
                {
                    path: "appointments", component: appointmentCardComponent
                },
                {
                    path: "inventory", component: inventoryComponent
                },
                {

                    path: "/home/payments",
                    component: paymentsComponent,
                    children: [
                        {
                            path: "appointments",
                            component: paymentsAppointmentsComponent,
                        },
                        {
                            path: "invoices",
                            component:paymentsInvoicePage,
                        }
                    ]
                },
               {

                    path:"patients", component: patientsPage

               },
                {
                    path:"specialists", component: dentistsPage
                }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: notFoundComponent
        }
    ]
});

export default router;
