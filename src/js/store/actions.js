import { findById } from '../api/index.js'
import * as type from './mutations-type'
import { getTasksByGrp } from './getters'
/**
 * load store
 * @param {*} param0 
 */
const loadData = ({ commit }) => {
    commit(type.SET_LOADING, true)
    fetch('http://localhost:3000/groups',{
        method: 'GET',
        credentials: 'include',
    })
        .then(r => r.json())
        .then(groups => {
            commit(type.SET_GROUPS, groups)
            fetch('http://localhost:3000/tasks',{
                method: 'GET',
                credentials: 'include',
            })
                .then(r => r.json())
                .then(tasks => {
                    commit(type.SET_TASKS, tasks)
                    commit(type.SET_LOADING, false)
                })
        })
}

/**
 * @param commit
 * @param title
 */
const addTask = ( {commit},  { title, groupId } ) => {
    if (title) {
        commit(type.ADD_TASK, { title, groupId })
    }
}

/**
 * @param commit
 * @param title
 */
const addGroup = ( {commit},  { title } ) => {
    if (title) {
        commit(type.ADD_GROUP, { title })
    }
}

const removeGroup = ({commit, state}, {id}) => {
    if (id) {
        commit(type.REMOVE_GROUP, { id })
        state.tasks.filter(item => {
            return item.group === id
        }).forEach((task) => {
            commit(type.REMOVE_TASK, {id : task.id })
        })
    }
}

/**
 *
 * @param commit
 * @param id
 */
const setCurrentGroup = ({commit, state}, { id }) => {
    let group = findById(state.groups, id)
    if (group) {
        commit(type.SET_CURRENT_GROUP, { id })
    }
}

/**
 * @param commit
 * @param taskId
 */
const completeTask = ({ commit, state }, { id }) => {
    if (id) {
        commit(type.COMPLETED_TASK, { id })
    }

    const tasks = getTasksByGrp(state)({ id }).filter(() => task.completed)
    if (!tasks.length) {
        commit(type.COMPLETED_GROUP, { id })
    }
}

/**
 *
 * @param commit
 */
const clearCompleted = ({ commit }, { groupId }) => {
    commit(type.CLEAR_COMPLETED_TASK, { groupId })
}

/**
 *
 * @param commit
 * @param id
 */
const removeTask = ({ commit }, { id }) => {
    if (id) {
        commit(type.removeTask, { id })
    }
}

const saveTask = ({ commit }, { id }) => {
    commit(type.TOGGLE_TASK_EDIT, { id })
}

const saveTasksByGroup = ({ commit }, { id }) => {
    commit(type.SET_TASKS_BY_GROUP, { id })
}

const saveGroup = ({ commit }, { id }) => {
    commit(type.TOGGLE_GROUP_EDIT, { id })
}

const clearAllEdit = ({commit}) => {
    commit(type.REMOVE_TASK, {  })
}

const clearGroup = ({commit}, { id }) => {
    commit(type.CLEAR_GROUP, { id })
}

const toggleEditTask = ({commit}, { id }) => {
    commit(type.TOGGLE_TASK_EDIT, { id })
}

const toggleEditGroup = ({commit}, { id }) => {
    commit(type.TOGGLE_GROUP_EDIT, { id })
}

export default {
    addTask,
    completeTask,
    removeTask,
    clearCompleted,
    saveTask,
    saveTasksByGroup,
    clearAllEdit,
    addGroup,
    setCurrentGroup,
    removeGroup,
    loadData,
    clearGroup,
    toggleEditTask,
    toggleEditGroup,
    saveGroup
}