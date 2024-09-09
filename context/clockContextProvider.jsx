import { View, Text } from 'react-native'
import React, { useContext, createContext,useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
let ClockContext=createContext();
console.log("clock context in provider main",ClockContext);

export let useClockData=()=>useContext(ClockContext);
const ClockContextProvider = ({children}) => {
    let [alarmDataArray,setAlarmDataArray]=useState([]);
    let [needReload,setNeedReload]=useState(false)
    useEffect(()=>{
   
        AsyncStorage.getAllKeys((err, keys) => {
      
            AsyncStorage.multiGet(keys, (err, stores) => {
                console.log("keys",keys.length);
                let keyesLength=keys.length
                let keepDataArray=[];
                
              stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];
                console.log(i);
                
                // console.log("value in stirage",value);
                keepDataArray.push(JSON.parse(value))
                if(keys.length==i+1){
                    console.log("I=",i+1);
                    
                console.log(keepDataArray);
                setAlarmDataArray([...keepDataArray]);
              }
              });
            
           
            });
          });
    
          
    },[needReload])
    let tiggerReloadData=()=>{
      setNeedReload(!needReload);
    }
  return (
    <ClockContext.Provider value={{alarmData:alarmDataArray,setAlarmDataArrayFuc:setAlarmDataArray,tiggerReloadData}}>
        {console.log("alarmDataArray in main settinhxsdyhc",alarmDataArray)}
    {children}
    </ClockContext.Provider>
  )
}

export default ClockContextProvider