import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Text,Pressable, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStopwatch } from 'react-timer-hook';
import { AppContext } from '../context/AppContext';
import { PALETTE } from '../Constants';

export default function Chronometer({ id }) {
    const { state, actions, dispatch } = useContext(AppContext);
    const { seconds, minutes, hours, days, isRunning, start, pause, reset, } = useStopwatch({ });
    const [isInit, setIsInit] = useState(false);
    const [isSmall, setIsSmall] = useState(state.chronos.length > 3 ? true : false);    

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
        <View style={styles.container}>
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
            {(!isRunning && isInit ) && (
              <View style={styles.buttonContainer}>
                <Pressable style={{...styles.button, marginTop:20}} onPress={()=>{handleRemoveChrono()}  }>
                <LinearGradient style={styles.buttonGradient} start={{x:0, y:1}} end={{x:1, y:0}} colors={[PALETTE.danger.main, PALETTE.danger.light]}>
                  <Text style={styles.buttonText}>borrar</Text>
                </LinearGradient>
                </Pressable>
              </View>
            )}

            <View style={styles.spacing}></View>
            <TextInput style={styles.title} placeholder='bloque' />
        </View>
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



































// import React, { useContext, useState, useEffect } from 'react'
// import { StyleSheet, View, Text,Pressable, Dimensions } from 'react-native';
// import { useStopwatch } from 'react-timer-hook';
// import { AppContext } from '../context/AppContext';

// export default function Chronometer({ id }) {
//     const { state, actions, dispatch } = useContext(AppContext);
//     const { seconds, minutes, hours, days, isRunning, start, pause, reset, } = useStopwatch({ });
//     const [isInit, setIsInit] = useState(false);
//     const [isSmall, setIsSmall] = useState(state.chronos.length > 3 ? true : false);    

//     const handleRemoveChrono = () => {
//       dispatch(actions.removeChrono(id))
//     }

//     const handleReset = () => {
//       setIsInit(false);
//       reset();
//     }
    
//     const handlePause = () => {
//       setIsInit(true);
//       pause();
//     }

//     const handleStart = () => {
//         start();
//     }

//     return (
//         <View style={isSmall ? stylesSmall.container : styles.container}>
//             <Text style={isSmall ? stylesSmall.numbers : styles.numbers} >{hours.toString().padStart(2,'0')} : {minutes.toString().padStart(2,'0')} : {seconds.toString().padStart(2,'0')} </Text>
//             <View style={isSmall ? stylesSmall.buttonContainer : styles.buttonContainer}>
              
//               <Pressable style={isSmall ? stylesSmall.button : styles.button} onPress={isRunning ? handlePause : handleStart }>
//                 <Text style={isSmall ? stylesSmall.buttonText : styles.buttonText}>{ isRunning ? 'parar' : 'iniciar' } </Text>
//               </Pressable>
//               { (!isRunning && isInit ) && (
//                 <Pressable style={isSmall ? stylesSmall.button : styles.button} onPress={ handleReset }>
//                   <Text style={styles.buttonText}> reiniciar </Text>
//                 </Pressable>
//               )

//               }

//             </View>
//             {(!isRunning && isInit ) && (
//               <View style={isSmall ? stylesSmall.buttonContainer : styles.buttonContainer}>
//                 <Pressable style={isSmall ? stylesSmall.buttonDelete : styles.buttonDelete} onPress={ handleRemoveChrono }>
//                   <Text style={styles.buttonText}>borrar</Text>
//                 </Pressable>
//               </View>
//             )}

//             <View style={styles.spacing}></View>
//             <Text style={styles.title}>Block 1</Text>
//         </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     paddingTop: 30,
//     position:'relative',
//     height: Dimensions.get('window').height/3,
//     justifyContent: 'flex-start',
//     borderWidth: 3,
//     borderColor: "#ddd",
//   },  
//   numbers: {
//     textAlign: 'center',
//     fontSize: 50,
//     color: '#444',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },  
//   button:{
//     marginHorizontal: 1,
//     paddingVertical: 13,
//     paddingHorizontal: 5,
//     width: 100,
//     backgroundColor:'#44f',
//     borderRadius: 15
//   },
//   buttonDelete:{
//     marginHorizontal: 1,
//     marginTop: 30,
//     paddingVertical: 13,
//     paddingHorizontal: 5,
//     width: 100,
//     backgroundColor:'#44f',
//     borderRadius: 15
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: 'bold'
//   },
//   title:{
//     width: '100%',
//     position: 'absolute',
//     textAlign: 'center',
//     fontSize: 20,
//     color: '#000',
//     bottom: 0,
//   },
//   spacing: {
//     height: 100,
//   }
// })

// const stylesSmall = StyleSheet.create({
//   container: {
//     width: '50%',
//     paddingTop: 20,
//     position:'relative',
//     height: Dimensions.get('window').height/3,
//     justifyContent: 'flex-start',
//     borderWidth: 2,
//     borderColor: "#ddd",
//   },  
//   numbers: {
//     textAlign: 'center',
//     fontSize: 30,
//     color: '#444',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },  
//   button:{
//     marginHorizontal: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 0,
//     width: 80,
//     backgroundColor:'#44f',
//     borderRadius: 13
//   },
//   buttonDelete:{
//     marginHorizontal: 1,
//     marginTop: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 0,
//     width: 80,
//     backgroundColor:'#44f',
//     borderRadius: 13
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: 'bold'
//   },
//   title:{
//     width: '100%',
//     position: 'absolute',
//     textAlign: 'center',
//     fontSize: 20,
//     color: '#000',
//     bottom: 0,
//   },
//   spacing: {
//     height: 0,
//   }
// })





