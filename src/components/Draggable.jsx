import React, { useRef, useState, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Pressable } from "react-native";

const App = ({ dropLimit }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const DropLimit = useRef(dropLimit);
  const isDraggable = useRef(false);
  const isDropArea = useRef(false);

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
            if(gesture.moveY < DropLimit.current){
              isDropArea.current = true;
            } 
            if(gesture.moveY > DropLimit.current){
              isDropArea.current = false;
            } 
          }
        }),
      onPanResponderRelease: (e, gesture ) => {
        isDraggable.current = false;

        if(!isDropArea.current){
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }

        if(isDropArea.current){
          console.log('dropped')
          pan.flattenOffset(); //set actual posicion to 0,0. return actual difference
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
        <Pressable onLongPress={()=>{isDraggable.current = true}} >
          <View style={styles.box} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 20,
    width: 20,
    backgroundColor: "blue",
    borderRadius: 50
  }
});

export default App;