import React, { Component } from 'react';
import { View, Button, Modal, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import Video360 from "react-native-video360";

export default class SliderEntry extends Component {

    state = {  
    isVisible: false, //state of modal default false  
  }  

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }

    render () {
        

        const { data: { title, subtitle, videourl }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
             <View>  
        <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          visible = {this.state.isVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          

          <View style={{ flex: 1, backgroundColor: 'black' }}>
		<View style={{ position: 'absolute', top: 20, left: 15, zIndex: 10 }}>
		<TouchableWithoutFeedback onPress={() => { this.setState({ isVisible:!this.state.isVisible}) }}>
		<Text style={{ color: 'white' }}>close</Text>
		</TouchableWithoutFeedback>
		</View>
	    <Video360 urlVideo={ videourl } modeVideo={1} style={{ flex: 1}} />
	    </View>  
        </Modal>  
        

            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { this.setState({ isVisible: true}) }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
            </View>
        );
    }
}
