<template id="task-item">
    <li class="tasks__item input-group">
        <button v-if="!task.edited" :class="className"
                @click.self="$emit('complete')"
        >
            {{ task.title }}
        </button>
        <button  v-if="!task.edited" class="tasks__item__remove button alert pull-right"
                @click="$emit('remove')"
        >
            <i class="fa fa-times"></i>
        </button>

        <button v-if="!task.completed && !task.edited" class="tasks__item__edit button warning"
                @click="$emit('edit')"
        >
            <i class="fa fa-edit" ></i>
        </button>

        <input v-if="task.edited" type="text"
               class="input-group-field"
               v-model="task.title"
        >
        <div v-if="task.edited" class="input-group-button" >
            <button v-if="!task.completed && !task.edited" class="button warning"
                    @click="$emit('edit')"
            >
                <i class="fa fa-edit" ></i>
            </button>
            <button v-if="task.edited" class="button success"
                    @click="$emit('save', { title: task.title })"
            >
                <i class="fa fa-save" ></i>
            </button>
        </div>
    </li>
</template>

<script>
    import Vue from 'vue';

    export default Vue.component('task-item', {
        name: 'TaskItem',
        template: '#task-item',
        props: ['task'],
        computed: {
            className() {
                let classes = ['tasks__item__toggle'];
                if (this.task.completed) {
                    classes.push('tasks__item__toggle--completed');
                }
                return classes.join(' ');
            }
        },
        methods: {
            sendTask (e, task) {
                this.$emit('save', { title : this.task.title, edited : false });
            }
        }

    });
</script>