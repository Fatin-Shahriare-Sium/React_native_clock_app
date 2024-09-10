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
 let [refreshFlatList,setRefreshFlatList]=useState(false)
  let handleCreateAlarm=(date)=>{
    console.log("picked time when click ad icon",date);
    
    useSetAlarm({alarmId:uuid.v4(),
      alarmTimeObj:date,alarmEveryday:true,isAlarmOnData:true}).then((res)=>{
        tiggerReloadData();
        setRefreshFlatList(!refreshFlatList)
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
//Flatlist don't render automatically when data changes
//need to extraData and keyExtractor property,two needs to implement to re-render
  return (
    <SafeAreaView style={{width:"100%",height:"100%",position:"relative"}}>
        <ScrollView >
          
           <View >
              <View>
                
                <FlatList
                contentContainerStyle={styles.alarmBoxContainer}
                data={alarmData}
                key={(item)=>item.alarmId}
                keyExtractor={item => item.alarmId}
                renderItem={(sig)=>(<View style={{width:Dimensions.get('window').width*.9}}><TimerBox alarmDataObj={(sig.item)} /></View>)}
                extraData={refreshFlatList}
                ListHeaderComponent={()=>{}}
                />
              
            
              </View>
            
           </View>
        </ScrollView>
        <View style={{position:"absolute",zIndex:200,top:Dimensions.get('window').height*.7,left:Dimensions.get('window').width*.42}} > 
              <DateTimePickerModal
                  isVisible={showPicker}
                  mode="time"
                  onConfirm={handleCreateAlarm}
                  onCancel={()=>setShowPicker(!showPicker)}
                  is24Hour={false} />

            <Pressable style={styles.addBtnContainer}  onPress={()=>setShowPicker(!showPicker)}>
                <Image style={{width:50,height:50}} source={addIcon}/>
                </Pressable>
          
              </View>
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

   
  },
  addBtnContainer:{
    backgroundColor:"#98c698",
    borderRadius:50,
    padding:10
  }
});
