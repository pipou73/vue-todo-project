<template id="grp-list">
    <section class="groups">
        <h1>
            Group
        </h1>
        <div class="groups__new input-group">
            <input type="text"
                   class="input-group-field"
                   v-model="newGroup"
                   placeholder="New Group"
            >
            <!--@keyup.enter="addGroup"-->
            <span class="input-group-button">
              <button @click="addGroup({ title : newGroup }), clearInput()"
                      class="button"
              >
                <i class="fa fa-plus"></i> Add Group
              </button>
            </span>
        </div>
        <draggable v-model="groups" :options="{draggable:'.groups__item', move: onMoveCallback}">
            <transition-group name="fade" tag="ul" class="groups__list no-bullet">
                <group-item v-for="(group, index) in groups"
                            @remove="removeGroup({ id : group.id })"
                            @selected="setCurrentGroup({ id : group.id })"
                            :current="getCurrentGroup()"
                            :group="group"
                            :key="index"
                ></group-item>
            </transition-group>
        </draggable>
        <div v-if="!!currentGroup" >
            <task-list :group="currentGroup"></task-list>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import TaskList from './TaskList.vue'
import GroupItem from './GrpItem.vue'
import uuidv1 from 'uuid/v1'
import store from '../store/index'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default Vue.component('grp-list', {
    name: 'GrpList',
    template: '#grp-list',
    store,
    data() {
        return {
            newGroup: '',
        };
    },
    components: {
        draggable,
        GroupItem,
        TaskList
    },
    computed: {
        ...mapGetters({
            inComplete: 'incomplete',
            currentGroup: 'getCurrentGroup'
        }),
        groups: {
            get() {
                return this.getGroups()
            },
            set(value) {
                this.$store.commit('updateGroupList', value)
            }
        }
    },
    methods: {
        ...mapActions([ 'addGroup', 'setCurrentGroup']),
        ...mapGetters([ 'getCurrentGroupName', 'getGroups', 'getCurrentGroup']),
        ...mapMutations([ 'clearAllByGroup']),
        clearInput () {
            this.newGroup = '';
        },
        onMoveCallback(evt, originalEvent){
            // return false; — for cancel
            console.log('evt', evt)
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