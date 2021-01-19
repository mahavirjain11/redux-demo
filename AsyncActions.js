const redux = require('redux')
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware

const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = { // state containing initial values
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST' // constants for action types

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {  //action creators
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
       axios.get(`https://jsonplaceholder.typicode.com/users`)
       .then(response => {
           //response.data is the array of users
           const users = response.data.map(user => user.id)
           dispatch(fetchUsersSuccess(users))
           console.log(users)
       })
       .catch(error => {
           //error.message is the error description
           dispatch(fetchUsersFailure(error.message))

       })
    }
}


const reducer = (state = initialState , action) => {  //reducer
    switch(action.type) {  // changing state based on action type
        case FETCH_USERS_REQUEST:
           return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS: 
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case  FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }       
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers)

/*  Error: Cannot find module 'D:\react-redux\react-redux-app\src\asynchActions.js'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:925:15)
    at Function.Module._load (node:internal/modules/cjs/loader:769:27)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
  */
