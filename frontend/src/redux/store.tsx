import { configureStore } from '@reduxjs/toolkit';
import actionTypes from '../constants/actionTypes.ts';
import { TYPES, TABS, THEMES } from '../constants/constants.ts';


const initialState = {
   user: {
      isLoggedIn: false,
      username: '',
      email: '',
      id: '',
      profilePicture: ''
   },
   settings: {
      theme: THEMES.LIGHT
   },
   amounts: Array<{
      amount: '0';
      investedIn: '';
   }>,
   times: Array<{
      time: number;
      investedIn: string;
   }>,
   type: TYPES.AMOUNT,
   activeTab: TABS.HOME
}

const reducer = (state = initialState, action: any) => {
   switch(action.type) {
      case actionTypes.SET_TIMES:
         return {... state, times: action.payload};
      case actionTypes.SET_AMOUNTS:
         return {... state, amounts: action.payload};
      case actionTypes.SET_USER:
         return {... state, user: action.payload};
      default:
         return state;
   }
}

const store = configureStore({ reducer});

export default store;