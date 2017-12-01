import uuidv1 from 'uuid/v1'
import { findById } from '../api/index.js'

/**
 *
 * @param state
 * @param title
 */
const addToTaskList = (state, {title, groupId}) => {
    state.tasks.push({
        id: uuidv1(),
        title: title,
        completed: false,
        edited: false,
        group: groupId,
        position: (state.tasks.filter((task) => task.group === groupId).length + 1)
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
        edited: false,
        show: false
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
 * @param id
 */
const removeToGrpList = (state, { id }) => {
    const index = state.groups.findIndex((grp) => (grp.id === id));
    state.groups.splice(index, 1);
}

/**
 *
 * @param state
 */
const clearCompleteTaskList =  (state, { groupId }) => {
    state.tasks = state.tasks.reduce((acc, task) => {
        if (task.completed && task.group === groupId){
            return acc;
        }
        acc.push(task);

        return acc;
    }, [])
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
 * @param groups
 */
const updateGroupList = (state, groups) => {
    state.groups = groups;
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
const clearAllByGroup = (state, { groupId }) => {
    state.tasks =  state.tasks.filter((task) => task.group !== groupId)
}

/**
 *
 * @param state
 */
const toggleGroupShow = (state, { id }) => {
    state.groups.forEach((group) => {
        group.show  = group.id === id
    })
}
/**
 *
 * @param state
 * @param id
 * @param position
 */
const setTaskPosition = (state, {id, position }) => {
    let task = findById(state.tasks, id)
    if (!!task) {
        task.position = position
    }
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
    clearAllByGroup,
    updateGroupList,
    toggleGroupShow,
    setTaskPosition,
    removeToGrpList
}

