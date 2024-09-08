import * as Notifications from 'expo-notifications';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
Notifications.addNotificationResponseReceivedListener((notification) => {
    console.log("recider fseji",notification);
    
    
  });
  const getData = async (alarmId) => {
    try {
      const jsonValue = await AsyncStorage.getItem(alarmId);
      console.log("get data",jsonValue);
      
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
let useDeletNotification=async (alarmId,notiId)=>{
    let tomorrow  = moment("2024-09-08T17:54:00.000Z").add(1,'days');
    console.log("tomorrow",tomorrow);
    
    Notifications.cancelScheduledNotificationAsync(notiId).then((res)=>{
        console.log("delete notification",res);
    })
   
}

export default useDeletNotification;