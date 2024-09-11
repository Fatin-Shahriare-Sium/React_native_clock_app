import { StyleSheet, Text, View,Modal,TextInput,Dimensions, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import uuid from 'react-native-uuid'
const CreateTimerModal = ({handleModalFunc,isModalShow}) => {
    const ref = React.useRef();
    let [collectTimeObj,setCollectTimeObj]=useState({hours:0,minutes:0,seconds:0});
    let updateCollectTime=(value,type)=>{
        if(value>60){
            ref.current.focus()
        }
        if(type=="hours"){
           return setCollectTimeObj({...collectTimeObj,hours:value>12?12:value})
        }else if(type=="minutes"){
            return setCollectTimeObj({...collectTimeObj,minutes:value>60?60:value})
        }else if(type=="seconds"){
            return setCollectTimeObj({...collectTimeObj,seconds:value>60?60:value})
        }
    }
  return (
    <View>
      <Modal animationType="slide" visible={isModalShow}>
       <View style={styles.modalWrapper}>
            <View style={styles.timerInputBoxWrapper}>
                <View style={styles.timerInputBoxOneWrapper}>
                <TextInput 
                ref={ref}
                style={styles.timerInputBox}
                value={collectTimeObj.hours}
                    keyboardType='numeric'
                    onChangeText={(val)=>{updateCollectTime(val,"hours")}}
                    maxLength={2}  //setting limit of input
                />
                <Text>H</Text>
                </View>
                <View style={styles.timerInputBoxOneWrapper}>
                <TextInput 
                style={styles.timerInputBox}
                value={collectTimeObj.minutes}
                    keyboardType='numeric'
                    onChangeText={(e)=>{updateCollectTime(e,"minutes")}}
                    maxLength={2}  //setting limit of input
                />
                <Text>m</Text>
                </View>
                <View style={styles.timerInputBoxOneWrapper}>
                <TextInput 
                style={styles.timerInputBox}
                value={collectTimeObj.seconds}
                    keyboardType='numeric'
                    onChangeText={(e)=>{updateCollectTime(e,"seconds")}}
                    maxLength={2}  //setting limit of input
                     
                />
                <Text>s</Text>
                </View>

            </View>

            <View style={{bottom:70,backgroundColor:"red",padding:3,borderRadius:5}}>
                     <TouchableOpacity onPress={()=>handleModalFunc({...collectTimeObj,timerTitle:collectTimeObj,timerId:uuid.v4()})}>
                        <Text style={styles.addBtn}>Add Timer</Text>
                        </TouchableOpacity>
            </View>


       </View>
     </Modal>
    </View>
  )
}

export default CreateTimerModal;

const styles = StyleSheet.create({
    modalWrapper:{
        position:"relative",
        height:Dimensions.get('window').height,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        
    },
    timerInputBoxWrapper:{
        width:Dimensions.get('window').width*.5,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        bottom:90,
    },
    timerInputBoxOneWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    timerInputBox:{
        width:30,
        backgroundColor:"#98c698",
        borderRadius:3
    },
    addBtn:{
        backgroundColor:"red",
        fontWeight:"500",
    }
})