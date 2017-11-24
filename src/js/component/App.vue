<template>
    <taskList></taskList>
</template>

<script>
    import Vue from 'vue';
    import TaskList from './TaskList.vue';

    export default Vue.component('app', {
        components: {
            TaskList
        }
    });
</script>