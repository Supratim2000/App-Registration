import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { CartItemType } from '../utils/ProjectTypes';
import { cartItemData } from '../Gateway/FakeApiGateway';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Basket'>;

const BasketScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {
  const handleAdd = useCallback((CartItem: CartItemType): void => {
    console.log(CartItem);
  }, []);

  const handleSave = useCallback((CartItem: CartItemType): void => {
    console.log(CartItem);
  }, []);

  const renderCartItem = useCallback(({ item }: { item: CartItemType }): React.JSX.Element => (
    <CartItem
      itemName={item.itemName}
      imageUrl={item.imageUrl}
      stkValue={item.stkValue}
      stkLocation={item.stkLocation}
      offerQuantity={item.offerQuantity}
      offerPrice={item.offerPrice}
      stkPrice={item.stkPrice}
      onAddPress={handleAdd}
      onSavePress={handleSave}
      containerStyle={styles.cartItemMargin}
    />
  ), [handleAdd, handleSave]);

  const ListHeader = useMemo((): React.JSX.Element => (
    <View style={styles.basketHeadingContainer}>
      <Text style={styles.basketHeading}>Basket</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top' , 'left', 'right']}>
      <FlatList
        data={cartItemData.data}
        keyExtractor={(item, index) => `${item.itemName}-${index}`}
        ListHeaderComponent={ListHeader}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartFlatListContainerStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  basketScreenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  cartFlatListContainerStyle: {
    padding: 10,
    backgroundColor: '#a7d9ff'
  },
  basketHeadingContainer: {
    backgroundColor: '#a7d9ff'
  },
  basketHeading: {
    color: '#4d8dbf',
    fontWeight: 'bold',
    fontSize: 28,
  },
  cartItemMargin: {
    marginBottom: 4
  }
});

export default BasketScreen;