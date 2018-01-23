<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 groups">
                <div class="col-md-12">
                    <h1>
                        Group
                    </h1>
                </div>
                <br><br>
                <div class="col-md-12">
                    <div class="input-group">
                        <input type="text"
                               class="form-control"
                               v-model="newGroup"
                               placeholder="Add Group"
                               @keyup.enter="addGroup({ title : newGroup }); clearInput();"
                        >
                        <span class="input-group-btn">
                            <button @click="addGroup({ title : newGroup }); clearInput();"
                                    class="btn btn-primary"
                                    type="button"
                            >
                            <i class="fa fa-plus">New Group</i>
                        </button>
                        </span>
                    </div>
                </div>
                <br><br>
                <draggable v-model="groups" :options="{draggable:'.list-group-item'}" class="col-md-12 margin-top-4">
                    <transition-group name="fade" tag="ul" class="list-group no-bullet">
                        <item v-for="(group, index) in groups"
                                    @remove="removeGroup({ id : group.id })"
                                    @selected="setCurrentGroup({ id : group.id })"
                                    @toggleEdit="toggleEditGroup({ id : group.id })"
                                    @save="(payload) => {saveGroup({ payload, id : group.id })}"
                                    :item="group"
                                    :isSelected="group === currentGroup"
                                    :addClass="'list-group-item-success'"
                                    :key="index"
                        ></item>
                    </transition-group>
                </draggable>
            </div>
            <div class="col-md-6">
                <div v-if="currentGroup" class="tasks">
                    <task-list
                    :group="currentGroup"
                    :tasksList="getTasksByGroup(currentGroup)"
                    ></task-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import TaskList from './TaskList.vue'
import Item from './Item.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import * as types from '../store/types'

export default {
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
        this.loadData()
    },
    computed: {
        ...mapGetters({
            currentGroup: types.GET_CURRENT_GROUP
        }),
        groups: {
            get() {
                return this.getGroups()
            },
            set(value) {
                this.setGroups({ groups : value})
            }
        }
    },
    methods: {
        ...mapActions({
            addGroup: types.ADD_GROUP,
            setCurrentGroup: types.SET_CURRENT_GROUP,
            removeGroup: types.REMOVE_GROUP,
            loadData:  types.LOADING_DATA,
            clearGroup: types.CLEAR_TASKS_BY_GROUP,
            toggleEditGroup: types.TOGGLE_EDIT_GROUP ,
            saveGroup: types.UPDATE_GROUP ,
            saveTasksByGroup: types.SAVE_TASKS_BY_GROUP,
            setGroups: types.SET_GROUPS
        }),
        ...mapGetters({
            isLoading: types.IS_LOADING,
            getCurrentGroupName: types.GET_CURRENT_GROUP_NAME,
            getGroups: types.GET_GROUPS,
            getCurrentGroup: types.GET_CURRENT_GROUP,
            getTasksByGrp: types.GET_TASKS_BY_GROUP
        }),
        clearInput () {
            this.newGroup = '';
        },
        getTasksByGroup(group) {
            return this.getTasksByGrp()({ ...group })
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
        box-shadow: 0px 0.25rem 1rem rgba(0,0,0,0.25);
    }
    .tasks__list {
        clear: both;
    }
</style>