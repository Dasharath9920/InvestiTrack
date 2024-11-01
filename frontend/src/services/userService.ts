import { ACCESS_TOKEN } from '../constants/constants';
import { Dispatch } from 'redux';
import actionTypes from '../constants/actionTypes';

 export const fetchAndUpdateUserDetails = async (dispatch: Dispatch) => {
   const authToken = localStorage.getItem(ACCESS_TOKEN)? JSON.parse(localStorage.getItem(ACCESS_TOKEN)!): '';
   const userDetails = await fetch(`/api/users/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await userDetails.json();
    if(!data.success){
      localStorage.removeItem(ACCESS_TOKEN);
      return false;
    }
    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        isLoggedIn: true,
        username: data.userData.username,
        email: data.userData.email,
        id: data.userData.userId,
        accountCreatedOn: data.userData.accountCreatedOn,
        profilePicture: data.userData.profilePicture
      }
    }); 
    return true;
};