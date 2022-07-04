import { StyleSheet, ImageBackground, ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import clock from '../assets/clock.png';
import metronome from '../assets/metronome.png';
import sandClock from '../assets/sandclock.png';

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function HomeScreen({ navigation }) {
  const onNavigation = (route) => {
      navigation.navigate(route);
  }

  return (
    <ScrollView style={styles.container} >
      
      <TouchableWithoutFeedback onPress={()=>onNavigation('chronoScreen')}>
        <View style={styles.cardContainer}>
          <ImageBackground source={clock} resizeMode="cover" style={styles.imageBackground}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>Cronómetro</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>onNavigation('timeoutScreen')}>
        <View style={styles.cardContainer}>
          <ImageBackground source={sandClock} resizeMode="cover" style={styles.imageBackground}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>Cuenta Atrás</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>onNavigation('intervalScreen')}>
        <View style={styles.cardContainer}>
          <ImageBackground source={metronome} resizeMode="cover" style={styles.imageBackground}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>Intervalos</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardContainer: {
    height:200,
    width: '100%',
    marginBottom: 30,
  },
  imageBackground: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },  
  cardContent: {
    padding: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  }, 
  title: {
    color: '#fff',
    fontSize: 30
  }
})