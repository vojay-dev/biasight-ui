import {createApp} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import VueKinesis from 'vue-kinesis'
import mitt from "mitt";

const app = createApp(App)

// setup event bus
const emitter = mitt()
app.provide('emitter', emitter)

// setup and mount app
app
    .use(router)
    .use(VueGtag, {
        config: {
            id: "G-BVZ5HDLB41",
            params: {
                anonymize_ip: true
            }
        }
    }, router)
    .use(VueKinesis)
    .mount('#app')
