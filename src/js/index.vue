<script>
    import Vue from 'vue';
    import taskList from './taskList.vue'
//    import taskList from './taskList.vue'


    new Vue({
        el: '#app',
        data: {
            tasks: [
                {
                    title: 'Make todo list',
                    completed: true
                },
                {
                    title: 'Go skydiving',
                    completed: false
                }
            ]
        },
        components: {
            'task-list': taskList
        }
    });
</script>
