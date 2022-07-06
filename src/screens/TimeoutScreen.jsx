import React, { useContext, useState, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
import { AppContext } from '../context/AppContext';
import Timeout from '../components/Timeout';
import plusIcon from '../assets/plusIcon.png';

export default function ChronoScreen() {
  const { state, actions, dispatch } = useContext(AppContext);
  const [itemWidth, setItemWidth] = useState(state.timeouts.length > 3 ? 2 : 1);
  const [isDropArea, setIsDropArea] = useState(false) // pass for prop to Draggable on Timeout

  const handleAddTimeout = () => {
    dispatch(actions.addTimeout(getTimeout()))

  }

  function getTimeout(){
    const id =  'id-false'+ Math.random()*100000;
    return ({
      id: id,
      timeout: ()=>(<Timeout id={id} setIsDropArea={setIsDropArea}  />)
    })
  }

  const AddButton = () => (
    <View style={{ ...styles.AddContainer, width: state.timeouts.length > 3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width }}>            
      <Pressable style={styles.button} onPress={ handleAddTimeout }>
        <Image
          style={styles.buttonImage}
          source={plusIcon}
        />
      </Pressable>
    </View>
  )


  return (
    <View>
      <ScrollView >
            <View style={styles.container}>
              {state.timeouts.map((item, index)=>(
                <View key={item.id} style={{ width: state.timeouts.length > 3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width  }}>
                    {item.timeout()}                
                </View>
              ))}
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