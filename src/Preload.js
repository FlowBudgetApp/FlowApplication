import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Navigation from './Components/NavBar';
import { PaperProvider } from 'react-native-paper';

export default function Preload() {
  /*
  const [opacity] = useState(new Animated.Value(1));
  const [animationComplete, setAnimationComplete] = useState(false);//When the value changes it reruns this code

  useEffect(() => {//ANIMATION FOR THE IMAGEB
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(() => {
      setAnimationComplete(true); //Trigger the Event
    });
  }, []); //Empty [] means that during a rerun it doesn't get called again

  if (!animationComplete) {//GIVE ME MY IMAGE
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/Launch/loading.png')}
          style={[styles.logo, { opacity }]}
        />
      </View>
    );
  }
  */
  return ( //RUN THIS AFTER THE ANIMATION IS COMPLETE
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});