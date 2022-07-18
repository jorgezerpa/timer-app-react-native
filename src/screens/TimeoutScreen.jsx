import React, { useContext, useState, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
import { AppContext } from '../context/AppContext';
import Timeout from '../components/Timeout';
import plusIcon from '../assets/plusIcon.png';

export default function TimeoutScreen({ navigation }) {
  const { state, actions, dispatch } = useContext(AppContext);
  const [isDropArea, setIsDropArea] = useState(false) // pass for prop to Draggable on Timeout


  navigation.addListener('blur', ()=>{
    dispatch(actions.setBlurTimestamp('timeouts'))
  })
  

  const handleAddTimeout = () => {
    dispatch(actions.addTimeout(getTimeout()))

  }

  function getTimeout(){
    const id =  'id-false'+ Math.random()*100000;
    return ({
      expiryInit: 600, //default===10 minutes
      id: id,
      offset: 600, //in this case, offset === currentExpiryTimestamp // default 10min
      isRunning: false,
      label: '',
      timeout: (difference, isRunning)=>(<Timeout id={id} setIsDropArea={setIsDropArea} isRunningProp={isRunning} difference={difference}  />)
    })
  }

  const AddButton = () => (
    <View style={{ ...styles.AddContainer, width: state.timeouts.timeouts.length > 3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width }}>            
      <Pressable style={styles.button} onPress={ handleAddTimeout }>
        <Image
          style={styles.buttonImage}
          source={plusIcon}
        />
      </Pressable>
    </View>
  )

    // console.log(state.timeouts);
    
  return (
    <View>
      <ScrollView >
            <View style={styles.container}>
              {state.timeouts.timeouts.map((item, index)=>{
                  let difference = 0;
                  if(state.timeouts.timeouts[index].isRunning && state.timeouts.blurTimestamp){
                    const current = new Date().getTime();
                    const blur = state.timeouts.blurTimestamp.getTime();
                    difference = Math.abs(Math.floor( current/1000 - blur/1000 ))
                  }
                  if(!state.timeouts.timeouts[index].isRunning && state.timeouts.blurTimestamp){
                    difference = 0;
                  }

                return(
                <View key={item.id} style={{ width: state.timeouts.timeouts.length > 3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width  }}>
                    {item.timeout(difference, state.timeouts.timeouts[index].isRunning)}                
                </View>
                )
                })}
              {AddButton()}
            </View>


      </ScrollView>
        { isDropArea && (
              <View style={styles.trash}>
                <Text>Drop me here</Text>
              </View>
        )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: "row",
    flexWrap: "wrap",
  },  
  AddContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height/3,
    borderWidth: 4,
    borderColor: "#ddd",
  },  
  button:{
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#E4E4E4',
    borderRadius: 15
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  trash: {
    // display: 'none',
    position: 'absolute',
    top: Dimensions.get('window').height-150,
    height: 150,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    opacity: .4,
  }
})



















// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import Timeout from '../components/Timeout';


// export default function TimeoutScreen() {
//   const [isDropArea, setIsDropArea] = useState(false) // pass for prop to Draggable on Chronometer

//   return (
//     <View>
//       <Timeout setIsDropArea={setIsDropArea} />
//     </View>
//   )
// }