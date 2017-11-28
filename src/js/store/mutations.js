import uuidv1 from 'uuid/v1'
import { findById } from '../api/index.js'

/**
 *
 * @param state
 * @param title
 */
const addToTaskList = (state, {title}) => {
    state.tasks.push({
        id: uuidv1(),
        title: title,
        completed: false,
        edited: false,
        group: state.currentGroup
    });
}

/**
 *
 * @param state
 * @param title
 */
const addToGroupList = (state, {title}) => {
    state.groups.push({
        id: uuidv1(),
        title: title,
        edited: false
    });
}

/**
 *
 * @param state
 * @param id
 */
const completeToTaskList = (state, { id }) => {
    state.tasks.forEach((task) => {
        if (task.id === id) {
            task.completed = !task.completed
        }
    })
}

/**
 *
 * @param state
 * @param id
 */
const removeToTaskList = (state, { id }) => {
    const index = state.tasks.findIndex((task) => (task.id === id));
    state.tasks.splice(index, 1);
}

/**
 *
 * @param state
 */
const clearCompleteTaskList =  (state, {}) => {
    state.tasks = state.tasks.filter((task) => !task.completed);
}

/**
 *
 * @param state
 */
const clearAll = (state, {}) => {
    state.tasks = [];
}

/**
 *
 * @param state
 * @param payload
 * @param index
 */
const saveTaskEdit = (state, { payload, id }) => {
    const task = findById(state.tasks, id);
    task.title  = payload.title
}


/**
 *
 * @param state
 * @param index
 */
const removeTasksEdit = (state, {  }) => {
    state.tasks.forEach((task) => (task.edited = false));
}

/**
 *
 * @param state
 * @param index
 */
const toggleTaskEdit = (state, { id }) => {
    const task = findById(state.tasks, id);
    task.edited = !task.edited;
}

/**
 *
 * @param state
 * @param id
 */
const setCurrentGroup = (state, { id}) => {
    state.currentGroup = id;
}

/**
 *
 * @param state
 * @param id
 */
const clearAllByGroup = (state, { }) => {
    state.tasks =  state.tasks.filter((task) => task.group !== state.currentGroup)
}


export default {
    addToTaskList,
    completeToTaskList,
    removeToTaskList,
    clearCompleteTaskList,
    clearAll,
    toggleTaskEdit,
    saveTaskEdit,
    removeTasksEdit,
    addToGroupList,
    setCurrentGroup,
    clearAllByGroup
}

