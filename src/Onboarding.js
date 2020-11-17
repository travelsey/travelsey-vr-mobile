import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#0c06c7', '#0c06c7', '#0c06c7'];
const DATA = [
  {
    "key": "3571572",
    "title": "Bored at home and itching to travel?",
    "description": "",
    "image": require('./static/SittingDoodle.png')
  },
  {
    "key": "3571747",
    "title": "Sit back and enjoy Travelsey VR",
    "description": "",
    "image": require('./static/flame-892.png')
  },
  {
    "key": "3571680",
    "title": "I can't wait no more!",
    "description": "",
    "image": require('./static/RunningDoodle.png')
  }
]

export default function App( {navigation} ) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const inputRange = DATA.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: bgs
  })

  // Math to output [0, 1] range for input based on
  // scrollX position and width of the screen. 🤓
  const YOLO = Animated.modulo(
    Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width)
    ),
    1
  )

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '-35deg', '35deg']
  })
  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden/>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, {
          backgroundColor
        }]}
      />
      <Animated.View
        style={{width: height * .65, height: height * .65, borderRadius: 96, backgroundColor: 'rgba(255,255,255,255)', position: 'absolute', top: -height * .2, left: -height * .1,
        transform: [{
          translateX
        },{
          rotate
        }]}}
      />


      <Animated.FlatList
        data={DATA}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        style={{paddingBottom: height * .25}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={item => item.key}
        pagingEnabled
        horizontal
        renderItem={({item, index}) => {
          return <View style={{width, justifyContent: 'center', height: '100%'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={item.image} style={{height: width / 1.5, resizeMode: 'contain'}}/>
            </View>
            <View style={{padding: 20}}>
              <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '800', fontSize: 30, paddingVertical: 10}} numberOfLines={2} >{item.title}</Text>
              {/* <Text style={{color: '#fff', fontWeight: '400', fontSize: 16}}>{item.description}</Text> */}
            </View>
          </View>
        }}
      />
      <View style={{position: 'absolute', bottom: 0, height: height * .25, padding: 20, width, justifyContent: "space-between"}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>          
          <TouchableOpacity onPress={() => { navigation.navigate('Landing') }}>
          <View style={{paddingVertical: 16, paddingHorizontal: 22, borderRadius: 12, backgroundColor: 'black'}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '400', opacity: .9, letterSpacing: 1}}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
          {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp'
            })
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [.6, 1, .6],
              extrapolate: 'clamp'
            })
            return <Animated.View
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                margin: 8,
                opacity,
                backgroundColor: '#fff',
                transform: [{
                  scale
                }]
              }}
            />
          })}
        </View>
      </View>
    </View>
  );
}