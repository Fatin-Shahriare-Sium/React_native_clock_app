import { StyleSheet, Text, View,Switch, Pressable, Alert } from 'react-native'
import React,{useState} from 'react'
import uuid from 'react-native-uuid';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useSetAlarm from '../hooks/useSetAlarm';
import useDeleteNotification from '../hooks/useDeleteNotification';
import useUpdateNotification from '../hooks/useUpdateNotification';
import * as Notifications from 'expo-notifications';
const TimerBox = () => {  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
    const [isDateTimeVisible, setDateTimeVisibility] = useState(true);
    let [pickTime,setPickTime]=useState("");
    let [pickTimeObj,setPickTimeObj]=useState(new Date());
    let [alarmOn,setAlarmOn]=useState(false);
    let [notificationId,setNotificationId]=useState("");
    let [alarmIdx,setAlarmIdx]=useState("");

    Notifications.addNotificationResponseReceivedListener((notification) => {
      console.log("recider fseji",notification);
      useUpdateNotification(alarmIdx,notificationId);
      
    });
    let handleAlarmSwitch=(e)=>{
        setAlarmOn(!alarmOn);
    console.log("e",e);
        if(e===true){
            useSetAlarm({alarmId:uuid.v4(),
              alarmTimeObj:pickTimeObj,
              alarmInLocalTime:pickTime,alarmschedul:[]}).then((res)=>{
                setAlarmIdx(res.alarmId)
                setNotificationId(res.notificationId)
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
    setDateTimeVisibility(!isDateTimeVisible)
  };
  const handleConfirmDate = (datex) => {
    console.log("A date has been picked: ", datex);
    // setPickTimeObj(datex);
    // var local = moment(datex).local().format('hh:mm a');//("hh,mm") means am,pm and (HH,MM) MEANS 24 FORMAT
    // setPickTime(local);
    // console.log("timeComponent",local);
    // hideDatePicker();
  };
  return (
    <View style={styles.timerBoxWrapper}>
        <View>
            <Text onPress={()=>setDateTimeVisibility(true)} style={styles.timeText}>{pickTime}</Text>
            
        </View>
        <View>
                <Switch
                trackColor={{false: 'white', true: 'red'}}
                thumbColor={"green"}
                onValueChange={handleAlarmSwitch}
                value={alarmOn}
                
            />
        </View>
        
      <Text>TimerBox</Text>
      <View>
      <Pressable style={{backgroundColor:"red",height:"40%"}} onPress={()=>setDatePickerVisibility(true)} >
      <Text style={styles.schduleText}>{`Sehedule${alarmIdx}:${notificationId}`}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={()=>setDatePickerVisibility(!isDatePickerVisible)}
      />
      </Pressable>
      </View>
      
      <Pressable style={{backgroundColor:"red",height:"40%"}} onPress={()=>setDateTimeVisibility(true)} >
      
      <DateTimePickerModal
        isVisible={isDateTimeVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={()=>setDateTimeVisibility(!isDateTimeVisible)}
        is24Hour={false}
        date={pickTimeObj}
      />
      </Pressable>
    </View>
  )
}

export default TimerBox

const styles = StyleSheet.create({
    timerBoxWrapper:{
        backgroundColor:'black',
        color:"white",
        width:"90%"
    },
    timeText:{
        color:"white",
        textAlign:"center",
        fontSize:30,
        fontWeight:"700"
    },
    schduleText:{
      color:"white",
      fontSize:30,
      fontWeight:"700",
      textAlign:'center'
    }
})