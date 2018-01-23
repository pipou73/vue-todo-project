import * as type from './types'

/**
 * 
 * @param {*} state 
 * @param {*} loading 
 */
const setLoading = (state, { loading }) => {
    state.loading = loading
}


export default {
    [type.MUTATE_SET_LOADING] (state, payload) { setLoading(state, payload) },
}

