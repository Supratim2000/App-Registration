import React, { useEffect, useState } from 'react';
import { CartItemProps } from '../utils/ProjectTypes';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatEuPrice } from '../utils/ProjectUtils';
import IconButton from './IconButton';

const CartItem: React.FC<CartItemProps> = React.memo(({ itemName, imageUrl, stkValue, stkLocation, offerQuantity, offerPrice, stkPrice, onAddPress, onSavePress, containerStyle }): React.JSX.Element => {
    const imageNotFoundFallback = require('../assets/images/image_not_found.png');
    
    const [imgLocation, setImgLocation] = useState(imageUrl ? { uri: imageUrl } : imageNotFoundFallback);
    const [totalPrice, setTotalPrice] = useState<number>(0.00);
    const [penny, scent] = formatEuPrice(totalPrice).split(',');

    const currentCartItemData = {
        itemName,
        imageUrl,
        stkValue,
        stkLocation,
        offerQuantity,
        offerPrice,
        stkPrice
    };

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
                    <View style={styles.itemTextAndClickableButtonContainer}>
                        <View style={styles.itemNameContainer}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.itemNameStyle}>{itemName ?? '...'}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <IconButton
                                isVisible={onAddPress !== undefined}
                                onIconPress={() => onAddPress?.(currentCartItemData)}
                                currentCartData={currentCartItemData}
                                iconName='add-circle-outline'
                            />
                            <IconButton
                                isVisible={onSavePress !== undefined}
                                onIconPress={() => onSavePress?.(currentCartItemData)}
                                currentCartData={currentCartItemData}
                                iconName='bookmark-border'
                            />
                        </View>
                    </View>
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
});

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        overflow: 'hidden',
        paddingHorizontal: 14
    },
    itemDescriptionContainer: {
        flexDirection: 'row',
        alignItems: 'stretch'
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
        marginVertical: 6
    },
    itemInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 8,
        marginVertical: 2
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 4
    },
    itemNameContainer: {
        flex: 1,
        marginRight: 12
    },
    itemNameStyle: {
        fontWeight: 500,
        fontSize: 24
    },
    stkContainerStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    stkTextStyle: {
        marginRight: 2,
        fontSize: 16
    },
    offerContainer: {
        backgroundColor: '#f5d800',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
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
        flex: 1,
    },
    stkStyle: {
        color: '#6e6e6e',
        fontSize: 16,
    },
    stkPriceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    payableContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    pennyStyle: {
        fontSize: 32,
        lineHeight: 32,
        fontWeight: 900,
        color: '#000000'
    },
    scentStyle: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 900,
        color: '#000000'
    },
    quantityContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    itemTextAndClickableButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default CartItem;