import React, { useEffect, useState } from 'react';
import { CartItemProps } from '../utils/ProjectTypes';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatEuPrice } from '../utils/ProjectUtils';

const CartItem: React.FC<CartItemProps> = ({ itemName, imageUrl, stkValue, stkLocation, offerQuantity, offerPrice, stkPrice, onAddPress, onSavePress, containerStyle }): React.JSX.Element => {
    const imageNotFoundFallback = require('../assets/images/image_not_found.png');
    
    const [imgLocation, setImgLocation] = useState(imageUrl ? { uri: imageUrl } : imageNotFoundFallback);
    const [totalPrice, setTotalPrice] = useState<number>(0.00);
    const [penny, scent] = formatEuPrice(totalPrice).split(',');

    const currentCartItemData = React.useMemo(() => ({
        itemName,
        imageUrl,
        stkValue,
        stkLocation,
        offerQuantity,
        offerPrice,
        stkPrice
    }), [itemName, imageUrl, stkValue, stkLocation, offerQuantity, offerPrice, stkPrice]);

    useEffect(() => {
        const generalPrice = stkValue * stkPrice;
        setTotalPrice(stkValue !== offerQuantity ? generalPrice : (offerPrice ?? generalPrice));
    },[stkValue, stkPrice, offerQuantity, offerPrice]);

    useEffect(() => {
        setImgLocation(imageUrl ? { uri: imageUrl } : imageNotFoundFallback);
    }, [imageUrl]);

    return (
        <View style={[styles.cartContainer, containerStyle]}>
            <View style={styles.itemDescriptionContainer}>
                <Image
                    source={imgLocation}
                    onError={() => setImgLocation(imageNotFoundFallback) }
                    resizeMode='contain'
                    style={styles.itemImage}
                />
                <View style={styles.itemInfoContainer}>
                    <Text style={styles.itemNameStyle}>{itemName ?? '...'}</Text>
                    <View style={styles.itemInfoInternalContainer}>
                        <View style={styles.stkContainerStyle}>
                            <Text style={styles.stkTextStyle}>{stkValue} stk</Text>
                            { stkLocation && <Text style={styles.stkTextStyle}>|</Text> }
                            { stkLocation && <Text style={styles.stkTextStyle}>{stkLocation}</Text> }
                        </View>
                        { (offerQuantity && offerPrice) && <View style={styles.offerContainer}>
                            <Text style={styles.offerText}>Mix {offerQuantity} for {formatEuPrice(offerPrice)}</Text>
                        </View> }
                    </View>
                </View>
                <View style={styles.buttonMasterContainer}>
                    <View style={styles.buttonContainer}>
                         { onAddPress && <TouchableOpacity onPress={() => onAddPress?.(currentCartItemData)}>
                            <Icon name="add-circle-outline" size={28} color="#000" />
                        </TouchableOpacity> }
                        { onSavePress && <TouchableOpacity onPress={() => onSavePress?.(currentCartItemData)}>
                            <Icon name="bookmark-border" size={28} color="#000" />
                        </TouchableOpacity> }
                    </View>
                </View>
            </View>
            <View style={styles.itemPriceContainer}>
                <View style={styles.priceContainer}>
                    <View style={styles.stkPriceContainer}>
                        <Text style={styles.stkStyle}>{formatEuPrice(stkPrice)}/Stk.</Text>
                        <View style={styles.payableContainer}>
                            <Text style={styles.pennyStyle}>{penny}</Text>
                            <Text style={styles.scentStyle}>{scent}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.quantityContainer}>
                    <View style={styles.quantityValueContainer}>
                        <Text style={styles.stkValueStyle}>{stkValue}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        overflow: 'hidden'
    },
    itemDescriptionContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    itemImage: {
        width: 75,
        height: '100%'
    },
    itemImageContainer: {
        height: '100%'
    },
    itemPriceContainer: {
        flexDirection: 'row',
        marginLeft: 75,
        marginTop: 4,
    },
    itemInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 8,
        marginVertical: 2
    },
    buttonMasterContainer: {
        
    },
    buttonContainer: {
        flexDirection: 'row',
        marginRight: 12,
        marginVertical: 4
    },
    itemNameStyle: {
        fontWeight: 500,
        fontSize: 22
    },
    stkContainerStyle: {
        flexDirection: 'row'
    },
    stkTextStyle: {
        marginRight: 2,
        fontSize: 16
    },
    offerContainer: {
        backgroundColor: '#f5d800',
        paddingVertical: 6,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    offerText: {
        textDecorationLine: 'underline',
        fontSize: 16
    },
    itemInfoInternalContainer: {
        alignSelf: 'flex-start'
    },
    priceContainer: {
        marginLeft: 8,
        flex: 1
    },
    stkStyle: {
        color: '#6e6e6e',
        fontSize: 16,
    },
    stkPriceContainer: {
        flexDirection: 'column'
    },
    payableContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    pennyStyle: {
        fontSize: 34,
        fontWeight: 900,
        color: '#000000',
    },
    scentStyle: {
        fontSize: 22,
        fontWeight: 900,
        color: '#000000',
    },
    quantityContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    quantityValueContainer: {
        minWidth: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#0894d0',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    stkValueStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});

export default CartItem;