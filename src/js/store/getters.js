import * as types from './types'
/**
 * 
 * @param {*} state 
 */
export const isLoading = (state) => {
    return state.isLoading
}

export default {
    [types.IS_LOADING] : (state) => {isLoading(state)}
}