import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import playBtn from "../assets/play.png"
import pauseBtn from "../assets/pause.png"
import resetBtn from "../assets/reset.png"
import useUpdateWhenTimerPause from '../hooks/useUpdateWhenTimerPause'
const CountDownBox = ({countTimeObj}) => {
  let [startTimer,setStartTimer]=useState(false);
  let [preTimerObj,setPreTimerObj]=useState({...countTimeObj});
  let [timerObj,setTimerObj]=useState({...countTimeObj});
  useEffect(()=>{
    console.log("countTimeObj",countTimeObj);
    let x=setInterval(()=>{
    if(startTimer==true){
        setTimerObj({...timerObj,seconds:timerObj.seconds>0?timerObj.seconds-1:"00"})
        if(timerObj.seconds==0 && timerObj.minutes>0){
            return setTimerObj({...timerObj,seconds:59,minutes:timerObj.minutes-1})
         }else if(timerObj.minutes==0 && timerObj.hours!==0){
             return setTimerObj({seconds:59,minutes:59,hours:timerObj.hours==0?0:timerObj.hours-1})
         }else if(timerObj.hours==0,timerObj.minutes==0,timerObj.seconds==0){
             setStartTimer(false)
             useUpdateWhenTimerPause({hours:preTimerObj.hours,minutes:preTimerObj.minutes,seconds:preTimerObj.seconds})
            return ()=>{clearInterval(x)}
         }
    }
    },1000)
    
    return ()=>{clearInterval(x)}
},[timerObj,startTimer])

let handlePlayPauseBtn=()=>{
  setStartTimer(!startTimer);
  if(startTimer==true){
    console.log("useUpdateWhenTimerPause(timerObj)",timerObj);
    let timerUpdateObj={
      hours:timerObj.hours,
      minutes:timerObj.minutes,
      seconds:timerObj.seconds
    }
   return useUpdateWhenTimerPause(timerObj.timerId,timerUpdateObj);
  }
 
}

let resetTimerFunc=()=>{
  setStartTimer(false);
 setTimerObj({...countTimeObj,hours:countTimeObj.timerTitle.hours,minutes:countTimeObj.timerTitle.minutes,seconds:countTimeObj.timerTitle.seconds });
 console.log(" setTimerObj({...preTimerObj});", preTimerObj);
 
 let timerUpdateObj={
  hours:countTimeObj.timerTitle.hours,
  minutes:countTimeObj.timerTitle.minutes,
  seconds:countTimeObj.timerTitle.seconds 
}
return useUpdateWhenTimerPause(timerObj.timerId,timerUpdateObj);
  

}
  return (
    <View>
      <Text><Text>{`${timerObj.timerTitle.hours}H ${timerObj.timerTitle.minutes}M ${timerObj.timerTitle.seconds}Sec`}</Text></Text>
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