/**
 * get task
 * @param state
 * @returns {Array}
 */
const getTasks = (state) => {
        return state.tasks.filter((task) => task.group === state.currentGroup);
}

/**
 * get group
 * @param state
 * @returns {Array}
 */
const getGroups = (state) => {
    return state.groups;
}

/**
 *
 * @param state
 */
const getCurrentGroup = (state) => {
    return state.currentGroup
}

/**
 *
 * @param state
 */
const getCurrentGroupName = (state) => {
    const group = state.groups.find((group) => group.id === getCurrentGroup(state))
    if (!!group) {
        return group.title;
    }

    return null;
}

/**
 * task is in progress
 * @param state
 * @param task
 * @returns {boolean}
 */
export const inProgress = (state, task) => {
    return !isCompleted(state, task);
}

/**
 *
 * @param state
 * @returns {Number}
 */
const incomplete = (state) => {
    return getTasks(state).filter((task) => inProgress(state, task)).length;
}

/**
 * task is completed
 * @param state
 * @param task
 * @returns {boolean|*}
 */
export const isCompleted = (state, task) => {
    return task.completed;
}


export default {
    getTasks,
    inProgress,
    isCompleted,
    incomplete,
    getGroups,
    getCurrentGroup,
    getCurrentGroupName
}