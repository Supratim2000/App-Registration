import { Animated, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampaignCard from '../components/CampaignCard';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { CampaignCardProps } from '../utils/ProjectTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CarouselSlider from '../components/CarouselSlider';
import CartItem from '../components/CartItem';
import { apiData } from '../Gateway/FakeApiGatewat';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Home'>;

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
    <ScrollView>
        <CarouselSlider<CampaignCardProps>
          heading="Popular Campaigns"
          data={apiData.data}
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
      </ScrollView>
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