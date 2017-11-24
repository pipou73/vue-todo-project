<script>
    import Vue from 'vue';
    import App from './component/App.vue'
    import store from './store'

    new Vue({
        el: '#app',
        store: store,
        render: h => h(App),
        components: {
            App
        }
    });
</script>
