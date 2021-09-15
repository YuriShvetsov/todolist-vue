import { createApp } from 'vue'
import App from './components/App.vue'
import CustomSelect from './components/CustomSelect.vue'
import store from './store'

const app = createApp(App)

app.component('CustomSelect', CustomSelect)
app.use(store)

app.mount('#app')
