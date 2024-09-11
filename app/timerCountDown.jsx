import { Pressable, StyleSheet, Text, View ,TextInput, ScrollView, FlatList} from 'react-native'
import React, { useState,useRef,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CountDownBox from '../components/countDownBox';
import CustomAddBtn from '../components/customAdd';
import CreateTimerModal from '../components/createTimerModal';
import useCreateTimer from '../hooks/useCreateTimer';
import { useClockData } from '../context/clockContextProvider';

//https://github.com/transistorsoft/react-native-background-fetch
//https://github.com/zo0r/react-native-push-notification

const TimeCountDown = () => {
    let {timerData,tiggerReloadData}=useClockData();
    let [countTimeObj,setCountTimeObj]=useState({hours:2,minutes:30,seconds:30});
    let [isModalVisible,setIsModalVisible]=useState(false);
    let [refreshList,setRefreshList]=useState(false)
    useEffect(()=>{
    console.log("use effect trying to read timer data",timerData);
    
    },[timerData])
    let handleModal=(dataOfTimerObj)=>{
      console.log("handle modal timer",dataOfTimerObj);
      
      useCreateTimer(dataOfTimerObj).then((res)=>{
        setIsModalVisible(!isModalVisible);
        tiggerReloadData();
        setRefreshList(!refreshList);
      })
     
    }



    
  return (
    <SafeAreaView style={{width:"100%",height:"100%",position:"relative"}} >
      <ScrollView>
      <View>
       <FlatList
          data={timerData}
          key={(item)=>item.timerId}
          keyExtractor={(item) =>item.timerId}
          renderItem={(sig)=>(<CountDownBox key={sig.index} countTimeObj={sig.item}></CountDownBox>) }
          refreshing={refreshList}
        
        />
      </View>
      </ScrollView>
      <CreateTimerModal handleModalFunc={handleModal} isModalShow={isModalVisible}></CreateTimerModal>
      <CustomAddBtn handleAddBtn={()=>{setIsModalVisible(!isModalVisible)}}></CustomAddBtn>
      
    </SafeAreaView>
  )
}

export default TimeCountDown;

const styles = StyleSheet.create({})