import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Basket'>;

const BasketScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {
    return (
    <SafeAreaView style={{ flex: 1 }} edges={['top' , 'left', 'right']}>
      <View style={styles.basketScreenContainer}>
        <Text>BasketScreen</Text>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  basketScreenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

export default BasketScreen;