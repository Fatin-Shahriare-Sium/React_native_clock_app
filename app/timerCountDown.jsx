import { Pressable, StyleSheet, Text, View ,TextInput, ScrollView} from 'react-native'
import React, { useState,useRef,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CountDownBox from '../components/countDownBox';
import CustomAddBtn from '../components/customAdd';
import CreateTimerModal from '../components/createTimerModal';
import useCreateTimer from '../hooks/useCreateTimer';

//https://github.com/transistorsoft/react-native-background-fetch
//https://github.com/zo0r/react-native-push-notification

const TimeCountDown = () => {
    let [countTimeObj,setCountTimeObj]=useState({hours:2,minutes:30,seconds:30});
    let [isModalVisible,setIsModalVisible]=useState(false);
  

    let handleModal=(dataOfTimerObj)=>{
      console.log("handle modal timer",dataOfTimerObj);
      
      useCreateTimer(dataOfTimerObj).then((res)=>{
        setIsModalVisible(!isModalVisible);
      })
     
    }



    
  return (
    <SafeAreaView style={{width:"100%",height:"100%",position:"relative"}} >
      <ScrollView>
      <View>
        <CountDownBox countTimeObj={countTimeObj}></CountDownBox>
      </View>
      </ScrollView>
      <CreateTimerModal handleModalFunc={handleModal} isModalShow={isModalVisible}></CreateTimerModal>
      <CustomAddBtn handleAddBtn={()=>{setIsModalVisible(!isModalVisible)}}></CustomAddBtn>
      
    </SafeAreaView>
  )
}

export default TimeCountDown;

const styles = StyleSheet.create({})