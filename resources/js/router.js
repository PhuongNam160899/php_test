import Order from './page/order.vue';

import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: Order,
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
