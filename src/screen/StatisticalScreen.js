import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarts } from '../redux/actions/CartAction';
const StatisticalScreen = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const listCart = useSelector(state => state.listCarts.listCarts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (listCart.length === 0) {
            dispatch(fetchCarts())
        }
    }, [dispatch, listCart])
    const handelStatistical = () => {
        console.log(search);
        const arrRouteOne = [];
        for (const book of listCart) {
            const date = book.date.split('/')
            if (date[1] === "4" && date[2] === "2024") {
                arrRouteOne.push(book)
            }
        }
        const arrHotBuy = [];
        for (let i = 0; i < arrRouteOne.length; i++) {
            if (arrRouteOne[i].book.category_ph32353 == search) {
                arrHotBuy.push(arrRouteOne[i])
            }
        }
        arrHotBuy.sort((a, b) => b.quantity - a.quantity);
        setData(arrHotBuy)
    }
    return (
        <SafeAreaView style={{ width: '100%', height: '100%', padding: 5, backgroundColor: '#9b59b6' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput onChangeText={(text) => setSearch(text)} style={{ backgroundColor: 'white', width: '80%', height: 40 }} placeholder='Search'/>
                <Button onPress={handelStatistical} title='Check' />
            </View>
            {
                data.length == 0 ? null :
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Danh sách thông kê bán chạy</Text>
                        <FlatList data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return <View style={{ width: '100%', height: 40, alignItems: 'center', padding: 5, backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 500 }}>{item.book.book_id_ph32353}.</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 500 }}>{item.book.name_ph32353}</Text></View>
                                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Số lượng bán : {item.quantity}</Text>
                                </View>
                            }}>
                        </FlatList>
                    </View>
            }
        </SafeAreaView>
    )
}

export default StatisticalScreen

const styles = StyleSheet.create({})