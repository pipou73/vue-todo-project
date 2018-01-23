import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import tasks from './modules/tasks'
import groups from './modules/groups'

Vue.use(Vuex)

const state = {
    loading: false,
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        tasks,
        groups
    }
})

// if (module.hot) {
//     module.hot.accept([
//         './getters',
//         './actions',
//         './mutations'
//     ], () => {
//         store.hotUpdate({
//             getters: require('./getters'),
//             actions: require('./actions'),
//             mutations: require('./mutations')
//         })
//     })
// }

export default store