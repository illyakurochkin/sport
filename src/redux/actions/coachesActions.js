import {FETCH_COACHES} from './actionsTypes';
import api from '../../utils/api';

const fakeGetCoaches = () => new Promise(resolve => setTimeout(() => resolve([
  {
    coachId: 342343,
    name: 'Sydorenko Ivan Olegovych',
    phone: '+42389042384',
    age: 24,
    sportRang: 'super sportsman',
    payment: 20,
    photo: 'https://talksport.com/wp-content/uploads/sites/5/2018/12/GettyImages-10673991241.jpg?strip=all&w=960&quality=100'
  },
  {
    coachId: 34234232343,
    name: 'Myronych Olegovych Olegovych',
    phone: '+42389042384',
    age: 24,
    sportRang: 'super sportsman',
    payment: 20,
    photo: 'https://talksport.com/wp-content/uploads/sites/5/2018/12/GettyImages-10673991241.jpg?strip=all&w=960&quality=100'
  },
  {
    coachId: 3434,
    name: 'Olena Ivan Olegovych',
    phone: '+423422384',
    age: 24,
    sportRang: 'strong sportsman',
    payment: 20,
    photo: 'https://talksport.com/wp-content/uploads/sites/5/2018/12/GettyImages-10673991241.jpg?strip=all&w=960&quality=100'
  },
  {
    coachId: 22222222,
    name: 'Valentina Ivan Olegovych',
    phone: '+42389042384',
    age: 21,
    sportRang: 'super sportwoman',
    payment: 20,
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }

]), 500));

export const fetchCoaches = () => async dispatch => {
  // const body = gymId ? `gymId=${gymId}` : clientId ? `clientId=${clientId}` : '';
  // const {data} = await api.get(`/coaches`);
  const data = await fakeGetCoaches();

  dispatch({
    type: FETCH_COACHES,
    coaches: data
  });
};

