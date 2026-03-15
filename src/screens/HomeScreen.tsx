import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampaignCard from '../components/CampaignCard';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { CampaignCardProps } from '../utils/ProjectTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CarouselSlider from '../components/CarouselSlider';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Home'>;

const DATA = [
  {
    id: "1",
    heading: "Start",
    image: "https://picsum.photos/300/203",
    description:
      "First Card"
  },
  {
    id: "2",
    heading: "Robot Mower",
    image: "https://picsum.photos/300/201",
    description:
      "Maintain a perfectly trimmed lawn without the hassle using our advanced robotic mower. Equipped with intelligent navigation, obstacle detection, and quiet operation, this smart device automatically handles complex lawn layouts with ease. Simply schedule mowing times through the companion app and enjoy a consistently neat garden while saving time and effort."
  },
  {
    id: "3",
    heading: "Garden Furniture",
    image: "https://picsum.photos/300/202",
    description:
      "Transform your outdoor space into a relaxing retreat with our stylish and durable garden furniture collection. Crafted from weather-resistant materials and designed for comfort, these sets are perfect for hosting guests, enjoying family dinners, or simply unwinding outdoors. From elegant dining tables to cozy lounge chairs, create the perfect backyard atmosphere."
  },
  {
    id: "4",
    heading: "Trampoline Sale",
    image: "https://picsum.photos/300/203",
    description:
      "Bring fun and fitness to your backyard with our premium trampolines designed for safety and durability. Featuring reinforced frames, high-quality springs, and protective safety nets, they provide an enjoyable jumping experience for both kids and adults. This special promotion lets you save big while giving your family endless outdoor entertainment."
  },
  {
    id: "5",
    heading: "Bike Sale",
    image: "https://picsum.photos/300/200",
    description:
      "Discover our latest range of high-quality bicycles designed for comfort, durability, and performance. Whether you're commuting to work, exploring city streets, or heading out on weekend adventures, these bikes offer smooth rides, reliable brakes, and lightweight frames. Take advantage of our limited-time sale and upgrade your ride with premium features at an unbeatable price."
  },
  {
    id: "6",
    heading: "Robot Mower",
    image: "https://picsum.photos/300/201",
    description:
      "Maintain a perfectly trimmed lawn without the hassle using our advanced robotic mower. Equipped with intelligent navigation, obstacle detection, and quiet operation, this smart device automatically handles complex lawn layouts with ease. Simply schedule mowing times through the companion app and enjoy a consistently neat garden while saving time and effort."
  },
  {
    id: "7",
    heading: "Garden Furniture",
    image: "https://picsum.photos/300/202",
    description:
      "Transform your outdoor space into a relaxing retreat with our stylish and durable garden furniture collection. Crafted from weather-resistant materials and designed for comfort, these sets are perfect for hosting guests, enjoying family dinners, or simply unwinding outdoors. From elegant dining tables to cozy lounge chairs, create the perfect backyard atmosphere."
  },
  {
    id: "8",
    heading: "Trampoline Sale",
    image: "https://picsum.photos/300/203",
    description:
      "Bring fun and fitness to your backyard with our premium trampolines designed for safety and durability. Featuring reinforced frames, high-quality springs, and protective safety nets, they provide an enjoyable jumping experience for both kids and adults. This special promotion lets you save big while giving your family endless outdoor entertainment."
  },
  {
    id: "9",
    heading: "Bike Sale",
    image: "https://picsum.photos/300/200",
    description:
      "Discover our latest range of high-quality bicycles designed for comfort, durability, and performance. Whether you're commuting to work, exploring city streets, or heading out on weekend adventures, these bikes offer smooth rides, reliable brakes, and lightweight frames. Take advantage of our limited-time sale and upgrade your ride with premium features at an unbeatable price."
  },
  {
    id: "10",
    heading: "Robot Mower",
    image: "https://picsum.photos/300/201",
    description:
      "Maintain a perfectly trimmed lawn without the hassle using our advanced robotic mower. Equipped with intelligent navigation, obstacle detection, and quiet operation, this smart device automatically handles complex lawn layouts with ease. Simply schedule mowing times through the companion app and enjoy a consistently neat garden while saving time and effort."
  },
  {
    id: "11",
    heading: "Garden Furniture",
    image: "https://picsum.photos/300/202",
    description:
      "Transform your outdoor space into a relaxing retreat with our stylish and durable garden furniture collection. Crafted from weather-resistant materials and designed for comfort, these sets are perfect for hosting guests, enjoying family dinners, or simply unwinding outdoors. From elegant dining tables to cozy lounge chairs, create the perfect backyard atmosphere."
  },
  {
    id: "12",
    heading: "Finish",
    image: "https://picsum.photos/300/203",
    description:
      "Last Card"
  },
];

const HomeScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {
  const flatListRef = useRef<FlatList<CampaignCardProps>>(null);
  const scrollOffset = useRef<number>(0);
  const contentTotalWidth = useRef<number>(0);
  const visibleLayoutWidth = useRef<number>(0);
  let [arrowVisibility, setArrowVisibility] = useState<any>({
    left: false,
    right: true
  });
  const leftArrowOpacity = useRef(new Animated.Value(0)).current;
  const rightArrowOpacity = useRef(new Animated.Value(1)).current;

  const CARD_WIDTH = 260;
  const CARD_MARGIN_WIDTH = 16;

  const scrollRight = () => {
    const maxOffset = contentTotalWidth.current - visibleLayoutWidth.current;
    scrollOffset.current = Math.min(scrollOffset.current + (CARD_WIDTH + CARD_MARGIN_WIDTH), maxOffset);

    flatListRef.current?.scrollToOffset({
      offset: scrollOffset.current,
      animated: true
    });
  }

  const scrollLeft = () => {
      scrollOffset.current = Math.max(scrollOffset.current - (CARD_WIDTH + CARD_MARGIN_WIDTH), 0);

      flatListRef.current?.scrollToOffset({
        offset: scrollOffset.current,
        animated: true
      });
  }

  return (
  <SafeAreaView style={{ flex: 1 }} edges={['top' , 'left', 'right']}>

      {/* <Text style={styles.heading}>Popular Campaigns</Text> */}

      {/* <View style={styles.sliderContainer}> */}

        {/* <Animated.View 
          style={[styles.arrowButton, styles.arrowLeft, {opacity: leftArrowOpacity}]}
          pointerEvents={arrowVisibility.left ? "auto" : "none"}
        >
          <TouchableOpacity activeOpacity={1.0} onPress={scrollLeft}>
            <Icon name="chevron-left" size={26} color="#333" />
          </TouchableOpacity>
        </Animated.View> */}

        {/* <FlatList
          ref={flatListRef}
          data={DATA}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <CampaignCard
              image={item.image}
              heading={item.title}
              description={item.description}/>
          )}
          showsHorizontalScrollIndicator={false}
          snapToInterval={276}
          decelerationRate="fast"
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
              if (prev.left === isLeftArrowVisible && prev.right === isRightArrowVisible) {
                return prev;
              }
              return {
                left: isLeftArrowVisible,
                right: isRightArrowVisible
              };
            });
          }}
          scrollEventThrottle={16}
        /> */}

        {/* <Animated.View
          style={[styles.arrowButton, styles.arrowRight, {opacity : rightArrowOpacity}]}
          pointerEvents={arrowVisibility.right ? "auto" : "none"}
        >
          <TouchableOpacity activeOpacity={1.0} onPress={scrollRight}>
            <Icon name="chevron-right" size={26} color="#333" />
          </TouchableOpacity>
        </Animated.View> */}

      {/* </View> */}

      <CarouselSlider<CampaignCardProps>
        heading="Popular Campaigns"
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CampaignCard
            id={item.id}
            image={item.image}
            heading={item.heading}
            description={item.description}
          />
        )}
        onItemPress={(item) => {
          console.log('Clicked campaign:', item.heading);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 16
  },

  sliderContainer: {
    position: "relative",
    paddingVertical: 5,
  },

  card: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 16,
    elevation: 3,
    paddingBottom: 10
  },

  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  title: {
    padding: 10,
    fontWeight: "bold"
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

  arrow: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default HomeScreen;