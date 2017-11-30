<template id="group-item">
    <div class="groups__item" >
        <button :class="className" @click.self="$emit('selected')">
            {{ group.title }}
        </button>

    </div>
</template>
<script>
    import Vue from 'vue';
    import store from '../store/index'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default Vue.component('group-item', {
        name: 'group',
        store,
        template: '#group-item',
        props: ['group'],
        computed: {
            ...mapGetters([ 'getTasks', 'getTasksByGrp']),
            className() {
                let classes = ['groups__item__toggle'];
                if (this.group.show) {
                    classes.push('groups__item__toggle--selected');
                }
                const tasks = this.getTasksByGrp({...this.group})
                if (tasks.length > 0 && !tasks.filter((task) => !task.completed).length) {
                    classes.push('groups__item__toggle--completed');
                }
                return classes.join(' ');
            }
        }
    })
</script>