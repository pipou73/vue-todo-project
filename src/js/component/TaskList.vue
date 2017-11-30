<template id="task-list">
    <section class="tasks" @click.self="clearAllEdit">
        <div class="tasks__new input-group">
            <input type="text"
                class="input-group-field"
                v-model="newTask"
                @keyup.enter="addTask({ title : newTask, groupId : group.id })"
                placeholder="New task"
            >
            <span class="input-group-button">
                <button
                        @click="addTask({ title : newTask, groupId : group.id }), clearInput()"
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
                    @click="clearAllByGroup({groupId : group.id})"
            >
                <i class="fa fa-trash"></i> Clear All
            </button>
        </div>
        <draggable v-model="tasks" :options="{draggable:'.tasks__item'}" :end="onMoveCallback">
            <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
                <task-item v-for="(task, index) in tasks"
                           @remove="removeTask({ id : task.id })"
                           @complete="completeTask({ id : task.id })"
                           @edit="toggleTaskEdit({ id : task.id })"
                           @save="(payload) => {saveTask({ payload, id : task.id })}"
                           :task="task"
                           :key="index"
                ></task-item>
            </transition-group>
        </draggable>
    </section>
</template>
<script>
    import Vue from 'vue';
    import TaskItem from './TaskItem.vue'
    import uuidv1 from 'uuid/v1'
    import store from '../store/index'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import draggable from 'vuedraggable'

    export default Vue.component('task-list', {
        name: 'TaskList',
        template: '#task-list',
        store,
        components: {
            TaskItem,
            draggable,
        },
        data() {
            return {
                newTask: '',
            };
        },
        props: ['group'],
        computed: {
            ...mapGetters({
                inComplete: 'incomplete',
            }),
            tasks: {
                get() {
                    return this.$store.getters.getTasksByGrp({...this.group})
                },
                set(value) {
                    this.pushTasksPosition({ tasks : value});
                }
            }
        },
        methods: {
            ...mapActions([ 'addTask', 'completeTask', 'removeTask', 'clearCompleted', 'saveTask', 'clearAllEdit', 'pushTasksPosition']),
            ...mapGetters([ 'getTasksByGrp', 'inProgress', 'isCompleted', 'getCurrentGroupName']),
            ...mapMutations([ 'clearAll', 'toggleTaskEdit', 'clearAllByGroup']),
            clearInput () {
                this.newTask = '';
            },
            onMoveCallback(evt, originalEvent){
                // return false; — for cancel
                console.log('evt', evt)
            },
            checkMove: function(evt){
                return (evt.draggedContext.element.name!=='apple');
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