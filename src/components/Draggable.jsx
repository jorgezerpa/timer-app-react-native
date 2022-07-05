import React, { useRef, useState, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Pressable, Dimensions } from "react-native";

const App = ({ setIsDropArea, dropLimit, handleDeleteItem, isDropArea, children }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const DropLimit = useRef(dropLimit);
  const isDraggable = useRef(false);
  // const isDropArea = useRef(false); // elevated on level for animation purposes 

  useEffect(()=>{
    DropLimit.current = dropLimit;
  }, [dropLimit])


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isDraggable.current,
      onStartShouldSetPanResponderCapture: () => isDraggable.current,
      onMoveShouldSetPanResponder: () => isDraggable.current,
      onMoveShouldSetPanResponderCapture: () => isDraggable.current,

      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [ null, { dx: pan.x, dy: pan.y }],
        {
          useNativeDriver: false,
          listener: (event, gesture) => {
            if(gesture.moveY > (Dimensions.get('window').height - DropLimit.current)){
              isDropArea.current = true;
              setIsDropArea(true)
            } 
            if(gesture.moveY < (Dimensions.get('window').height - DropLimit.current)){
              isDropArea.current = false;
              setIsDropArea(false)
            } 
          }
        }),
      onPanResponderRelease: (e, gesture ) => {
        isDraggable.current = false;
        setIsDropArea(false)

        if(!isDropArea.current){
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }

        if(isDropArea.current){
          // pan.flattenOffset(); //set actual posicion to 0,0. return actual difference
          handleDeleteItem();
        }


      }
    })
  ).current;


  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <Pressable  onLongPress={()=>{isDraggable.current = true}} >
          { children }
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    margin: 0
  },
});

export default App;