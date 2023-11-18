import axios from "axios";
import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,

} from './types';
import { setAlert } from './alert'; // Import the setAlert action
import setAuthToken from '../utility/setAuthToken'

// Register User
export const register = ({name, email, password}) => async (dispatch) => {
    try {
    
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const body = JSON.stringify({name, email, password});

      const api = axios.create({
        baseURL: 'http://localhost:8000/api', // Modify this base URL to match your backend's URL
      });
  
      const res = await api.post('/users',body, config);

      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      dispatch(setAlert('User has been created!', 'success'));

      //dispatch(loadUser());
  

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          const error = err.response.data.message;
          // Dispatch USER_REGISTER_FAIL with an error message payload
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error // or err.response.data.message, depending on your API response
          });
          dispatch(setAlert(error, 'danger'));
        } else {
          // If the error format is unexpected, dispatch a generic error message
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: "An error occurred during registration."
          });
          dispatch(setAlert('Unexpected error occured', 'danger'));
        }
  }};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
  
    const api = axios.create({
      baseURL: 'http://localhost:8000/api', // Modify this base URL to match your backend's URL
    });

    const res = await api.get('/auth');

    dispatch({ type: USER_LOADED, payload: res.data });


  } catch (err) {
    dispatch({ type: AUTH_ERROR});
  }
}

 // login User
export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({email, password});

    const api = axios.create({
      baseURL: 'http://localhost:8000/api', // Modify this base URL to match your backend's URL
    });

    const res = await api.post('/auth',body, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
    dispatch(setAlert('Log in successfully!', 'success'));

    //dispatch(loadUser());


  } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const error = err.response.data.message;
        // Dispatch USER_REGISTER_FAIL with an error message payload
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error // or err.response.data.message, depending on your API response
        });
        dispatch(setAlert(error, 'danger'));
      } else {
        // If the error format is unexpected, dispatch a generic error message
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: "An error occurred during registration."
        });
        dispatch(setAlert('Unexpected error occured', 'danger'));
      }
}};