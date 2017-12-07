import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import * as getters from './getters'
// import * as actions from './actions'
// import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
    loading: false,
    currentGroup: '7ec00e82-d41f-11e7-a0e4-4dd6ca4d2af5',
    tasks: [],
    groups: []
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
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