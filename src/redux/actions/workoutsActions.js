import {FETCH_WORKOUTS} from './actionsTypes';
import api from '../../utils/api';

const fakeGetWorkouts = () => new Promise(resolve => setTimeout(() => resolve([
  {
    client: {
      clientId: 232323,
      name: 354353454
    },
    coach: {
      coachId: 23434234,
      name: 'Pavliv Denis'
    },
    gym: {
      gymId: 4234234,
      address: 'Podil street 23A'
    },
    startTime: '5 May 15:00',
    endTime: '5 May 16:00',
    payment: 100
  },
  {
    client: {
      clientId: 232323,
      name: 354353454
    },
    coach: {
      coachId: 23434234,
      name: 'Rak Tetiana'
    },
    gym: {
      gymId: 4234234,
      address: 'Verhniy Val street 3'
    },
    startTime: '6 May 12:00',
    endTime: '6 May 13:00',
    payment: 100
  },
  {
    client: {
      clientId: 2432323,
      name: 354353454
    },
    coach: {
      coachId: 23434234,
      name: 'Samovol Stepan'
    },
    gym: {
      gymId: 4234234,
      address: 'Podil street 23A'
    },
    startTime: '7 May 15:00',
    endTime: '7 May 16:00',
    payment: 100
  }
]), 100));

export const fetchWorkouts = () => async dispatch => {
  // const data = await fakeGetWorkouts();
  const {data} = await api.get('/api/workouts');

  dispatch({
    type: FETCH_WORKOUTS,
    workouts: data
  });
};
