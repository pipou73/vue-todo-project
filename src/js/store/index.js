import Vue from 'vue'
import Vuex from 'vuex'
import uuidv1 from 'uuid/v1'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import * as getters from './getters'
// import * as actions from './actions'
// import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
    currentGroup: '7ec00e82-d41f-11e7-a0e4-4dd6ca4d2af5',
    tasks: [
        {
            id: uuidv1(),
            title: 'Faire les courses',
            completed: true,
            edited: false,
            group: '7ec00e82-d41f-11e7-a0e4-4dd6ca4d2af5',
            position: 0
        },
        {
            id: uuidv1(),
            title: 'Faire le menage',
            completed: false,
            edited: false,
            group: '7ec00e82-d41f-11e7-a0e4-4dd6ca4d2af5',
            position: 1
        }
    ],
    groups: [
        {
            id: '7ec00e82-d41f-11e7-a0e4-4dd6ca4d2af5',
            title: 'Lundi',
            edited: false,
            show: true
        },
        {
            id: uuidv1(),
            title: 'Mardi',
            edited: false,
            show: false
        },
        {
            id: uuidv1(),
            title: 'Mercredi',
            edited: false,
            show: false
        },
        {
            id: uuidv1(),
            title: 'Jeudi',
            edited: false,
            show: false
        },
        {
            id: uuidv1(),
            title: 'Vendredi',
            edited: false,
            show: false
        }
    ]
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