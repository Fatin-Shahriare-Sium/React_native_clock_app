import { LogBox, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClockContextProvider, { useClockData } from '../context/clockContextProvider'
import { Stack } from 'expo-router'

const _layout = () => {
    let x=useClockData();
    useEffect(()=>{
        console.log(")layout alamr data",x);
        
    },[])
  return (
    
          <SafeAreaView style={{height:"100%"}}>
              <ClockContextProvider>
                <Stack screenOptions={{headerShown:false}}>
                   
                   </Stack>
            </ClockContextProvider>
          </SafeAreaView>
    
  )
}

export default _layout

const styles = StyleSheet.create({})