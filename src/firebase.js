import { initializeApp } from 'firebase';

// configure the firebase app
const app = initializeApp({
  // apiKey: 'AIzaSyC417GPJ2VZ72gTSq3dvZYEd9u0YedFeMY',
  // authDomain: 'clima-6a828.firebaseapp.com',
  // databaseURL: 'https://clima-6a828.firebaseio.com',
  // projectId: 'clima-6a828',
  // storageBucket: '',
  // messagingSenderId: '985704044787'
  apiKey: 'AIzaSyCvBuiA7eSnkZkU7wSTgG77rgwSgR92MVY',
  databaseURL: 'https://abnormal-weather.firebaseio.com',
  projectId: 'abnormal-weather'
});

// get reference to the firebase database
const database = app.database();

// export reference to database
export default database;
