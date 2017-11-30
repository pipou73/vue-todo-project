import { findById } from '../api/index.js'
/**
 * @param commit
 * @param title
 */
const addTask = ( {commit},  { title, groupId } ) => {
    if (!!title) {
        commit('addToTaskList', { title, groupId });
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
        commit('toggleGroupShow', { id })
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
const clearCompleted = ({ commit }, { groupId }) => {
    commit('clearCompleteTaskList', { groupId });
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

/**
 *
 */
const pushTasksPosition = ({commit}, { tasks }) => {
    tasks.forEach((task, index) => {
        commit('setTaskPosition', { id : task.id, position : index })
    })
}

export default {
    addTask,
    completeTask,
    removeTask,
    clearCompleted,
    saveTask,
    clearAllEdit,
    addGroup,
    setCurrentGroup,
    pushTasksPosition
}