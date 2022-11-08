import React, {useRef} from 'react';
import {Animated, Dimensions, Easing, StyleSheet} from 'react-native';
import {ImagesLorem} from './Images'
import * as Animatable from 'react-native-animatable';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Main = () => {

    const nativeAnimations = false

    function fadeIn(ref: any, delay: number) {
        Animated.timing(ref, {
            useNativeDriver: false,
            duration: 600 * delay,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }).start()
    }
    function fromLeft(ref: any, delay: number) {
        Animated.timing(ref, {
            useNativeDriver: false,
            duration: 1000 * delay,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }).start()
    }

    if (nativeAnimations)    return (
        <>
            {
                ImagesLorem.map((el: { id: number, url: string }, index: number) => {
                    const opacity = useRef(new Animated.Value(0)).current;
                    const translateX = useRef(new Animated.Value(-100)).current;
                    fadeIn(opacity, index)
                    fromLeft(translateX, index)
                    return (
                        <Animated.Image
                            key={'image-' + index}
                            source={{uri: el.url}}
                            style={[styles.image, {opacity, transform:[{translateX}]}]}
                            resizeMode={'contain'}
                        />
                    )
                })
            }

        </>
    )
    else return (
        <>
            {
                ImagesLorem.map((el: { id: number, url: string }, index: number) => {

                    return (
                        <Animatable.Image
                            animation={'bounceInRight'}
                            delay={500 * index}
                            key={'image-' + index}
                            source={{uri: el.url}}
                            style={styles.image}
                            resizeMode={'contain'}
                        />
                    )
                })
            }

        </>
    )

}
const styles = StyleSheet.create({
    image: {
        width: WIDTH * .4,
        height: WIDTH * .4
    }
});

export default Main;