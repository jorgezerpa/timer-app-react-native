import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Pressable, Dimensions, Text } from 'react-native';
import { AppContext } from '../context/AppContext';
import Chronometer from '../components/Chronometer';

export default function ChronoScreen() {
  const { state, actions, dispatch } = useContext(AppContext);

  const handleAddChrono = () => {
    dispatch(actions.addChrono(getChrono()))

  }

  function getChrono(){
    const id =  'id-false'+ Math.random()*100000;
    return ({
      id: id,
      chrono: ()=>(<Chronometer id={id}  />)
    })
  }


  const AddButton = () => (
    <View style={ styles.AddContainer }>            
      <Pressable style={styles.button} onPress={ handleAddChrono }>
          <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  )


  return (
    <View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={()=>AddButton()}
        data={state.chronos}
        renderItem={({item})=>{ return item.chrono(); }}
        keyExtractor={ item => item.id}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  AddContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height/3,
    borderWidth: 4,
    borderColor: "#ddd",
  },  
  button:{
    paddingVertical: 15,
    paddingHorizontal: 5,
    width: 100,
    backgroundColor:'#4ff',
    borderRadius: 15
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
})













// import React, { useContext, useState, useEffect } from 'react'
// import { View, FlatList, StyleSheet, Pressable, Dimensions, Text } from 'react-native';
// import { AppContext } from '../context/AppContext';
// import Chronometer from '../components/Chronometer';

// export default function ChronoScreen() {
//   const { state, actions, dispatch } = useContext(AppContext);
//   const [isSmall, setIsSmall] = useState(false);    

//   useEffect(()=>{
//     if(state.chronos.length > 3) setIsSmall(true);
//     if(state.chronos.length <= 3) setIsSmall(false);
//   },[state])

//   const handleAddChrono = () => {
//     dispatch(actions.addChrono(getChrono()))

//   }

//   function getChrono(){
//     const id =  'id-false'+ Math.random()*100000;
//     return ({
//       id: id,
//       chrono: ()=>(<Chronometer id={id} IsSmall={isSmall} />)
//     })
//   }


//   const AddButton = () => (
//     <View style={ styles.AddContainer }>            
//       <Pressable style={styles.button} onPress={ handleAddChrono }>
//           <Text style={styles.buttonText}>Add</Text>
//       </Pressable>
//     </View>
//   )


//   return (
//     <View>
//       <FlatList
//         numColumns={isSmall ? 2 : 1}
//         key={isSmall ? '__' : '##'}
//         showsVerticalScrollIndicator={false}
//         ListFooterComponent={()=>AddButton()}
//         data={state.chronos}
//         renderItem={({item})=>{ return item.chrono(); }}
//         keyExtractor={ item => item.id}
//       />
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   AddContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: Dimensions.get('window').height/3,
//     borderWidth: 4,
//     borderColor: "#ddd",
//   },  
//   button:{
//     paddingVertical: 15,
//     paddingHorizontal: 5,
//     width: 100,
//     backgroundColor:'#4ff',
//     borderRadius: 15
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: 'bold'
//   },
// })