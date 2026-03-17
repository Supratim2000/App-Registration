import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { CartItemType } from '../utils/ProjectTypes';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Basket'>;

const BasketScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {

  const handleAdd = (CartItem: CartItemType): void => {
    console.log(CartItem);
  }

  const handleSave = (CartItem: CartItemType): void => {
    console.log(CartItem);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top' , 'left', 'right']}>
      <ScrollView>
        <CartItem
          itemName='Bananer'
          imageUrl='https://images.unsplash.com/photo-1587132137056-bfbf0166836e'
          stkValue={10}
          stkLocation="Columbia"
          offerQuantity={10}
          offerPrice={24.50}
          stkPrice={2.75}
          onAddPress={handleAdd}
          onSavePress={handleSave}
          containerStyle={{marginBottom: 2}}/>
        <CartItem
          itemName='jordbær'
          imageUrl='https://media.istockphoto.com/id/478352254/photo/strawberry-isolated-against-a-white-background.jpg?s=1024x1024&w=is&k=20&c=Arb4FONj6lgESBfw7llkWEPEFg3VK6xU60siYvRBVvQ='
          stkValue={25}
          stkLocation="Columbia"
          offerQuantity={10}
          offerPrice={25.00}
          stkPrice={5.50}
          onAddPress={handleAdd}
          onSavePress={handleSave}
          containerStyle={{marginBottom: 4}}/>
        <CartItem
          itemName='ananas'
          imageUrl='https://media.istockphoto.com/id/1497639521/photo/ripe-pineapple-is-tropical-fruit-isolated-on-white-background.jpg?s=2048x2048&w=is&k=20&c=9mLIVZcC7RcRlHF6FtqQA67iyTwqZ59fuLXKkggVcl4='
          stkValue={76}
          stkLocation="Munich"
          offerQuantity={10}
          stkPrice={9.25}
          onAddPress={handleAdd}
          onSavePress={handleSave} 
          containerStyle={{marginBottom: 4}}/>
        <CartItem
          itemName='æble'
          imageUrl='https://media.istockphoto.com/id/532048136/photo/fresh-red-apple-isolated-on-white-with-clipping-path.jpg?s=2048x2048&w=is&k=20&c=o5iB_Nz86vATCXObzj-quBI_OV7N1HeknHkqNWIwAH4='
          stkValue={11}
          stkLocation="Columbia"
          offerQuantity={11}
          offerPrice={40.25}
          stkPrice={4.00}
          onAddPress={handleAdd}
          onSavePress={handleSave}
          containerStyle={{marginBottom: 4}}/>
        </ScrollView>
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