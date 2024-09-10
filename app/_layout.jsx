import { LogBox, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ClockContextProvider from '../context/clockContextProvider'
import { Stack } from 'expo-router'



const _layout = () => {

    useEffect(()=>{
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    },[])
  return (
    <ClockContextProvider>
          <SafeAreaView style={{height:"100%",width:"100%",}}>
            <Stack screenOptions={{headerShown:false}}>
              <Stack.Screen name='timerCountDown' options={{headerShown:false}} />
            </Stack>
           
           
          </SafeAreaView>
    </ClockContextProvider>
         
    
  )
}

export default _layout

const styles = StyleSheet.create({})