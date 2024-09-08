import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import useCreateNotification from './useCreateNotification';
let useUpdateNotification=async (alarmId,notiId)=>{
    let alarmObj=await AsyncStorage.getItem(alarmId);

    let tomorrow  = moment(alarmObj.alarmTimeObj).add(1,'days');
    console.log("tomorrow",tomorrow);

    let idOfNotification=await useCreateNotification(tomorrow);
    let alarmObjx={
        alarmId:alarmObj.alarmId,
        alarmTimeObj:tomorrow,
        alarmInLocalTime:alarmObj.alarmInLocalTime,
        notificationId:idOfNotification
    }
    console.log("update noti ",alarmObjx);
  
    AsyncStorage.mergeItem(alarmId,JSON.stringify(alarmObj)).then((res)=>{
        console.log("update noti merge item",res);
        
    })
   

}

export default useUpdateNotification;