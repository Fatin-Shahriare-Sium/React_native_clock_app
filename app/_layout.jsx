import { LogBox, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClockContextProvider, { useClockData } from '../context/clockContextProvider'
import { Stack } from 'expo-router'


const _layout = () => {
    let x=useClockData();
    useEffect(()=>{
        console.log("layout alamr data",x);
        
    },[])
  return (
    <ClockContextProvider>
          <SafeAreaView style={{height:"100%",width:"100%"}}>
            <Stack screenOptions={{headerShown:false}}>
              
            </Stack>
           
           
          </SafeAreaView>
    </ClockContextProvider>
         
    
  )
}

export default _layout

const styles = StyleSheet.create({})