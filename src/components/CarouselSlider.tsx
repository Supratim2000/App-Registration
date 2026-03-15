import React, { useLayoutEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CarouselSliderProps } from '../utils/ProjectTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { unstable_hasStaticViewConfig } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';

const CarouselSlider = <T, >({ heading, data, renderItem, keyExtractor, onItemPress } : CarouselSliderProps<T>): React.JSX.Element => {
    const flatListRef = useRef<FlatList<T>>(null);
    const scrollOffset = useRef<number>(0);
    const contentTotalWidth = useRef<number>(0);
    const visibleLayoutWidth = useRef<number>(0);
    const [snapInterval, setSnapInterval] = useState<number>(0);
    let [arrowVisibility, setArrowVisibility] = useState<any>({
        left: false,
        right: true
    });
    const leftArrowOpacity = useRef(new Animated.Value(0)).current;
    const rightArrowOpacity = useRef(new Animated.Value(1)).current;

    const scrollRight = () => {
        const maxOffset = contentTotalWidth.current - visibleLayoutWidth.current;
        scrollOffset.current = Math.min(scrollOffset.current + snapInterval, maxOffset);

        flatListRef.current?.scrollToOffset({
        offset: scrollOffset.current,
        animated: true
        });
    }

    const scrollLeft = () => {
      scrollOffset.current = Math.max(scrollOffset.current - snapInterval, 0);

      flatListRef.current?.scrollToOffset({
        offset: scrollOffset.current,
        animated: true
      });
    }

    return (
        <>
            { heading && <Text style={styles.heading}>{heading}</Text> }
            <View style={styles.container}>
                <Animated.View 
                    style={[styles.arrowButton, styles.arrowLeft, {opacity: leftArrowOpacity}]}
                    pointerEvents={arrowVisibility.left ? "auto" : "none"}
                >
                    <TouchableOpacity activeOpacity={1.0} onPress={scrollLeft}>
                        <Icon name="chevron-left" size={26} color="#333" />
                    </TouchableOpacity>
                </Animated.View>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    horizontal
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={snapInterval || undefined}
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    renderItem={(info) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => onItemPress?.(info.item, info.index)}
                                style={{ backgroundColor: '#bb2a2a'}}
                                onLayout={(event) => {
                                        const { width, height, x, y } = event.nativeEvent.layout;
                                        if (snapInterval === 0) {
                                            setSnapInterval(width + 2 * x);
                                        }
                                    }}
                            >
                                {renderItem(info)}
                            </TouchableOpacity>
                        )
                    }}
                    onLayout={(event) => {
                        visibleLayoutWidth.current = event.nativeEvent.layout.width;
                    }}
                    onContentSizeChange={(width) => {
                        contentTotalWidth.current = width;
                    }}
                    onScroll={(event) => {
                        const offset = event.nativeEvent.contentOffset.x;
                        scrollOffset.current = offset;

                        console.log(scrollOffset.current);
                    }}
                    onMomentumScrollEnd = {(event) => {
                        const offset = event.nativeEvent.contentOffset.x;
                        const contentWidth = event.nativeEvent.contentSize.width;
                        const layoutWidth = event.nativeEvent.layoutMeasurement.width;
                    
                        const maxOffset = contentWidth - layoutWidth;
                    
                        const isLeftArrowVisible = offset > 3;
                        const isRightArrowVisible = offset < maxOffset - 3;
                    
                        Animated.timing(leftArrowOpacity, {
                            toValue: isLeftArrowVisible ? 1 : 0,
                            duration: 100,
                            useNativeDriver: true
                        }).start();
                    
                        Animated.timing(rightArrowOpacity, {
                            toValue: isRightArrowVisible ? 1 : 0,
                            duration: 100,
                            useNativeDriver: true
                        }).start();
                    
                        setArrowVisibility((prev: any) => {
                            if (prev.left === isLeftArrowVisible && prev.right === isRightArrowVisible) {return prev;}
                            return {
                                left: isLeftArrowVisible,
                                right: isRightArrowVisible
                            };
                        });
                }}/>
                <Animated.View
                    style={[styles.arrowButton, styles.arrowRight, {opacity : rightArrowOpacity}]}
                    pointerEvents={arrowVisibility.right ? "auto" : "none"}
                >
                    <TouchableOpacity activeOpacity={1.0} onPress={scrollRight}>
                        <Icon name="chevron-right" size={26} color="#333" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginLeft: 16
    },
    arrowButton: {
        position: "absolute",
        top: "40%",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.9)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
        zIndex: 10
    },
    arrowLeft: {
        left: 8
    },
    arrowRight: {
        right: 8
    },
});

export default CarouselSlider;