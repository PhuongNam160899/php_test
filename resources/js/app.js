import './bootstrap';
import router from '../../resources/js/router';
import index from './page/index.vue';
import {createApp} from "vue";
//element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(index)
    .use(router)
    .use(ElementPlus)
    .mount("#app");