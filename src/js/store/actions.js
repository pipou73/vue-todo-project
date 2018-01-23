import * as types from './types'
/**
 * populate store
 * @param commit
 */
const loadData = ({ commit }) => {
    commit(types.MUTATE_SET_LOADING, true)
    fetch('http://localhost:3000/groups',{
        method: 'GET',
        credentials: 'include',
    })
        .then(r => r.json())
        .then(groups => {
            commit(types.MUTATE_SET_GROUPS, { groups: [...groups] })
            fetch('http://localhost:3000/tasks',{
                method: 'GET',
                credentials: 'include',
            })
                .then(r => r.json())
                .then(tasks => {
                    commit(types.MUTATE_SET_TASKS,  { tasks: [...tasks]})
                    commit(types.MUTATE_SET_LOADING, { loading: false })
                })
        })
}

export default {
    [types.LOADING_DATA]: ({ commit }) => { loadData({ commit }) },
}