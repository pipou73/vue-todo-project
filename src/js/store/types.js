// Getters

export const GET_GROUPS = 'groups/GET_GROUPS';
export const GET_CURRENT_GROUP = 'groups/GET_CURRENT_GROUP';
export const GET_CURRENT_GROUP_NAME = 'groups/GET_CURRENT_GROUP_NAME';

export const GET_TASKS = 'tasks/GET_TASKS';
export const GET_TASKS_BY_GROUP = 'groups/GET_TASKS_BY_GROUP';

export const IS_LOADING =  'IS_LOADING';


// Mutations groups
export const MUTATE_SET_GROUPS             = 'groups/MUTATE_SET_GROUPS';
export const MUTATE_ADD_GROUP              = 'groups/MUTATE_ADD_GROUP';
export const MUTATE_REMOVE_GROUP           = 'groups/MUTATE_REMOVE_GROUP'
export const MUTATE_TOGGLE_GROUP_EDIT      = 'groups/MUTATE_TOGGLE_GROUP_EDIT'
export const MUTATE_CLEAR_GROUP            = 'groups/MUTATE_CLEAR_GROUP'
export const MUTATE_SET_CURRENT_GROUP      = 'groups/MUTATE_SET_CURRENT_GROUP'
export const MUTATE_COMPLETED_GROUP        = 'groups/MUTATE_COMPLETED_GROUP'
// Mutations tasks
export const MUTATE_SET_TASKS              = 'tasks/MUTATE_SET_TASKS';
export const MUTATE_ADD_TASK               = 'tasks/MUTATE_ADD_TASK';
export const MUTATE_REMOVE_TASK            = 'tasks/MUTATE_REMOVE_TASK'
export const MUTATE_COMPLETED_TASK         = 'tasks/MUTATE_COMPLETED_TASK'
export const MUTATE_CLEAR_COMPLETED_TASK   = 'tasks/MUTATE_CLEAR_COMPLETED_TASK'
export const MUTATE_UPDATE_TASK            = 'tasks/MUTATE_UPDATE_TASK'
export const MUTATE_TOGGLE_TASK_EDIT       = 'tasks/MUTATE_TOGGLE_TASK_EDIT'
export const MUTATE_SET_TASKS_BY_GROUP     = 'tasks/MUTATE_SET_TASKS_BY_GROUP'
// Mutations loading
export const MUTATE_SET_LOADING            = 'MUTATE_SET_LOADING';



// Actions groups
export const ADD_GROUP = 'groups/ADD_GROUP';
export const REMOVE_GROUP = 'groups/REMOVE_GROUP';
export const TOGGLE_EDIT_GROUP = 'groups/TOGGLE_EDIT_GROUP';
export const UPDATE_GROUP = 'groups/UPDATE_GROUP';
export const SET_GROUPS = 'groups/SET_GROUPS';
export const SET_CURRENT_GROUP = 'groups/SET_CURRENT_GROUP';

// Actions tasks
export const ADD_TASK = 'tasks/ADD_TASK';
export const COMPLETED_TASK = 'tasks/COMPLETE_TASK';
export const CLEAR_COMPLETED_TASK = 'tasks/CLEAR_COMPLETED_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';
export const UPDATE_TASK = 'tasks/UPDATE_TASK';
export const SAVE_TASKS_BY_GROUP = 'tasks/SAVE_TASKS_BY_GROUP';
export const CLEAR_TASKS_BY_GROUP = 'tasks/CLEAR_TASKS_BY_GROUP';
export const TOGGLE_EDIT_TASK = 'tasks/TOGGLE_EDIT_TASK';

//Action
export const SET_LOADING = 'SET_LOADING';
export const LOADING_DATA = 'LOADING_DATA';