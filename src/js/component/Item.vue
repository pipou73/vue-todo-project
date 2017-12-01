<template id="item">
    <li :class="className('__item input-group')">
        <button v-if="!item.edited"
                :class="addClass('__item__toggle')"
                @click.self="$emit('complete')"
        >
            {{ item.title }}
        </button>
        <button  v-if="!item.edited" :class="className('__item__remove button alert pull-right')"
                 @click="$emit('remove')"
        >
            <i class="fa fa-times"></i>
        </button>

        <button v-if="!item.completed && !item.edited" :class="className('__item__edit button warning')"
                @click="$emit('edit')"
        >
            <i class="fa fa-edit" ></i>
        </button>

        <input v-if="item.edited" type="text"
               class="input-group-field"
               v-model="item.title"
        >
        <div v-if="item.edited" class="input-group-button" >
            <button v-if="!item.completed && !item.edited" class="button warning"
                    @click="$emit('edit')"
            >
                <i class="fa fa-edit" ></i>
            </button>
            <button v-if="item.edited" class="button success"
                    @click="$emit('save', { title: item.title })"
            >
                <i class="fa fa-save" ></i>
            </button>
        </div>
    </li>
</template>

<script>
    import Vue from 'vue';

    export default Vue.component('item', {
        name: 'Item',
        template: '#item',
        props: ['item', 'base'],
        methods: {
            sendTask (e, item) {
                this.$emit('save', { title : this.item.title, edited : false });
            },
            className(cls) {
                let classes = [];
                classes.push(this.base + cls);

                return classes.join(' ');
            },
            addClass(cls) {
                let classes = [];
                classes.push(this.className(cls));

                if (this.item.show) {
                    classes.push(this.base + '__item__toggle--selected');
                }

                if (this.item.completed) {
                    classes.push(this.base + '__item__toggle--completed');
                }

                return classes.join(' ');
            }
        }

    });
</script>