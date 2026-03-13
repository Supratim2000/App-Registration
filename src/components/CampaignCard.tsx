import React from 'react';
import { CampaignCardProp } from '../utils/ProjectTypes';
import { Image, Text, View, StyleSheet } from 'react-native';

const CampaignCard: React.FC<CampaignCardProp> = ({ id, image, heading, description }): React.JSX.Element => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{ heading }</Text>
            <Text numberOfLines={4} style={styles.description}>{ description }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 8,
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
  description: {
    padding: 10
  }
});

export default CampaignCard;