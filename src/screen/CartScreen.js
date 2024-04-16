import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarts } from '../redux/actions/CartAction';
import ItemCart from '../component/ItemCart';
const CartScreen = () => {
    const dispatch = useDispatch();
    const listCarts = useSelector(state => state.listCarts.listCarts);
    useEffect(() => {
        if (listCarts.length === 0) {
            dispatch(fetchCarts())
        }
    }, [listCarts, dispatch])
    return (
        <SafeAreaView style={{ width: '100%', height: '100%', padding: 10, backgroundColor: '#9b59b6' }}>
            <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>Rỏ hàng của bạn :</Text>
            <FlatList
            data={listCarts}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ItemCart item = {item}/>}
            />
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({})