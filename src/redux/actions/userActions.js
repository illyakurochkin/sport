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
  api.defaults.headers.common.Authorization = token;
  // const {data} = await api.get('/auth');
  const data = await fakeSignIn();

  return dispatch({
    type: SIGNIN,
    user: data
  });
};

export const signin = (username, password) => async dispatch => {
  const token = await api.get('/auth', {params: {username, password}});
  // const token = `${username}+${password}`;
  localStorage.setItem('authToken', token);
  await dispatch(fetchUser());
};

export const signup = (params) => async dispatch => {
  console.log('params', params);
  // await api.get('/createClient', {params});
  await dispatch(signin(params.username, params.password));
};


export const signout = () => {
  console.log('signout');
  api.defaults.headers.common.Authorization = null;
  localStorage.setItem('authToken', null);
  return ({type: SIGNOUT});
};
