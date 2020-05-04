import {FETCH_GYMS} from './actionsTypes';
import api from '../../utils/api';

const fakeGetGyms = () => new Promise(resolve => setTimeout(() => resolve([
  {
    gymId: 32312323,
    address: 'Ukraine, Kyiv, Kontractova street 14',
    country: 'Ukraine',
    town: 'Kyiv',
    email: 'sport228@gmail.com',
    phone: '+489048894829',
    fine: 30,
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', 'photo2'],
    equipment: [],
    description: 'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj ' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj'
  },
  {
    gymId: 3444,
    address: 'Ukraine, Odessa, Raduzhna street 14',
    country: 'Ukraine',
    town: 'Kyiv',
    email: 'mondtersport@gmail.com',
    fine: 20,
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', 'photo2'],
    equipment: [],
    description: 'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfk' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfjj lksjdflkjsdlkjl sldkfj'
  },
  {
    gymId: 56456546,
    address: 'Ukraine, Kyiv, Shevchenka stret 14',
    country: 'Ukraine',
    town: 'Kyiv',
    email: 'doSportLife@gmail.com',
    phone: '+380680083838',
    fine: 10,
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', 'photo2'],
    equipment: [],
    description: 'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkds' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj' +
      ' lksjdflkjsdlkjl sldkfjdslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem' +
      ' loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfjv' +
      '' +
      'fjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj'
  },
  {
    gymId: 564564546,
    address: 'Ukraine, Kyiv, Shevchenka treet 14',
    country: 'Ukraine',
    town: 'Kyiv',
    email: 'doSportLife@gmail.com',
    phone: '+380680083838',
    fine: 10,
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', 'photo2'],
    equipment: [],
    description: 'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkds' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj' +
      'dslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem loren lkdsfjlk  lkj lkjlkjsdlfkj' +
      ' lksjdflkjsdlkjl sldkfjdslfkjsdlfkjsdlf sldkfjsld sldkfj lsdkjf lskdjf sllorem' +
      ' loren lkdsfjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfjv' +
      '' +
      'fjlk  lkj lkjlkjsdlfkj lksjdflkjsdlkjl sldkfj'
  }
]), 500));

export const fetchGyms = () => async dispatch => {
  const {data} = await api.get('/api/gyms');
  // const data = await fakeGetGyms();

  dispatch({
    type: FETCH_GYMS,
    gyms: data
  });
};
