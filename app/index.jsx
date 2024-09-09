import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image } from 'react-native';
import TimerBox from '../components/timerBox';
import calx from "../assets/calender.png"
import * as Notifications from 'expo-notifications';
export default function App() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      let date = new Date();
      //Add 10 seconds to the current date to test it.
      date.setSeconds(date.getSeconds() + 10);

      async function doingNotificationSchedule(params) {
       
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
              title: "Alarm",
              body: "It is time to wake up!",
              color:"blue",
            
            },
            trigger: {
              date:date,
              seconds:10,
              channelId:"default"
            },
          });
          console.log("schedul noti",identifier);
          
    }

    

  return (
    <SafeAreaView>
        <ScrollView>
            <TimerBox></TimerBox>
          
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
