import React, { useContext, useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text,Pressable, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTimer } from 'react-timer-hook';
import { AppContext } from '../context/AppContext';
import { PALETTE } from '../Constants';
import Draggable from './Draggable';

export default function Chronometer({ id, setIsDropArea }) {
    const { state, actions, dispatch } = useContext(AppContext);
    
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 600); // 10 minutes timer
    const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart, } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.warn('onExpire called') });
    
    const [isInit, setIsInit] = useState(false);
    const isDropArea = useRef(false);

    useEffect(()=>{
      if(isDropArea.current) setIsDropArea(true);
      if(!isDropArea.current) setIsDropArea(false);
    },[isDropArea])


    const handleRemoveTimeout = () => {
      dispatch(actions.removeTimeout(id))
    }

    const handleReset = () => {
      setIsInit(false);
      restart(expiryTimestamp, false);
    }
    
    const handlePause = () => {
        setIsInit(true);
        pause();
    }

    const handleContinue = () => {
        resume()
    }

    const handleStart = () => {
        setIsInit(true);
        start();
    }

    return (
      <Draggable setIsDropArea={setIsDropArea}  isDropArea={isDropArea} dropLimit={150} handleDeleteItem={handleRemoveTimeout} >
          <View style={{...styles.container, width: state.chronos.length>3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width  }}>
              <Text style={{...styles.numbers, fontSize: state.chronos.length>3 ? 30 : 50}} >{hours.toString().padStart(2,'0')} : {minutes.toString().padStart(2,'0')} : {seconds.toString().padStart(2,'0')} </Text>
              <View style={styles.buttonContainer}>
                
                {!isInit && (
                    <Pressable style={styles.button} onPress={ handleStart }>
                        <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.primary.main, PALETTE.primary.light]}>
                            <Text style={styles.buttonText}> iniciar </Text>
                        </LinearGradient>
                    </Pressable>
                )}
                {isInit && (
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
  }
})

