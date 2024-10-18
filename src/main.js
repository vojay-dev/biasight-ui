import {createApp} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import VueGtag from "vue-gtag"
import VueKinesis from 'vue-kinesis'

createApp(App).use(router).use(VueGtag, {
    config: {
        id: "G-C3F9PD7XWL",
        params: {
            anonymize_ip: true
        }
    }
}, router).use(VueKinesis).mount('#app')
