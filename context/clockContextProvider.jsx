import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
let ClockContext=React.createContext({alarmData:[]});
export let useClockData=()=>{useContext(ClockContext)};
const ClockContextProvider = ({children}) => {
    let [alarmDataArray,setAlarmDataArray]=useState([]);
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
                console.log("alarmDataArray",alarmDataArray);
              }
              });
            
           
            });
          });
    
          console.log("alarmDataArray",alarmDataArray);
    },[])
  return (
    <ClockContext.Provider value={{alarmData:alarmDataArray}}>
    {children}
    </ClockContext.Provider>
  )
}

export default ClockContextProvider