import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CarouselSliderProps } from '../utils/ProjectTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListRenderItemInfo } from 'react-native';

const CarouselSliderComponent = <T, >({ heading, data, renderItem, keyExtractor, onItemPress, containerStyle } : CarouselSliderProps<T>): React.JSX.Element => {
    const flatListRef = useRef<FlatList<T>>(null);
    const scrollOffset = useRef<number>(0);
    const contentTotalWidth = useRef<number>(0);
    const visibleLayoutWidth = useRef<number>(0);
    const leftArrowOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
    const rightArrowOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
    
    const [snapInterval, setSnapInterval] = useState<number>(0);
    let [arrowVisibility, setArrowVisibility] = useState<any>({
        left: false,
        right: true
    });

    const renderFlatListItem = useCallback((info: ListRenderItemInfo<T>): React.JSX.Element => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onItemPress?.(info.item, info.index)}
                onLayout={(event) => {
                    const { width, x } = event.nativeEvent.layout;
                    if (snapInterval === 0) {
                        const snappingDistance = width + 2 * x;
                        setSnapInterval(snappingDistance);
                    }
                }}
            >
                {renderItem(info)}
            </TouchableOpacity>
        );
    },[onItemPress, renderItem, snapInterval]);

    const scrollRight = useCallback((): void => {
        const maxOffset = contentTotalWidth.current - visibleLayoutWidth.current;
        scrollOffset.current = Math.min(scrollOffset.current + snapInterval, maxOffset);

        flatListRef.current?.scrollToOffset({
            offset: scrollOffset.current,
            animated: true
        });
    }, [snapInterval]);

    const scrollLeft = useCallback((): void => {
        scrollOffset.current = Math.max(scrollOffset.current - snapInterval, 0);

        flatListRef.current?.scrollToOffset({
            offset: scrollOffset.current,
            animated: true
        });
    }, [snapInterval]);

    const maintainSlidingArrowVisibility = (isLeftArrowVisible: boolean, isRightArrowVisible: boolean): void => {
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
            return ((prev.left === isLeftArrowVisible && prev.right === isRightArrowVisible) ? prev : { left: isLeftArrowVisible, right: isRightArrowVisible });
        });
    }

    return (
        <View style={[styles.masterContainer, containerStyle]}>
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
                    snapToInterval={snapInterval}
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    renderItem={renderFlatListItem}
                    onLayout={(event) => {
                        visibleLayoutWidth.current = event.nativeEvent.layout.width;
                    }}
                    onContentSizeChange={(width) => {
                        contentTotalWidth.current = width;
                    }}
                    onScroll={(event) => {
                        const offset = event.nativeEvent.contentOffset.x;
                        scrollOffset.current = offset;
                    }}
                    onMomentumScrollEnd = {(event) => {
                        const maxOffset = contentTotalWidth.current - visibleLayoutWidth.current;
                        const isLeftArrowVisible = scrollOffset.current > 3;
                        const isRightArrowVisible = scrollOffset.current < maxOffset - 3;
                        maintainSlidingArrowVisibility(isLeftArrowVisible, isRightArrowVisible);
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
        </View>
    );
}

const CarouselSlider = React.memo(CarouselSliderComponent) as typeof CarouselSliderComponent;

const styles = StyleSheet.create({
    masterContainer: {},
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