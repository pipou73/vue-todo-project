import uuidv1 from 'uuid/v1'
import { findById } from '../api/index.js'
import * as type from './mutations-type'

/**
 * set todos
 * @param {*} state 
 * @param {*} todos 
 */
const setTasks = (state, tasks) => {
    state.tasks = tasks
}

/**
 * set todos
 * @param {*} state 
 * @param {*} todos 
 */
const setGroups = (state, groups) => {
    state.groups = groups
}
/**
 * 
 * @param {*} state 
 * @param {*} loading 
 */
const setLoading = (state, loading) => {
    state.loading = loading
}

/**
 *
 * @param state
 * @param title
 */
const addTask = (state, {title, groupId}) => {
    state.tasks.push({
        id: uuidv1(),
        title: title,
        completed: false,
        edited: false,
        group: groupId,
        position: (state.tasks.filter((task) => task.group === groupId).length + 1)
    })
}

/**
 *
 * @param state
 * @param title
 */
const addGroup = (state, {title}) => {
    state.groups.push({
        id: uuidv1(),
        title: title,
        edited: false,
        show: false
    })
}

/**
 *
 * @param state
 * @param id
 */
const removeTask = (state, { id }) => {
    const index = state.tasks.findIndex((task) => (task.id === id))
    state.tasks.splice(index, 1)
}
/**
 *
 * @param state
 * @param id
 */
const removeGroup = (state, { id }) => {
    const index = state.groups.findIndex((grp) => (grp.id === id))
    state.groups.splice(index, 1)
}

/**
 *
 * @param state
 * @param id
 */
const completedTask = (state, { id }) => {
    state.tasks.forEach((task) => {
        if (task.id === id) {
            task.completed = !task.completed
        }
    })
}


/**
 *
 * @param state
 */
const clearCompletedTasks =  (state, { groupId }) => {
    state.tasks = state.tasks.reduce((acc, task) => {
        if (task.completed && task.group === groupId){
            return acc
        }
        acc.push(task)

        return acc
    }, [])
}

/**
 *
 * @param state
 */
const clearTasks = (state) => {
    state.tasks = []
}


/**
 *
 * @param state
 * @param payload
 * @param index
 */
const saveTask = (state, { payload, id }) => {
    const task = findById(state.tasks, id)
    task.title = payload.title
}


/**
 *
 * @param state
 * @param index
 */
const unEditedTask = (state) => {
    state.tasks.forEach((task) => (task.edited = false))
}

/**
 *
 * @param state
 * @param index
 */
const toggleTask = (state, { id }) => {
    const task = findById(state.tasks, id)
    task.edited = !task.edited
}

/**
 *
 * @param state
 * @param id
 */
const setCurrentGroup = (state, { id}) => {
    state.currentGroup = id
}

/**
 *
 * @param state
 * @param id
 */
const clearGroups = (state, { groupId }) => {
    state.tasks =  state.tasks.filter((task) => task.group !== groupId)
}

/**
 *
 * @param state
 */
const toggleGroup = (state, { id }) => {
    state.groups.forEach((group) => {
        group.show  = group.id === id
    })
}


export default {
    [type.SET_CURRENT_GROUP] (state, payload) { setCurrentGroup(state, payload) },
    [type.CLEAR_GROUPS] (state, payload) { clearGroups(state, payload) },
    [type.TOOGLE_GROUP] (state, payload) { toggleGroup(state, payload) },
    [type.UN_EDITED_TASKS] (state, payload) { unEditedTask(state, payload) },
    [type.SAVE_TASKS] (state, payload) { saveTask(state, payload) },
    [type.TOOGLE_TASK] (state, payload) { toggleTask(state, payload) },
    [type.CLEAR_TASKS] (state, payload) { clearTasks(state, payload) },
    [type.CLEAR_COMPLETED_TASK] (state, payload) { clearCompletedTasks(state, payload) },
    [type.COMPLETED_TASK] (state, payload) { completedTask(state, payload) },
    [type.REMOVE_TASK] (state, payload) { removeTask(state, payload) },
    [type.REMOVE_GROUP] (state, payload) { removeGroup(state, payload) },
    [type.ADD_GROUP] (state, payload) { addGroup(state, payload) },
    [type.SET_TASKS] (state, payload) { setTasks(state, payload) },
    [type.SET_GROUPS] (state, payload) { setGroups(state, payload) },
    [type.SET_LOADING] (state, payload) { setLoading(state, payload) },
    [type.ADD_TASK] (state, payload) { addTask(state, payload) }
}

