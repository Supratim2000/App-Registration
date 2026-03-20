import { Animated, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampaignCard from '../components/CampaignCard';
import { CampaignCardProps } from '../utils/ProjectTypes';
import CarouselSlider from '../components/CarouselSlider';
import { apiData } from '../Gateway/FakeApiGateway';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {
  const carouselSliderItemClickHandler = useCallback((item: CampaignCardProps, index: number): void => {
    console.log(index);
    console.log(item);
  }, []);

  const renderCampaignItem = useCallback(({ item }: { item: CampaignCardProps }): React.JSX.Element => {
    return (
      <CampaignCard
        id={item.id}
        image={item.image}
        heading={item.heading}
        description={item.description}
      />
    );
  },[]);

  const keyExtractor = useCallback((item: CampaignCardProps) => item.id, []);

  return (
  <SafeAreaView style={{ flex: 1 }} edges={['top' , 'left', 'right']}>
    <ScrollView>
        <CarouselSlider<CampaignCardProps>
          heading="Popular Campaigns"
          data={apiData.data}
          keyExtractor={keyExtractor}
          renderItem={renderCampaignItem}
          onItemPress={carouselSliderItemClickHandler}
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