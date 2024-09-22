import {createRouter, createWebHistory} from "vue-router";
import loginComponent from "../Dentify/components/Access/login.component.vue";
import registerComponent from "../Dentify/components/Access/register.component.vue";
import homeComponent from "../Dentify/components/Home/home.component.vue";
import notFoundComponent from "../public/not-found.component.vue";
import dashboardComponent from "../Dentify/components/user/dashboard.component.vue";
import supportComponent from "../Dentify/components/Home/support.component.vue";

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: "/login", component: loginComponent
            },
            {
                path: "/register", component: registerComponent
            },
            {
                path: "/home", component: homeComponent
            },
            {
                path: "/dashboard", component: dashboardComponent
            },
            {
              path: "/support", component: supportComponent
            },
            {
                path: "/:pathMatch(.*)*", // Captura todas las rutas no definidas
                name: "NotFound",
                component: notFoundComponent // Componente para mostrar el error 404
            }

        ]
    }
)

export default router;