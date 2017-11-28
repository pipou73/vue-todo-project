<template id="task-list">
    <section class="tasks" @click.self="clearAllEdit">
        <h1>
            Tasks
            <transition name="fade">
                <small v-if="inComplete">({{ inComplete }})</small>
            </transition>
            - {{ getCurrentGroupName() }}
        </h1>
        <div class="tasks__new input-group">
            <input type="text"
                   class="input-group-field"
                   v-model="newTask"
                   @keyup.enter="addTask({ title : newTask })"
                   placeholder="New task"
            >
            <span class="input-group-button">
          <button @click="addTask({ title : newTask }), clearInput()"
                  class="button"
          >
            <i class="fa fa-plus"></i> Add
          </button>
        </span>
        </div>

        <div class="tasks__clear button-group pull-right">
            <button class="button warning small"
                    @click="clearCompleted"
            >
                <i class="fa fa-check"></i> Clear Completed
            </button>
            <button class="button alert small"
                    @click="clearAllByGroup"
            >
                <i class="fa fa-trash"></i> Clear All
            </button>
        </div>

        <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
            <task-item v-for="(task, index) in getTasks()"
                       @remove="removeTask({ id : task.id })"
                       @complete="completeTask({ id : task.id })"
                       @edit="toggleTaskEdit({ id : task.id })"
                       @save="(payload) => {saveTask({ payload, id : task.id })}"
                       :task="task"
                       :key="index"
            ></task-item>
        </transition-group>
    </section>
</template>
<!--@save="(payload) => { saveTask(payload, index) }"-->
<script>
import Vue from 'vue';
import TaskItem from './taskItem.vue'
import uuidv1 from 'uuid/v1'
import store from '../store/index'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default Vue.component('task-list', {
    name: 'TaskList',
    template: '#task-list',
    store,
    data() {
        return {
            newTask: '',
            idTask: null,
        };
    },
    components: {
        TaskItem
    },
    computed: {
        ...mapGetters({
            inComplete: 'incomplete',
        })
    },
    methods: {
        ...mapActions([ 'addTask', 'completeTask', 'removeTask', 'clearCompleted', 'saveTask', 'clearAllEdit']),
        ...mapGetters([ 'getTasks', 'inProgress', 'isCompleted', 'getCurrentGroupName']),
        ...mapMutations([ 'clearAll', 'toggleTaskEdit', 'clearAllByGroup']),
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