<template id="group-list">
    <section class="groups">
        <h1>
            Group
            <!--<transition name="fade">-->
            <!--<small v-if="incomplete">({{ incomplete }})</small>-->
            <!--</transition>-->
        </h1>
        <div class="groups__new input-group">
            <input type="text"
                   class="input-group-field"
                   v-model="newGroup"
                   placeholder="New Group"
            >
            <!--@keyup.enter="addGroup"-->
            <span class="input-group-button">
              <button @click="addGroup({ title : newGroup }), clearNewGroup()"
                      class="button"
              >
                <i class="fa fa-plus"></i> Add Group
              </button>
            </span>
        </div>
        <transition-group name="fade" tag="ul" class="groups__list no-bullet">
            <group-item v-for="(group, index) in getGroups()"
                       @remove="removeGroup({ id : group.id })"
                       @selected="setCurrentGroup({ id : group.id })"
                       :current="getCurrentGroup()"
                       :group="group"
                       :key="index"
            ></group-item>
        </transition-group>
    </section>
</template>

<script>
    import Vue from 'vue';
    import uuidv1 from 'uuid/v1'
    import { mapGetters, mapActions } from 'vuex'
    import GroupItem from './GroupItem.vue'
    import store from '../store/index.js'
    export default Vue.component('group-list', {
        name: 'GroupList',
        template: '#group-list',
        store,
        data() {
            return {
                newGroup: '',
            };
        },
        methods: {
            ...mapGetters(['getGroups', 'getCurrentGroup']),
            ...mapActions(['addGroup', 'setCurrentGroup']),
            clearNewGroup() {
                this.newGroup = '';
            }
        },
        components: {
            GroupItem
        },
    });

</script>

<style>
    .groups {
        width: 100%;
        max-width: 45rem;
        padding: 1em;
        margin: 1em auto;
        overflow: auto;
        background-color: #fff;
        box-shadow: 0px 0.25rem 1rem rgba(0,0,0,0.25);
    }
    .groups__list {
        clear: both;
    }
</style>