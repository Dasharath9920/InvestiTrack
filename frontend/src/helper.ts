export const formatTime = (minutes: number): string => {
   if (minutes < 60) {
     return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
   } else if (minutes < 1440) {
     const hours = Math.floor(minutes / 60);
     return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
   } else {
     const days = Math.floor(minutes / 1440);
     return `${days} ${days === 1 ? 'day' : 'days'}`;
   }
 };

 export const getTimeDescription = (minutes: number): string => {
   if (minutes < 60) {
     return `${minutes} minutes`;
   } else if (minutes < 1440) {
     return `${(minutes / 60).toFixed(1)} hours`;
   } else {
     return `${(minutes / 1440).toFixed(1)} days`;
   }
 };