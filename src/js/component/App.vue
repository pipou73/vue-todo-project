<template>
    <div>
        <groupList></groupList>
        <taskList></taskList>
    </div>
</template>

<script>
    import Vue from 'vue';
    import GroupList from './GroupList.vue';
    import TaskList from './TaskList.vue';

    export default Vue.component('app', {
        components: {
            GroupList,
            TaskList
        }
    });
</script>

<!--<template>-->
    <!--<taskList></taskList>-->
<!--</template>-->

<!--<script>-->
    <!--import Vue from 'vue';-->
    <!--import TaskList from './TaskList.vue';-->

    <!--export default Vue.component('app', {-->
        <!--components: {-->
            <!--TaskList-->
        <!--}-->
    <!--});-->
<!--</script>-->