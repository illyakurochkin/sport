import {SIGNIN, SIGNOUT} from './actionsTypes';
import api from '../../utils/api';

const fakeSignIn = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({
      userType: 'client',
      userData: {clientId: 123123, name: 'Gonchar Galyna Romanivna'}
    }), 500));

const fakeGetCoach = (coachId) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({coachId: 123123, name: 'Semonenko Petro Stepanovych'}), 500));

const fakeGetClient = (clientId) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({clientId: 332323, name: 'Kurochking Illya'}), 500));

const fakeGetGym = (gymId) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({gymId: 3534342324, name: 'Kyiv, Kontraktova street, 5'}), 500));

export const fetchUser = () => async dispatch => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.Authorization = 'Bearer ' + token;
  const {data} = await api.get('/api/login', {headers: {Authorization: token}});
  // const data = await fakeSignIn();

  return dispatch({
    type: SIGNIN,
    user: data
  });
};

export const signin = (username, password) => async dispatch => {
  const formData = new FormData();
  formData.set('grant_type', 'password');
  formData.set('username', username);
  formData.set('password', password);

  const {data: {access_token}} = await api.post('/oauth/token', formData, {headers: {Authorization: 'Basic Z3ltLXZpZXc6c2VjcmV0'}});
  localStorage.setItem('authToken', access_token);
  await dispatch(fetchUser());
};

export const signup = (params) => async dispatch => {
  await api.post('/api/signin', {...params});
  await dispatch(signin(params.email, params.password));
};


export const signout = () => {
  api.defaults.headers.common.Authorization = null;
  localStorage.setItem('authToken', null);
  return ({type: SIGNOUT});
};
