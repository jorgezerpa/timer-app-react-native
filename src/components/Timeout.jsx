import React, { useContext, useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text,Pressable, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTimer } from 'react-timer-hook';
import { AppContext } from '../context/AppContext';
import { PALETTE } from '../Constants';
import Draggable from './Draggable';


export default function Chronometer({ id, setIsDropArea }) {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds()+600) // by default, clock starts from 10min
    
    const [customexpiryTimestamp, setCustomexpiryTimestamp] = useState(false);
    const { state, actions, dispatch } = useContext(AppContext);
    const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart, } = useTimer({ expiryTimestamp, autoStart: false, onExpire: handleOnExpire });
    
    const [inputTime, setInputTime] = useState({ hours: '00', minutes: '00', seconds: '00' })
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 600); // 10 minutes timer
    const [isInit, setIsInit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const isDropArea = useRef(false);


    useEffect(()=>{
      if(isDropArea.current) setIsDropArea(true);
      if(!isDropArea.current) setIsDropArea(false);
    },[isDropArea])


    const handleRemoveTimeout = () => {
      dispatch(actions.removeTimeout(id))
    }

    const handleReset = () => {
      dispatch(actions.setIsRunning({ object:'timeouts', isRunning:false, id }))
      setIsEnd(false);
      setIsInit(false);
      if(customexpiryTimestamp){
        const newExpiryTimeStamp = new Date();
        newExpiryTimeStamp.setSeconds(newExpiryTimeStamp.getSeconds()+customexpiryTimestamp);
        restart( newExpiryTimeStamp, false);
        return;
      }
      const expiryTimestamp = new Date();
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds()+600) // by default, clock starts from 10min
      restart( expiryTimestamp, false);
    }
    
    const handlePause = () => {
      dispatch(actions.setIsRunning({ object:'timeouts', isRunning:false, id }))
        setIsInit(true);
        pause();
    }

    const handleContinue = () => {
      dispatch(actions.setIsRunning({ object:'timeouts', isRunning:true, id }))
        setIsInit(true)
        resume()
    }

    const handleStart = () => {
      dispatch(actions.setIsRunning({ object:'timeouts', isRunning:true, id }))
        setIsInit(true);
        start();
    }

    const handleIsEditing = () => {
        setIsEditing(true)
    }

    const handleSubmit = () => {

      let { hours, minutes, seconds } = inputTime;
      hours= parseInt(hours);
      minutes = parseInt(minutes);
      seconds = parseInt(seconds);

      if(Number.isNaN(hours)) hours = 0
      if(Number.isNaN(minutes)) minutes = 0
      if(Number.isNaN(seconds)) seconds = 0;

      const totalSeconds = ( hours * 3600 ) + ( minutes * 60 ) + seconds;

      const expiryTimestamp = new Date();
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalSeconds);
      setCustomexpiryTimestamp(totalSeconds);
      restart( expiryTimestamp, false); 

      dispatch(actions.setIsRunning({ object:'timeouts', isRunning:false, id }))
      setIsEditing(false);
    }

    const handleInputChange = (item) => (value) => {
        switch(item){
          case 'hours': setInputTime((prev)=> ({ ...prev, hours: value  }) ); return
          case 'minutes': setInputTime((prev)=> ({ ...prev, minutes: value }) ) ; return
          case 'seconds': setInputTime((prev)=> ({ ...prev, seconds: value }) ) ; return
      }
    }
    

    function handleOnExpire(){
      setIsEnd(true);
    }

    return (
      <Draggable setIsDropArea={setIsDropArea}  isDropArea={isDropArea} dropLimit={150} handleDeleteItem={handleRemoveTimeout} >
          <View style={{...styles.container, width: state.timeouts.timeouts.length>3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width  }}>
              <Pressable onPress={handleIsEditing}>
                { !isEditing && <Text style={{...styles.numbers, fontSize: state.timeouts.timeouts.length>3 ? 30 : 50}} >{hours.toString().padStart(2,'0')} : {minutes.toString().padStart(2,'0')} : {seconds.toString().padStart(2,'0')} </Text> }
                { isEditing && (
                    <>
                      <View style={styles.inputsContainer}>
                          <TextInput value={inputTime.hours} placeholder='00' keyboardType='number-pad' maxLength={2}   onChangeText={ handleInputChange('hours') } onSubmitEditing={handleSubmit} style={{...styles.input, fontSize: state.timeouts.timeouts.length>3 ? 30 : 50, width: state.timeouts.timeouts.length>3 ? 50 : 60,}} />                
                          <TextInput value={inputTime.minutes} placeholder='00' keyboardType='number-pad' maxLength={2} onChangeText={handleInputChange('minutes')} onSubmitEditing={handleSubmit} style={{...styles.input, fontSize: state.timeouts.timeouts.length>3 ? 30 : 50, width: state.timeouts.timeouts.length>3 ? 50 : 60,}} />                
                          <TextInput value={inputTime.seconds} placeholder='00' keyboardType='number-pad' maxLength={2} onChangeText={handleInputChange('seconds')} onSubmitEditing={handleSubmit} style={{...styles.input, fontSize: state.timeouts.timeouts.length>3 ? 30 : 50, width: state.timeouts.timeouts.length>3 ? 50 : 60,}} />                
                      </View>

                      <View style={styles.buttonContainer} >
                        <Pressable style={styles.button} onPress={ ()=>{setIsEditing(false)} }>
                            <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.secondary.main, PALETTE.secondary.light]}>
                                <Text style={styles.buttonText}> cancelar </Text>
                            </LinearGradient>
                        </Pressable>
                      </View>

                    </>
                    
                )}
              </Pressable>
              
            { !isEditing && (
                <>
                    <View style={styles.buttonContainer}>  
                        {(!isInit && !isEnd) &&  (
                            <Pressable style={styles.button} onPress={ handleStart }>
                                <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.primary.main, PALETTE.primary.light]}>
                                    <Text style={styles.buttonText}> iniciar </Text>
                                </LinearGradient>
                            </Pressable>
                        )}
                        {(isInit && !isEnd) && (
                            <Pressable style={styles.button} onPress={ isRunning ? handlePause : handleContinue }>   
                                <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.primary.main, PALETTE.primary.light]}>
                                    <Text style={styles.buttonText}>{ isRunning ? 'parar' : 'continuar' }</Text>
                                </LinearGradient>
                            </Pressable>
                        )}
                        {(isInit && !isRunning ) && (
                            <Pressable style={styles.button} onPress={ handleReset }>
                            <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.secondary.main, PALETTE.secondary.light]}>
                                <Text style={styles.buttonText}> reiniciar </Text>
                            </LinearGradient>
                            </Pressable>
                        )}
                        </View>
                        
                        <View style={styles.spacing}></View>
                        <TextInput style={styles.title} placeholder='bloque' />
                </>
            )}
            </View>
      </Draggable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    position:'relative',
    height: Dimensions.get('window').height/3,
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: "#ddd",
  },  
  numbers: {
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },  
  button:{
    marginHorizontal: 1,
    width: 80,
    height: 40,
    borderRadius: 13
  },
  buttonGradient: {
    width: 80,
    height: 40,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  title:{
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    bottom: 0,
  },
  spacing: {
    height: 0,
  },
  inputsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    textAlign: 'center',
    borderColor: 'transparent',
    borderBottomColor: '#4e4',
    borderWidth: 3,
    marginHorizontal: 5
  }
})

