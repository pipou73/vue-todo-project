import {findById} from '../../api/index.js'
import * as type from '../types'
import uuidv1 from 'uuid/v1'

const state = {
    items: [],
    currentGroup: '7ec00e82-d41f-11e7-a0e4-4dd6ca4d2af5'
}

const getCurrentGroup = (state) => {
    return state.items.find(group => {
        return group.id === state.currentGroup
    });
}

const getters = {
    /**
     * get group
     * @param state
     * @returns {Array}
     */
    [type.GET_GROUPS]: (state) => {
        return state.items
    },
    /**
     *
     * @param state
     * @returns {*}
     */
    [type.GET_CURRENT_GROUP]: (state) => {
        return getCurrentGroup(state);
    },
    /**
     *
     * @param state
     */
    [type.GET_CURRENT_GROUP_NAME]:  (state) => {
        const group = getCurrentGroup(state)
        if (group) {
            return group.title
        }

        return null
    }
}

const actions = {
    /**
     * add group into collection
     * @param commit
     * @param title
     */
    [type.ADD_GROUP]: ({commit}, {title}) => {
        if (title) {
            commit(type.MUTATE_ADD_GROUP, {title})
        }
    },
    /**
     * remove group into collection
     * @param commit
     * @param state
     * @param id
     */
    [type.REMOVE_GROUP]: ({commit, state}, {id}) => {
        if (id) {
            commit(type.MUTATE_REMOVE_GROUP, {id})
            commit(type.MUTATE_CLEAR_GROUP, {id})
        }
    },
    /**
     * toggle flag group edit
     * @param commit
     * @param id
     */
    [type.TOGGLE_EDIT_GROUP]: ({commit}, {id}) => {
        commit(type.MUTATE_TOGGLE_GROUP_EDIT, {id})
    },
    /**
     *
     * @param commit
     * @param id
     */
    [type.UPDATE_GROUP]: ({ commit }, { id }) => {
        commit(type.MUTATE_TOGGLE_GROUP_EDIT, { id })
    },
    /**
     * override groups
     * @param commit
     * @param groups
     */
    [type.SET_GROUPS]: ({ commit }, { groups }) => {
        commit(type.MUTATE_SET_GROUPS, { groups })
    },
    /**
     *
     * @param state
     * @returns {*}
     */
    [type.SET_CURRENT_GROUP]: ({commit}, { id }) => {
        commit(type.MUTATE_SET_CURRENT_GROUP, { id })
    },
}

const mutations = {
    /**
     * Set Groups
     * @param state
     * @param groups
     */
    [type.MUTATE_SET_GROUPS]: (state, { groups }) => {
        state.items = groups
    },
    /**
     * Add Group
     * @param state
     * @param title
     */
    [type.MUTATE_ADD_GROUP]: (state, {title}) => {
        state.items.push({
            id: uuidv1(),
            title: title,
            edited: false,
            show: false
        })
    },
    /**
     * Remove Group by ID
     * @param state
     * @param id
     */
    [type.MUTATE_REMOVE_GROUP]: (state, {id}) => {
        const index = state.items.findIndex((grp) => (grp.id === id))
        if (index) {
            state.items.splice(index, 1)
        }
    },
    /**
     * Completed group
     * @param state
     * @param id
     */
    [type.MUTATE_COMPLETED_GROUP]: (state, {id}) => {
        state.items.forEach((group) => {
            if (group.id === id) {
                group.completed = !group.completed
            }
        })
    },
    /**
     * TOGGLE EDIT GROUP
     * @param state
     * @param id
     */
    [type.MUTATE_TOGGLE_GROUP_EDIT]: (state, {id}) => {
        const group = findById(state.items, id)
        if (group) {
            group.edited = !group.edited
        }
    },
    /**
     *
     * @param state
     * @param id
     */
    [type.MUTATE_SET_CURRENT_GROUP]: (state, { id}) => {
        state.items.forEach((grp) => {
            grp.show = grp.id === id;
        });
        state.currentGroup = id;

    }
};

export default {
    state,
    mutations,
    actions,
    getters
}

