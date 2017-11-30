<script>
    import Vue from 'vue';
    import App from './component/App.vue'
//    import Draggable from './directive/draggable.js'
//    import Dropzone from './directive/dropzone.js'
//
//    Vue.directive('draggable', Draggable)
//    Vue.directive('dropzone', Dropzone)

    new Vue({
        el: '#app',
        render: h => h(App),
        components: {
            App
        }
    });
</script>
