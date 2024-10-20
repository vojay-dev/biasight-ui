import {createApp} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import VueKinesis from 'vue-kinesis'

createApp(App).use(router).use(VueGtag, {
    config: {
        id: "G-BVZ5HDLB41",
        params: {
            anonymize_ip: true
        }
    }
}, router).use(VueKinesis).mount('#app')
