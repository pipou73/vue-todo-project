/**
 *
 * @param state
 * @returns {Array}
 */
const getTasks = (state) => {
    return state.tasks
}

/**
 *
 * @param state
 * @returns {function({id: *}): Array.<*>}
 */
export const  getTasksByGrp = (state) => {
    return ({id}) => state.tasks.filter(item => {
        return item.group === id
    }).sort((a, b) => a.position > b.position)
}

/**
 * get group
 * @param state
 * @returns {Array}
 */
const getGroups = (state) => {
    return state.groups
}

/**
 *
 * @param state
 */
const getCurrentGroup = (state) => {
    return state.groups.find((group) => group.id === state.currentGroup)
}

/**
 *
 * @param state
 */
const getCurrentGroupName = (state) => {
    const group = getCurrentGroup(state)
    if (group) {
        return group.title
    }

    return null
}

/**
 * task is in progress
 * @param state
 * @param task
 * @returns {boolean}
 */
export const inProgress = (state, task) => {
    return !isCompleted(state, task)
}

/**
 *
 * @param state
 * @returns {Number}
 */
const incomplete = (state) => {
    return getTasks(state).filter((task) => inProgress(state, task)).length
}

/**
 * task is completed
 * @param state
 * @param task
 * @returns {boolean|*}
 */
export const isCompleted = (state, task) => {
    return task.completed
}
/**
 * 
 * @param {*} state 
 */
export const isLoading = (state) => {
    return state.isLoading
}


export default {
    getTasks,
    inProgress,
    isCompleted,
    incomplete,
    getGroups,
    getCurrentGroup,
    getCurrentGroupName,
    getTasksByGrp,
    isLoading
}