<template id="group-item">
    <div>
        <button :class="className" @click.self="$emit('selected')">
            {{ group.title }}
        </button>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default Vue.component('group-item', {
        name: 'group',
        template: '#group-item',
        props: ['group', 'current'],
        computed: {
            className() {
                let classes = ['groups__item__toggle'];
                if (this.current === this.group.id) {
                    classes.push('groups__item__toggle--current');
                }
                return classes.join(' ');
            }
        }
    })
</script>