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
                   @keyup.enter="addGroup({ title : newGroup }); clearInput();"
            >
            <!--@keyup.enter="addGroup"-->
            <span class="input-group-button">
              <button @click="addGroup({ title : newGroup }); clearInput();"
                      class="button"
              >
                <i class="fa fa-plus"></i> Add Group
              </button>
            </span>
        </div>
        <div  class="container">
            <div class="row">
                <div class="col-md-6">
                    <draggable v-model="groups" :options="{draggable:'.groups__item'}">
                        <transition-group name="fade" tag="ul" class="groups__list no-bullet">
                            <item v-for="(group, index) in groups"
                                        @remove="removeGroup({ id : group.id })"
                                        @selected="setCurrentGroup({ id : group.id })"
                                        @clear="clearGroup({id : group.id})"
                                        @toggleEdit="toggleEditGroup({ id : group.id })"
                                        @save="(payload) => {saveGroup({ payload, id : group.id })}"
                                        :item="group"
                                        :base="'groups'"
                                        :key="index"
                            ></item>
                        </transition-group>
                    </draggable>
                </div>
                <div class="col-md-6">
                    <div v-if="currentGroup" >
                        <task-list
                        :group="currentGroup"
                        :tasksList="getTasksByGroup(currentGroup)"
                        ></task-list>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import TaskList from './TaskList.vue'
import Item from './Item.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default Vue.component('grp-list', {
    name: 'GrpList',
    template: '#grp-list',
    data() {
        return {
            newGroup: '',
        };
    },
    components: {
        draggable,
        Item,
        TaskList
    },
    created () {
        this.$store.dispatch('loadData')
    },
    computed: {
        ...mapGetters({
            currentGroup: 'getCurrentGroup'
        }),
        groups: {
            get() {
                return this.getGroups()
            },
            set(value) {
                this.$store.commit(' setTasksByGroup', value)
            }
        }
    },
    methods: {
        ...mapActions([
            'addGroup',
            'setCurrentGroup',
            'removeGroup',
            'loadData',
            'clearGroup',
            'toggleEditGroup',
            'saveGroup',
            'saveTasksByGroup'
        ]),
        ...mapGetters([
            'isLoading',
            'getCurrentGroupName',
            'getGroups',
            'getCurrentGroup',
            'getTasksByGrp'
        ]),
        clearInput () {
            this.newGroup = '';
        },
        getTasksByGroup(group) {
            return this.getTasksByGrp()({ ...group })
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