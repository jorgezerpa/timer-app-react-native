import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
import { AppContext } from '../context/AppContext';
import Chronometer from '../components/Chronometer';
import plusIcon from '../assets/plusIcon.png';

export default function ChronoScreen({ navigation }) {
  const { state, actions, dispatch } = useContext(AppContext);
  const [isDropArea, setIsDropArea] = useState(false) // pass for prop to Draggable on Chronometer
  // const [offsetToSave, setOffsetToSave] = useState(0);
  const [saveOffset, setSaveOffset] = useState(false);
  
  navigation.addListener('blur', ()=>{
    dispatch(actions.setBlurTimestamp('chronos'));
    setSaveOffset(true);
  })
  
  const handleAddChrono = () => {
    dispatch(actions.addChrono(getChrono()))
  }

  function getChrono(){
    const id =  'id-false'+ Math.random()*100000;
    return ({
      id: id,
      offset: 0, // 10 min
      isRunning: false,
      label: '',
      chrono: (offset, isRunning)=>(<Chronometer saveOffset={saveOffset} id={id} setIsDropArea={setIsDropArea} offset={offset} isRunningProp={isRunning}  />)
    })
  }


  const AddButton = () => (
    <View style={{ ...styles.AddContainer, width: state.chronos.chronos.length > 3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width }}>            
      <Pressable style={styles.button} onPress={ handleAddChrono }>
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
              {state.chronos.chronos.map((item, index)=>{
                let offset = 0;
                if(state.chronos.blurTimestamp && state.chronos.chronos[index].isRunning){
                  const blurTimestamp = state.chronos.blurTimestamp.getTime();
                  const currentDate = new Date().getTime();
                  const difference = Math.abs((Math.floor((currentDate - blurTimestamp)/1000)));
                  offset = difference + state.chronos.chronos[index].offset;
                }
                if(state.chronos.blurTimestamp && !state.chronos.chronos[index].isRunning){
                  offset = state.chronos.chronos[index].offset;
                }

                return(
                <View key={item.id} style={{ position: 'relative', width: state.chronos.chronos.length > 3 ? Dimensions.get('window').width/2 : Dimensions.get('window').width  }}>
                    {item.chrono(offset, state.chronos.chronos[index].isRunning)}                
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



