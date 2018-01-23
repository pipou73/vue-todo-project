import { findById } from '../../api/index.js'
import * as type from '../types'
import uuidv1 from 'uuid/v1'

const state = {
    items: []
}

const getTasksByGroup = (state) => {
    return ({id}) => state.items.filter(item => {
        return item.group === id
    }).sort((a, b) => a.position > b.position)
};

const getters = {
    /**
     * get all Tasks
     * @param state
     * @returns {Array}
     */
    [type.GET_TASKS]: state => {
        return state.items
    },
    /**
     *
     * @param state
     * @returns {function({id: *}): Array.<*>}
     */
    [type.GET_TASKS_BY_GROUP]: (state) => {
       return getTasksByGroup(state);
    }
}

const actions = {
    /**
     * add task action
     * @param commit
     * @param title
     * @param groupId
     */
    [type.ADD_TASK]: ( {commit},  { title, groupId } ) => {
        if (title) {
            commit(type.MUTATE_ADD_TASK, { title, groupId })
        }
    },
    /**
     *
     * @param commit
     * @param state
     * @param id
     */
    [type.COMPLETED_TASK]: ({ commit, state }, { id }) => {
        if (id) {
            commit(type.MUTATE_COMPLETED_TASK, { id })
        }

        const tasks = getTasksByGroup(state)({ id }).filter((task) => task.completed)
        if (!tasks.length) {
            commit(type.MUTATE_COMPLETED_GROUP, { id })
        }
    },
    /**
     * clear all completed tasks by group
     * @param commit
     */
    [type.CLEAR_COMPLETED_TASK]: ({ commit }, { groupId }) => {
        commit(type.MUTATE_CLEAR_COMPLETED_TASK, { groupId })
    },
    /**
     *
     * @param commit
     * @param id
     */
    [type.REMOVE_TASK]: ({ commit }, { id }) => {
        if (id) {
            commit(type.MUTATE_REMOVE_TASK, { id })
        }
    },
    /**
     * for save task (v-model) just toggle edit flag
     * @param commit
     * @param id
     */
    [type.UPDATE_TASK]: ({ commit }, { id }) => {
        if (id) {
            commit(type.MUTATE_TOGGLE_TASK_EDIT, {id})
        }
    },
    /**
     * save
     * @param commit
     * @param tasks
     * @param groupId
     */
    [type.SAVE_TASKS_BY_GROUP]: ({ commit }, { tasks, groupId }) => {
        commit(type.MUTATE_SET_TASKS_BY_GROUP, { tasks, groupId })
    },
    /**
     * remove all task for one groupId
     * @param commit
     * @param groupId
     */
    [type.CLEAR_TASKS_BY_GROUP]: ({commit}, { groupId }) => {
        if (id) {
            commit(type.MUTATE_CLEAR_GROUP, {groupId})
        }
    },
    /**
     *
     * @param commit
     * @param id
     */
    [type.TOGGLE_EDIT_TASK]: ({commit}, { id }) => {
        if (id) {
            commit(type.MUTATE_TOGGLE_TASK_EDIT, {id})
        }
    }
};

const mutations = {
    /**
     * add new task to the list
     * @param state
     * @param title
     * @param groupId
     */
    [type.MUTATE_ADD_TASK]: (state, {title, groupId}) => {
        state.items.push({
            id: uuidv1(),
            title: title,
            completed: false,
            edited: false,
            group: groupId,
            position: (state.items.filter((task) => task.group === groupId).length + 1)
        })
    },
    /**
     * update task
     * @param state
     * @param id
     */
    [type.MUTATE_UPDATE_TASK]: (state, { id }) => {
        const task = findById(id);
        if (task) {
            task.title = payload.title
        }
    },
    /**
     * set tasks
     * @param state
     * @param tasks
     */
    [type.MUTATE_SET_TASKS]: (state, {tasks}) => {
        state.items = tasks
    },
    /**
     * clear task by group id
     * @param state
     * @param groupId
     */
    [type.MUTATE_CLEAR_GROUP]: (state, { groupId }) => {
        state.items =  state.items.filter((task) => task.group !== groupId)
    },
    /**
     *
     * @param state
     * @param id
     */
    [type.MUTATE_COMPLETED_TASK]: (state, { id }) => {
        state.items.forEach((task) => {
            if (task.id === id) {
                task.completed = !task.completed
            }
        })
    },
    /**
     * Clear all Completed task For GroupID
     * @param state
     * @param groupId
     */
    [type.MUTATE_CLEAR_COMPLETED_TASK]: (state, { groupId }) => {
        state.items = state.items.reduce((acc, task) => {
            if (task.completed && task.group === groupId){
                return acc
            }
            acc.push(task)

            return acc
        }, [])
    },
    /**
     * Remove Task by id
     * @param state
     * @param id
     */
    [type.MUTATE_REMOVE_TASK]: (state, { id }) => {
        const index = state.items.findIndex((task) => (task.id === id))
        state.items.splice(index, 1)
    },
    /**
     * Toggle Edit Task
     * @param state
     * @param id
     */
    [type.MUTATE_TOGGLE_TASK_EDIT]: (state, { id }) => {
        const task = findById(state.items, id);
        if (task) {
            task.edited = !task.edited
        }
    },
    /**
     * set tasks by groupID
     * @param state
     * @param tasks
     */
    [type.MUTATE_SET_TASKS_BY_GROUP]: (state, { tasks }) => {
        debugger;
        /** TODO ClearGroup */
        state.items.push(...tasks);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}

