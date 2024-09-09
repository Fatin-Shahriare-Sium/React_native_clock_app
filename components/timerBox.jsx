import { StyleSheet, Text, View,Switch, Pressable, Alert,Image } from 'react-native'
import React,{useState} from 'react'
import uuid from 'react-native-uuid';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useSetAlarm from '../hooks/useSetAlarm';
import useDeleteNotification from '../hooks/useDeleteNotification';
import useUpdateNotification from '../hooks/useUpdateNotification';
import * as Notifications from 'expo-notifications';
import useSchedule from '../hooks/useSechdule';
import useScheduleEveryDay from '../hooks/useScheduleEveyday';
import calenLogo from "../assets/calender.png"
import useConcateScheduleDateWithAlarmTime from '../hooks/useConcateScheduleDateWithAlarmTime';
const TimerBox = () => {  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateTimeVisible, setDateTimeVisibility] = useState(true);
    let [pickTime,setPickTime]=useState("");
    let [pickTimeObj,setPickTimeObj]=useState(new Date());
    let [alarmOn,setAlarmOn]=useState(false);
    let [notificationId,setNotificationId]=useState("");
    let [alarmIdx,setAlarmIdx]=useState("");
    let [scheduleDate,setScheduleDate]=useState("");
    let [hasScheduled,setHasScheduled]=useState(false);

    Notifications.addNotificationResponseReceivedListener((notification) => {
      // console.log("recider fseji",notification);
      if(alarmIdx && notificationId && hasScheduled==false){
        console.log("alarm set for tommoreow");
        useScheduleEveryDay(alarmIdx,notification,pickTimeObj).then((res)=>{
          console.log("alarm set for tommoreow");
          
        })
      }
      
    });

    let createAlarmOnFly=(pickTimeObj,localTime,dateForSchedule)=>{
      console.log("response after create on fly alarmxyh",dateForSchedule);
      useSetAlarm({alarmId:uuid.v4(),
        alarmTimeObj:dateForSchedule==""?pickTimeObj:dateForSchedule,
        alarmInLocalTime:localTime,alarmschedule:dateForSchedule}).then((res)=>{
          setAlarmIdx(res.alarmId);
          setNotificationId(res.notificationId);
          setHasScheduled(res.alarmschedule==""?false:true);
          setScheduleDate(res.alarmschedule);
          
          console.log("response after create on alarm",res);
          
        })
    }

    let handleAlarmSwitch=(e)=>{
        setAlarmOn(!alarmOn);
    console.log("e",e);
        if(e===true){
            useSetAlarm({alarmId:uuid.v4(),
              alarmTimeObj:scheduleDate==""?pickTimeObj:scheduleDate,
              alarmInLocalTime:pickTime,alarmschedule:scheduleDate}).then((res)=>{
                setAlarmIdx(res.alarmId)
                setNotificationId(res.notificationId)
                setHasScheduled(res.alarmschedule==""?false:true)
                console.log("response after switc",res);
                
              })
            Alert.alert("Alarm has been set")
        }else if(alarmIdx!==""||notificationId!==""){
          useDeleteNotification(alarmIdx,notificationId).then((res)=>{
            Alert.alert("Alarm is off")
          })
        }
        
    }
 

  console.log("new Date().toISOString()",new Date());
  

  const handleConfirmTime = (datex) => {
    console.log("A date has been picked: ", datex);
    setPickTimeObj(datex);
    var local = moment(datex).local().format('hh:mm a');//("hh,mm") means am,pm and (HH,MM) MEANS 24 FORMAT
    setPickTime(local);
    console.log("timeComponent",local);
    setDateTimeVisibility(!isDateTimeVisible);
    setAlarmOn(true);
    createAlarmOnFly(datex,local,scheduleDate);

  };
  const handleConfirmDate = (datex) => {
    console.log("A date calenderxx has been picked: ", datex);
    // let day = moment(datex).format("MMM Do");  ;//("hh,mm") means am,pm and (HH,MM) MEANS 24 FORMAT
    // console.log("datecomponet",day);
    setDatePickerVisibility(!isDatePickerVisible);
    setPickTimeObj(datex);
    if(alarmIdx==""){
      setScheduleDate(datex);
      console.log("doing seheduling uin change without alramn id",datex);
    }else{
      setScheduleDate(datex);
      console.log("doing seheduling uin change",datex);
      
      useSchedule(alarmIdx,notificationId,datex)
    }
 
  };
  return (
    <View style={styles.timerBoxWrapper}>
        <View>
            <Text onPress={()=>setDateTimeVisibility(true)} style={styles.timeText}>{pickTime==""?moment().local().format('hh:mm a'):pickTime}</Text>
            
        </View>
        <View style={styles.switchWrapper}>
        <Text  style={styles.schduleText}>{scheduleDate==""?"Everyday":moment(scheduleDate).format("MMM Do")}</Text>
                <Switch
                trackColor={{false: "#93a6c1", true: 'white'}}
                thumbColor={alarmOn?"#f37171":"#98c698"}
                onValueChange={handleAlarmSwitch}
                value={alarmOn}
                
            />
        </View>
      <View>

        <Pressable style={styles.schduleBtnWrapper} onPress={()=>setDatePickerVisibility(!isDatePickerVisible)}>
          <Image style={{height:20,width:20,backgroundColor:"#98c698"}} source={calenLogo} />
        <Text  style={styles.schduleBtn}>Sehedule</Text>
        </Pressable>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        date={scheduleDate==""?pickTimeObj:scheduleDate}
        onCancel={()=>setDatePickerVisibility(!isDatePickerVisible)}
      />
   
      </View>
      
      <DateTimePickerModal
        isVisible={isDateTimeVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={()=>setDateTimeVisibility(!isDateTimeVisible)}
        is24Hour={false}
        date={pickTimeObj}
      />
    
    </View>
  )
}

export default TimerBox

const styles = StyleSheet.create({
    timerBoxWrapper:{
        backgroundColor:'#1c1919',
        color:"white",
        width:"90%",
        padding:15,
        borderRadius:10
    },
    timeText:{
        color:"white",
        fontSize:30,
        fontWeight:"700",
    },
    switchWrapper:{
      display:'flex',
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      backgroundColor:"#1c1919"
    },
    schduleText:{
      color:"#f37171",
      fontSize:17,
      fontWeight:"500",
    },
    schduleBtn:{
      color:"#f37171",
      fontSize:15,
      fontWeight:"500",
      marginLeft:"3%"
    },
    schduleBtnWrapper:{
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      flexDirection:"row",
    }
})