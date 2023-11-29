import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    
} from '../actions/types';

const initialState = 
{
    token:localStorage.getItem('token'),
    isAuthenticated: false,
    loading:true,
    user:null,
}

export default function(
    state = initialState,
    action
){
    const {type, payload} = action;
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading:false,
                user:payload
            }
            
        case USER_REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            };
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            };
        case USER_REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false
            };
        case AUTH_ERROR:
        case USER_LOGIN_FAIL:
            localStorage.removeItem('token');
            //console.log('USER_REGISTER_FAIL dispatched:', action.payload);
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                accessToken: null,
            };


        default:
            return state;
    }

}