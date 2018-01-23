<template>
    <div @click.self="clearAllEdit">
        <div class="col-md-12">
            <div class="input-group">
                <input type="text"
                       class="form-control"
                       v-model="newTask"
                       @keyup.enter="addTask({ title : newTask, groupId : group.id }); clearInput();"
                       placeholder="New task"
                >
                <span class="input-group-btn">
                    <button
                        @click="addTask({ title : newTask, groupId : group.id }); clearInput();"
                        class="btn btn-primary"
                    >
                        <i class="fa fa-plus"></i> Add
                    </button>
                </span>
            </div>
        </div>
        <br><br>
        <div class="col-md-12">
            <div class="btn-group pull-right">
                <button type="button" class="btn btn-warning btn-sm"
                        @click="clearCompleted({groupId : group.id})"
                >
                    <i class="fa fa-check"></i> Clear Completed
                </button>
                <button type="button" class="btn btn-danger btn-sm"
                        @click="clearTasksGroup({groupId : group.id})"
                >
                    <i class="fa fa-trash"></i> Clear All
                </button>
            </div>
        </div>
        <br><br>
        <draggable v-model="tasks" :options="{draggable:'.tasks__item'}" class="col-md-12">
            <transition-group name="fade" tag="ul" class="list-group no-bullet">
                <item v-for="(task, index) in tasks"
                      @remove="removeTask({ id : task.id })"
                      @selected="completeTask({ id : task.id })"
                      @toggleEdit="toggleEditTask({ id : task.id })"
                      @save="(payload) => {saveTask({ payload, id : task.id })}"
                      :item="task"
                      :isSelected="task.completed"
                      :addClass="'list-group-item-danger text-line-through'"
                      :key="index"
                ></item>
            </transition-group>
        </draggable>
    </div>
</template>
<script>
    import Item from './Item.vue'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import draggable from 'vuedraggable'
    import * as types from '../store/types'

    export default {
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
                    this.saveTasks({tasks: value});
                }
            }
        },
        methods: {
            ...mapActions({
                addTask: types.ADD_TASK,
                completeTask: types.COMPLETED_TASK,
                removeTask: types.REMOVE_TASK,
                clearCompleted: types.CLEAR_COMPLETED_TASK,
                saveTask: types.UPDATE_TASK,
                saveTasks: types.SAVE_TASKS_BY_GROUP,
                toggleEditTask: types.TOGGLE_EDIT_TASK
            }),
            ...mapGetters({
                getTasksByGrp: types.GET_TASKS_BY_GROUP,
                getCurrentGroupName: types.GET_CURRENT_GROUP_NAME
            }),
            ...mapMutations({
                clearTasksGroup: types.MUTATE_CLEAR_GROUP
            }),
            clearInput () {
                this.newTask = '';
            }
        }
    };

</script>

<style>
    .tasks {
        width: 100%;
        max-width: 45rem;
        padding: 1em;
        margin: 1em auto;
        overflow: auto;
        background-color: #fff;
        box-shadow: 0px 0.25rem 1rem rgba(0, 0, 0, 0.25);
    }

    .tasks__list {
        clear: both;
    }
</style>