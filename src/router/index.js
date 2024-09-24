
import { createRouter, createWebHistory } from "vue-router";
import loginComponent from "../Dentify/components/Access/login.component.vue";
import registerComponent from "../Dentify/components/Access/register.component.vue";
import homeComponent from "../Dentify/components/Home/home.component.vue";
import notFoundComponent from "../public/not-found.component.vue";
import dashboardComponent from "../Dentify/components/Home/user/dashboard.component.vue";
import supportComponent from "../Dentify/components/Home/support.component.vue";
import profileOverlayComponent from "../Dentify/components/Home/Profile/profile-overlay.component.vue";
import reservationComponent from "../Dentify/components/Home/Reservation/reservation.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login", component: loginComponent
        },
        {
            path: "/register", component: registerComponent
        },
        {
            path: "/home", component: homeComponent,
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
