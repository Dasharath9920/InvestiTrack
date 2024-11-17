import { ACCESS_TOKEN } from "../constants/constants";

export const fetchTimeData = async (skip: number) => {
   const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
   const resp = await fetch(`/api/entries/time?skip=${skip}`,{
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${authToken}`
     }
   });
   const data = await resp.json();
   if(data.success){
      data.timeData = data.timeData.map((timeData: any) => {
         timeData.activityDate = timeData.activityDate.split('T')[0];
         timeData.data.map((_data: any) => {
           _data.activityDate = _data.activityDate.split('T')[0];
         });
         return timeData;
       });
   }
   return data;
}