<template id="task-list">
    <section class="tasks" @click.self="clearAllEdit">
        <div class="tasks__new input-group">
            <input type="text"
                class="input-group-field"
                v-model="newTask"
                @keyup.enter="addTask({ title : newTask, groupId : group.id }); clearInput();"
                placeholder="New task"
            >
            <span class="input-group-button">
                <button
                        @click="addTask({ title : newTask, groupId : group.id }); clearInput();"
                        class="button"
                >
                    <i class="fa fa-plus"></i> Add
                </button>
            </span>
        </div>
        <div class="tasks__clear button-group pull-right">
            <button class="button warning small"
                    @click="clearCompleted({groupId : group.id})"
            >
                <i class="fa fa-check"></i> Clear Completed
            </button>
            <button class="button alert small"
                    @click="$emit('clear', {id : task.id})"
            >
                <i class="fa fa-trash"></i> Clear All
            </button>
        </div>
        <draggable v-model="tasks" :options="{draggable:'.tasks__item'}" >
            <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
                <item v-for="(task, index) in tasks"
                           @remove="removeTask({ id : task.id })"
                           @selected="completeTask({ id : task.id })"
                           @toggleEdit="toggleEditTask({ id : task.id })"
                           @save="(payload) => {saveTask({ payload, id : task.id })}"
                           :item="task"
                           :base="'tasks'"
                           :key="index"
                ></item>
            </transition-group>
        </draggable>
    </section>
</template>
<script>
    import Vue from 'vue';
    import Item from './Item.vue'
    import { mapGetters, mapActions } from 'vuex'
    import draggable from 'vuedraggable'

    export default Vue.component('task-list', {
        name: 'TaskList',
        template: '#task-list',
        components: {
            Item,
            draggable,
        },
        data() {
            return {
                newTask: '',
            };
        },
        props: ['group', 'tasksList'],
        computed: {
            tasks: {
                get() {
                    return this.tasksList;
                },
                set(value) {
                    this.saveTasks({ tasks : value});
                }
            }
        },
        methods: {
            ...mapActions([
                'addTask',
                'completeTask',
                'removeTask',
                'clearCompleted',
                'saveTask',
                'saveTasks',
                'clearAllEdit',
                'toggleEditTask'
            ]),
            ...mapGetters([
                'getTasksByGrp',
                'inProgress',
                'isCompleted',
                'getCurrentGroupName'
            ]),
            clearInput () {
                this.newTask = '';
            }
        }
    });

</script>

<style>
    .tasks {
        width: 100%;
        max-width: 45rem;
        padding: 1em;
        margin: 1em auto;
        overflow: auto;
        background-color: #fff;
        box-shadow: 0px 0.25rem 1rem rgba(0,0,0,0.25);
    }
    .tasks__list {
        clear: both;
    }
</style>