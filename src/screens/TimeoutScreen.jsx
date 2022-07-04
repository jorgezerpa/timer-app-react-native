import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import Draggable from '../components/Draggable';

export default function TimeoutScreen() {
  const [dropLimit, setDropLimit] = useState(null);
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone} onLayout={(e)=>{
        const layout = e.nativeEvent.layout;
        const dropBottom = layout.height + layout.y;
        setDropLimit(dropBottom)
      }} >
        <Text style={styles.text}>Drop them here!</Text>
      </View>
      <View style={styles.ballContainer} />
      <View style={styles.row}>
        <Draggable dropLimit={dropLimit} />
        <Draggable dropLimit={dropLimit} />
        <Draggable dropLimit={dropLimit} />
        <Draggable dropLimit={dropLimit} />
        <Draggable dropLimit={dropLimit} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height:200
  },
  row: {
    flexDirection: "row"
  },  
  dropZone: {
    height: 200,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
});