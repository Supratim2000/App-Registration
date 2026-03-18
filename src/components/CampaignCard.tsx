import React, { useState } from 'react';
import { CampaignCardProps } from '../utils/ProjectTypes';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CampaignCard: React.FC<CampaignCardProps> = ({ id, image, heading, description }): React.JSX.Element => {
  const imageNotFoundFallback = require('../assets/images/image_not_found.png');
  const [imgLocation, setImgLocation] = useState(image ? { uri: image } : imageNotFoundFallback);
  const [resizeMode, setResizeMode] = useState<'cover' | 'contain'>(image ? 'cover' : 'contain');

  const handleImageLoadingError = () => {
    setImgLocation(imageNotFoundFallback);
    setResizeMode('contain');
  };

  return (
      <View style={styles.card}>
          <Image
            source={imgLocation}
            onError={handleImageLoadingError}
            resizeMode={resizeMode}
            style={styles.image}
          />
          <Text numberOfLines={1} style={styles.title}>{ heading ?? '...' }</Text>
          <Text numberOfLines={4} style={styles.description}>{ description ?? '...' }</Text>
          <View style={styles.touchableArrow}>
            <TouchableOpacity activeOpacity={1.0} style={styles.touchableOpacityArrowContainer}>
                <Icon name="chevron-right" size={36} color="#1778F2" />
            </TouchableOpacity>
          </View>
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
    paddingBottom: 10,
    flexDirection: 'column',
    overflow: 'hidden'
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
  },
  touchableArrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginTop: 'auto'
  },
  touchableOpacityArrowContainer: {
    borderRadius: 36,
    borderWidth: 1 ,
    borderColor:'#1778F2'
  }
});

export default CampaignCard;