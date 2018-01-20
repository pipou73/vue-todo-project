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
const setTasksByGroup = (state, {tasks, group}) => {
    this.clearGroup(state, { groupId: group});
    state.tasks.push(...tasks);
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
const completedGroup = (state, { id }) => {
    state.groups.forEach((group) => {
        if (group.id === id) {
            group.completed = !group.completed
        }
    })
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
const updateTask = (state, { payload, id }) => {
    const task = findById(state.tasks, id)
    task.title = payload.title
}

/**
 *
 * @param state
 * @param payload
 * @param index
 */
const saveTasks = (state, { id }) => {
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
const toggleTaskEdit = (state, { id }) => {
    const task = findById(state.tasks, id)
    task.edited = !task.edited
}

/**
 *
 * @param state
 * @param index
 */
const toggleGroupEdit = (state, { id }) => {
    const group = findById(state.groups, id)
    group.edited = !group.edited
}

/**
 *
 * @param state
 * @param id
 */
const setCurrentGroup = (state, { id}) => {
    state.groups.forEach((grp) => {
       grp.show = grp.id === id;
    })
    state.currentGroup = id

}

/**
 *
 * @param state
 * @param id
 */
const clearGroup = (state, { groupId }) => {
    state.tasks =  state.tasks.filter((task) => task.group !== groupId)
}



export default {
    [type.SET_CURRENT_GROUP] (state, payload) { setCurrentGroup(state, payload) },
    [type.CLEAR_GROUP] (state, payload) { clearGroup(state, payload) },
    [type.UPDATE_TASK] (state, payload) { updateTask(state, payload) },
    [type.TOGGLE_TASK_EDIT] (state, payload) { toggleTaskEdit(state, payload) },
    [type.TOGGLE_GROUP_EDIT] (state, payload) { toggleGroupEdit(state, payload) },
    [type.CLEAR_TASKS] (state, payload) { clearTasks(state, payload) },
    [type.CLEAR_COMPLETED_TASK] (state, payload) { clearCompletedTasks(state, payload) },
    [type.COMPLETED_TASK] (state, payload) { completedTask(state, payload) },
    [type.COMPLETED_GROUP] (state, payload) { completedGroup(state, payload) },
    [type.REMOVE_TASK] (state, payload) { removeTask(state, payload) },
    [type.REMOVE_GROUP] (state, payload) { removeGroup(state, payload) },
    [type.ADD_GROUP] (state, payload) { addGroup(state, payload) },
    [type.SET_TASKS] (state, payload) { setTasks(state, payload) },
    [type.SET_GROUPS] (state, payload) { setGroups(state, payload) },
    [type.SET_LOADING] (state, payload) { setLoading(state, payload) },
    [type.ADD_TASK] (state, payload) { addTask(state, payload) },
    [type.SET_TASKS_BY_GROUP] (state, payload) { setTasksByGroup(state, payload) }
}

