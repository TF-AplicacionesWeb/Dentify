
import { createRouter, createWebHistory } from "vue-router";
import loginComponent from "../Dentify/components/Access/pages/login.page.vue";
import registerComponent from "../Dentify/components/Access/pages/register.page.vue";
import homeComponent from "../Dentify/components/Home/page/home.component.vue";
import notFoundComponent from "../public/not-found.component.vue";
import dashboardComponent from "../Dentify/components/Home/Dashboard/pages/dashboard.page.vue";
import supportComponent from "../Dentify/components/Home/Support/support.component.vue";
import profileOverlayComponent from "../Dentify/components/Home/Profile/pages/profile-overlay.page.vue";
import reservationComponent from "../Dentify/components/Home/Reservation/pages/reservation.page.vue";

import profileOverlaySettingsPage from "../Dentify/components/Home/Profile/pages/profile-overlay-settings.page.vue";
import profileOverlayEditInformationPage from "../Dentify/components/Home/Profile/pages/profile-overlay-edit-information.page.vue";
import profileOverlayChangePasswordPage from "../Dentify/components/Home/Profile/pages/profile-overlay-change-password.page.vue";
import patientsPage from "../Dentify/components/Home/Patients/pages/patients.page.vue";

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
                    path: "support",
                    component: supportComponent
                },
                {
                    path: "profile",
                    component: profileOverlayComponent
                },
                {
                    path: "appointments", component: reservationComponent
                },
                {
                    path:"patients", component: patientsPage
                }
            ]
        },
        {
            path: "/profileSettings", component: profileOverlaySettingsPage, name: "profileSettings",
        },
        {
            path: "/profileEditInformation", component: profileOverlayEditInformationPage, name: "profileEditInformation",
        },
        {
            path: "/profileChangePassword", component: profileOverlayChangePasswordPage, name: "profileChangePassword",
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: notFoundComponent
        }
    ]
});

export default router;
