import { StyleSheet, Text, View,Pressable,Image, Dimensions } from 'react-native'
import React, { useState,useEffect } from 'react'
import playBtn from "../assets/play.png"
import pauseBtn from "../assets/pause.png"
import resetBtn from "../assets/reset.png"
import closeBtn from "../assets/close.png"
import useUpdateWhenTimerPause from '../hooks/useUpdateWhenTimerPause'
import useDeleteTimer from '../hooks/useDeleteTimer'
import { useClockData } from '../context/clockContextProvider'
const CountDownBox = ({countTimeObj}) => {
  let {tiggerReloadData}=useClockData();
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
 
      let timerUpdateObj={
        hours:countTimeObj.timerTitle.hours,
        minutes:countTimeObj.timerTitle.minutes,
        seconds:countTimeObj.timerTitle.seconds 
      }
    return useUpdateWhenTimerPause(timerObj.timerId,timerUpdateObj);
}

let deleteTimer=()=>{
  useDeleteTimer(timerObj.timerId);
  return tiggerReloadData();
}
  return (
    <View  style={{position:"relative",backgroundColor:"#1c1919",margin:8,width:Dimensions.get("screen").width*.9,padding:5,borderRadius:15}}>
        <Text style={styles.timerTitle}>{`${String(timerObj.timerTitle.hours).padStart(2,"0")}H ${String(timerObj.timerTitle.minutes).padStart(2,"0")}M ${String(timerObj.timerTitle.seconds).padStart(2,"0")}Sec`}</Text>
       
      <View style={styles.countDownBoxBody}>
            <View>
                    <Text style={styles.countText}>{`${String(timerObj.hours).padStart(2,"0")}:${String(timerObj.minutes).padStart(2,"0")}:${String(timerObj.seconds).padStart(2,"0")}`}</Text>
            </View>

              <View style={styles.countBoxController}> 
                  <Pressable style={styles.controllerBtn}  onPress={()=>{handlePlayPauseBtn()}}>
                        <Image style={{height:30,width:30}} source={startTimer?pauseBtn:playBtn}/>
                  </Pressable>

                  <Pressable style={styles.controllerBtn} onPress={()=>{resetTimerFunc()}}>
                        <Image style={{height:30,width:30}} source={resetBtn}/>
                  </Pressable>
              </View>
      </View>
      <View style={styles.closeWrapper}>
        <Pressable onPress={()=>deleteTimer()} >
            <Image  style={{width:20,height:20}} source={closeBtn}/>
        </Pressable>
      </View>

    </View>
  )
}

export default CountDownBox;

const styles = StyleSheet.create({
  countDownBoxBody:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
  },
  countBoxController:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  countText:{
    color:"white",
    fontWeight:"500",
    fontSize:30
  },
  controllerBtn:{
    backgroundColor:"#98c698",
    padding:5,
    borderRadius:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    margin:5
  },
  timerTitle:{
    color:"white",
    fontWeight:"500",
    fontSize:15
  },
  closeWrapper:{
    backgroundColor:"#98c698",
    position:"absolute",
    left:"93%",
    top:"7%",
    borderRadius:30
  }
})