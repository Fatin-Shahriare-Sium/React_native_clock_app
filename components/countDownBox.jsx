import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import playBtn from "../assets/play.png"
import pauseBtn from "../assets/pause.png"
import resetBtn from "../assets/reset.png"
const CountDownBox = ({countTimeObj}) => {
  let [startTimer,setStartTimer]=useState(false);
  let [preTimerObj,setPreTimerObj]=useState(countTimeObj);
  let [timerObj,setTimerObj]=useState({...countTimeObj});
  useEffect(()=>{
    let x=setInterval(()=>{
    if(startTimer==true){
        setTimerObj({...timerObj,seconds:timerObj.seconds-1})
        if(timerObj.seconds==0){
            return setTimerObj({...timerObj,seconds:60,minutes:timerObj.minutes-1})
         }else if(timerObj.minutes==0){
             return setTimerObj({seconds:60,minutes:60,hours:timerObj.hours==0?0:timerObj.hours-1})
         }else if(timerObj.hours==0,timerObj.minutes==0,timerObj.seconds==0){
             setStartTimer(false)
            return ()=>{clearInterval(x)}
         }
    }
    },1000)
    return ()=>{clearInterval(x)}
},[timerObj,startTimer])

let handlePlayPauseBtn=()=>{
  setStartTimer(!startTimer);
}

let resetTimerFunc=()=>{
 setTimerObj({...preTimerObj});
  return setStartTimer(false);
}
  return (
    <View>
       <Text>{`${timerObj.hours}:${timerObj.minutes}:${timerObj.seconds}`}</Text>
      <Pressable  style={{backgroundColor:"blue"}} onPress={()=>{handlePlayPauseBtn()}}>
      <Image style={{height:30,width:30}} source={startTimer?pauseBtn:playBtn}/>
      </Pressable>

      <Pressable  style={{backgroundColor:"blue"}} onPress={()=>{resetTimerFunc()}}>
      <Image style={{height:30,width:30}} source={resetBtn}/>
      </Pressable>
    </View>
  )
}

export default CountDownBox;

const styles = StyleSheet.create({})