import { Pressable, StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import playIcon from "../assets/play.png"
import pauseIcon from "../assets/pause.png"
import resetIcon from "../assets/reset.png"
const StopWatch = () => {
    let [mileSec,setMileSec]=useState(0);
    let [sec,setSec]=useState(0);
    let [min,setMin]=useState(0);
    let [hour,setHour]=useState(0);
    let [startStopWatch,setStartStopWatch]=useState(false)
    // useEffect(()=>{
    //     let y=setInterval(()=>{
    //        if(startStopWatch==true){

    //         setSec(sec==60?59:sec+1)
    //         if(sec==60){
    //             setMin(min==60?0:min+1);
    //         }else if(min==60){
    //             setHour(hour+1)
    //         }

    //        }
    //     },1000)
     
    //     return ()=>clearInterval(y);
    // },[startStopWatch,sec,min,hour])
    useEffect(()=>{
      let x=setInterval(()=>{
        if(startStopWatch==true){
          if(mileSec==100){
            setMileSec(0);
          }else{
            setMileSec(mileSec+1)
          }
        }
      },1)
      return ()=>clearInterval(x);
    },[mileSec,startStopWatch])
    
    let handleReset=()=>{
      setStartStopWatch(false)
      setMileSec(0);
      setSec(0);
      setMin(0);
      setHour(0);
    }





  return (
    <View style={styles.stopWatchHolder} >
      <View >
          <View style={styles.stopWatchWrapper}>
            {hour? <Text style={styles.numberOfWatch}>{hour?`${hour}:${min}:${sec}`:sec}</Text>:
            <Text style={styles.numberOfWatch} >{min?`${min}:${sec}`:sec}</Text>}
            <Text style={styles.numberOfWatch}>{mileSec}</Text>
          </View>

          <View style={styles.stopWatchController}>
              <Pressable onPress={()=>setStartStopWatch(!startStopWatch)}>
                    <Image source={startStopWatch?pauseIcon:playIcon}/>
              </Pressable>
              <Pressable onPress={handleReset} >
                <Image source={resetIcon}/>
              </Pressable>
          </View>
            
      </View>
      
    </View>
  )
}

export default StopWatch

const styles = StyleSheet.create({
  stopWatchHolder:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:Dimensions.get("window").height
  },
  stopWatchWrapper:{
    borderRadius:"50%",
    width:Dimensions.get("window").width*.7,
    height:Dimensions.get("window").height*.3,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    border:"30px solid #1c1919"
   
  },
  numberOfWatch:{

  },
  stopWatchController:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  }
})