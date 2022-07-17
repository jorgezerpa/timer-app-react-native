import React, { useContext, useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text,Pressable, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStopwatch } from 'react-timer-hook';
import { AppContext } from '../context/AppContext';
import { PALETTE } from '../Constants';
import Draggable from './Draggable';

export default function Chronometer({ id, setIsDropArea }) {
    const { state, actions, dispatch } = useContext(AppContext);
    const { seconds, minutes, hours, isRunning, start, pause, reset, } = useStopwatch({ });
    const [isInit, setIsInit] = useState(false);
    const isDropArea = useRef(false);

    useEffect(()=>{
      if(isDropArea.current) setIsDropArea(true);
      if(!isDropArea.current) setIsDropArea(false);
    },[isDropArea])


    const handleRemoveChrono = () => {
      dispatch(actions.removeChrono(id))
    }

    const handleReset = () => {
      setIsInit(false);
      reset(null, false);
    }
    
    const handlePause = () => {
      setIsInit(true);
      pause();
    }

    const handleStart = () => {
        start();
    }

    return (
      <Draggable setIsDropArea={setIsDropArea}  isDropArea={isDropArea} dropLimit={150} handleDeleteItem={handleRemoveChrono} >
          <View style={{...styles.container, width: state.chronos.length>3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width  }}>
              <Text style={{...styles.numbers, fontSize: state.chronos.length>3 ? 30 : 50}} >{hours.toString().padStart(2,'0')} : {minutes.toString().padStart(2,'0')} : {seconds.toString().padStart(2,'0')} </Text>
              <View style={styles.buttonContainer}>
                
                <Pressable style={styles.button} onPress={isRunning ? handlePause : handleStart }>
                  <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.primary.main, PALETTE.primary.light]}>
                    { !isInit && <Text style={styles.buttonText}>{ isRunning ? 'parar' : 'iniciar' } </Text>}
                    { isInit && <Text style={styles.buttonText}> { isRunning ? 'parar' : 'continuar' }  </Text> }
                  </LinearGradient>
                </Pressable>
                { (!isRunning && isInit ) && (
                  <Pressable style={styles.button} onPress={ handleReset }>
                  <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.secondary.main, PALETTE.secondary.light]}>
                    <Text style={styles.buttonText}> reiniciar </Text>
                  </LinearGradient>
                  </Pressable>
                )
                }

              </View>
              {/* {(!isRunning && isInit ) && (
                <View style={styles.buttonContainer}>
                  <Pressable style={{...styles.button, marginTop:20}} onPress={()=>{handleRemoveChrono()}  }>
                  <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.danger.main, PALETTE.danger.light]}>
                    <Text style={styles.buttonText}>borrar</Text>
                  </LinearGradient>
                  </Pressable>
                </View>
              )} */}

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

