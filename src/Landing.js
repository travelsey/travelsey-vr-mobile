import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./styles/SliderEntry.style";
import SliderEntry from "./components/SliderEntry";
import styles, { colors } from "./styles/index.style";
import { ENTRIES1 } from "./static/entries";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

export default class Landing extends Component {
  static navigationOptions = {
    title: "Landing",
    headerStyle: {
      backgroundColor: "#73C6B6",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  // _renderItem ({item, index}) {
  //     return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  // }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  places() {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Travelsey VR`}</Text>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const places = this.places();

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {places}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
