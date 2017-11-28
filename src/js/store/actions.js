import { findById } from '../api/index.js'
/**
 * @param commit
 * @param title
 */
const addTask = ( {commit},  { title } ) => {
    if (!!title) {
        commit('addToTaskList', { title });
    }
}

/**
 * @param commit
 * @param title
 */
const addGroup = ( {commit},  { title } ) => {
    if (!!title) {
        commit('addToGroupList', { title });
    }
}

/**
 *
 * @param commit
 * @param id
 */
const setCurrentGroup = ({commit, state}, { id }) => {
    let group = findById(state.groups, id)
    if (!!group) {
        commit('setCurrentGroup', { id })
    }
}

/**
 * @param commit
 * @param taskId
 */
const completeTask = ({ commit }, { id }) => {
    if (!!id) {
        commit('completeToTaskList', { id });
    }
}

/**
 *
 * @param commit
 */
const clearCompleted = ({ commit }, { }) => {
    commit('clearCompleteTaskList', {});
}

/**
 *
 * @param commit
 * @param id
 */
const removeTask = ({ commit }, { id }) => {
    if (!!id) {
        commit('removeToTaskList', { id });
    }
}

const saveTask = ({ commit }, { payload, id }) => {
    commit('saveTaskEdit', { payload, id })
    commit('toggleTaskEdit', { id })
}

const clearAllEdit = ({commit, state}, {}) => {
    commit('removeTasksEdit', {  })
}


export default {
    addTask,
    completeTask,
    removeTask,
    clearCompleted,
    saveTask,
    clearAllEdit,
    addGroup,
    setCurrentGroup
}