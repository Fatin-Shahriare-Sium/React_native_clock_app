import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image, FlatList,Dimensions, Pressable, TouchableOpacity } from 'react-native';
import TimerBox from '../components/timerBox';
import * as Notifications from 'expo-notifications';
import { useClockData } from '../context/clockContextProvider';
import { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from 'react-native-uuid';
import addIcon from '../assets/add.png'
import useSetAlarm from '../hooks/useSetAlarm';
import moment from 'moment';
export default function App() {
 let {alarmData,setAlarmDataArrayFuc,tiggerReloadData}=useClockData();
 let [showPicker,setShowPicker]=useState(false);
  let handleCreateAlarm=(date)=>{
    console.log("picked time when click ad icon",date);
    
    useSetAlarm({alarmId:uuid.v4(),
      alarmTimeObj:date,alarmEveryday:true,isAlarmOnData:true}).then((res)=>{
        tiggerReloadData();
      })
  }
  
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
 useEffect(()=>{
  console.log("in timer box",alarmData)
 },[alarmData])

  return (
    <SafeAreaView style={{width:"100%"}}>
        <ScrollView style={{width:"100%"}}>
          
           <View>
              <View>
                
                <FlatList
                contentContainerStyle={styles.alarmBoxContainer}
                data={alarmData}
                renderItem={(sig)=>(<View style={{width:Dimensions.get('window').width*.9}}><TimerBox alarmDataObj={(sig.item)} /></View>)}
                key={(item)=>item.alarmId}
                />
              
            
              </View>
              <View style={{marginTop:"30%"}}> 
              <DateTimePickerModal
                  isVisible={showPicker}
                  mode="time"
                  onConfirm={handleCreateAlarm}
                  onCancel={()=>setShowPicker(!showPicker)}
                  is24Hour={false}
                
              />
                <Pressable style={{backgroundColor:"red"}} onPress={()=>setShowPicker(!showPicker)}>
                <Image style={{width:70,height:30}} source={addIcon}/>
                <Text onPress={()=>{console.log("presss")
                }}>usuauhuwe</Text>
                </Pressable>
              </View>
           </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  alarmBoxContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    position:"relative",

   
  }
});
