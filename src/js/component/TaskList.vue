<template id="task-list">
    <section class="tasks" @click.self="clearAllEdit">
        <h1>
            Tasks
            <transition name="fade">
                <small v-if="incomplete">({{ incomplete }})</small>
            </transition>

        </h1>
        <div class="tasks__new input-group">
            <input type="text"
                   class="input-group-field"
                   v-model="newTask"
                   @keyup.enter="addTask"
                   placeholder="New task"
            >
            <span class="input-group-button">
          <button @click="addTask"
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
                    @click="clearAll"
            >
                <i class="fa fa-trash"></i> Clear All
            </button>
        </div>

        <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
            <task-item v-for="(task, index) in tasks"
                       @remove="removeTask(index)"
                       @complete="completeTask(task)"
                       @edit="toggleEdit(index)"
                       @save="(payload) => { saveTask(payload, index) }"
                       :task="task"
                       :key="index"
            ></task-item>
        </transition-group>
    </section>
</template>

<script>
import Vue from 'vue';
import TaskItem from './taskItem.vue'
import uuidv1 from 'uuid/v1'
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('task-list', {
    name: 'TaskList',
    template: '#task-list',
    data() {
        return {
            newTask: '',
            idTask: null,
            tasks : [
                {
                    id: uuidv1(),
                    title: 'Make todo list',
                    completed: true,
                    edited: false
                },
                {
                    id: uuidv1(),
                    title: 'Go skydiving',
                    completed: false,
                    edited: false
                }
            ]

        };
    },
    components: {
        TaskItem
    },
    computed: {
        incomplete() {
            return this.tasks.filter(this.inProgress).length;
        }
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({
                    id: uuidv1(),
                    title: this.newTask,
                    completed: false,
                    edited: false
                });
                this.newTask = '';
            }
        },
        editTask(task) {
            this.newTask = task.title;
            this.idTask  = task.id;
        },
        completeTask(task) {
            task.completed = !task.completed;
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
        },
        clearCompleted() {
            this.tasks = this.tasks.filter(this.inProgress);
        },
        clearAll() {
            this.tasks = [];
        },
        inProgress(task) {
            return ! this.isCompleted(task);
        },
        isCompleted(task) {
            return task.completed;
        },
        toggleEdit(index) {
            const task = this.tasks[index];
            task.edited = !task.edited;
        },
        saveTask(payload, saveIndex) {
            this.tasks = this.tasks.map((task, index) => {
                if (index === saveIndex) {
                    return { ...task,
                        title: payload.title,
                        edited: payload.edited
                    };
                }

                return task;
            });
        },
        clearAllEdit() {
            this.tasks = this.tasks.forEach((task) => task.edited = false);
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