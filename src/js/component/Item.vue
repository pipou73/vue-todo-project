<template>
    <li :class="className('list-group-item pointer margin-bottom-4')">
        <div style="float: right">
            <button  v-if="!item.edited" class="btn btn-xs btn-danger pull-right margin-left-4"
                     @click="$emit('remove')"
            >
                <i class="fa fa-times"></i>
            </button>
            <button v-if="!item.completed && item.edited" class="btn btn-xs btn-warning margin-left-4"
                    @click="$emit('toggleEdit')"
            >
                <i class="fa fa-edit" ></i>
            </button>
            <button v-if="!item.completed && !item.edited" class="btn btn-xs btn-warning margin-left-4"
                    @click="$emit('toggleEdit')"
            >
                <i class="fa fa-edit" ></i>
            </button>
            <button v-if="item.edited" class="btn btn-xs btn-success margin-left-4"
                    @click="$emit('save', { payload: item.title})"
            >
                <i class="fa fa-save" ></i>
            </button>
        </div>
        <div v-if="!item.edited" @click.self="$emit('selected');" >
            {{ item.title }}
        </div>
        <input v-if="item.edited" type="text"
               class="form-control"
               style="width: 85% !important"
               v-model="item.title"
        >
    </li>
</template>
<script>
    export default {
        name: 'Item',
        template: '#item',
        props: ['item', 'isSelected', 'addClass'],
        methods: {
            sendTask (e, item) {
                this.$emit('save', { title : this.item.title, edited : false });
            },
            className(cls) {
                if (this.isSelected) {
                    return cls + ' ' + this.addClass;
                }
                return cls;
            }
        }
    };
</script>