import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import useCreateNotification from './useCreateNotification';
import useDeletNotification from './useDeleteNotification';
let useUpdateNotification=async (alarmId,notiId,haveScheduleDate)=>{
    let alarmObj=await AsyncStorage.getItem(alarmId);

    console.log("alarmobj through alarm id use update notio",alarmObj);
    
    
    await useDeletNotification(alarmId,notiId);
    let idOfNotification=await useCreateNotification(haveScheduleDate);
    if(alarmObj.alarmschedule==""){
        let alarmObjx={
            alarmId:alarmObj.alarmId,
            alarmTimeObj:haveScheduleDate,
            alarmInLocalTime:alarmObj.alarmInLocalTime,
            alarmschedule:'',
            notificationId:idOfNotification
        }
        console.log("update noti ",alarmObjx);
      
        AsyncStorage.mergeItem(alarmId,JSON.stringify(alarmObjx)).then((res)=>{
            console.log("update noti merge item",res);
            
        })
    }else{

        let alarmObjx={
            alarmId:alarmObj.alarmId,
            alarmTimeObj:haveScheduleDate,
            alarmInLocalTime:alarmObj.alarmInLocalTime,
            alarmschedule:haveScheduleDate?haveScheduleDate:'',
            notificationId:idOfNotification
        }
        console.log("update noti ",alarmObjx);
      
        AsyncStorage.mergeItem(alarmId,JSON.stringify(alarmObjx)).then((res)=>{
            console.log("update noti merge item",res);
            
        })
    }
  
   

}

export default useUpdateNotification;