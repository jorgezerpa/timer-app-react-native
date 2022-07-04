import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { AppContextProvider } from './src/context/AppContext';

export default function App() {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <View style={styles.paddingTop}></View>
        <Navigation />
      </AppContextProvider>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 30
  }
})

