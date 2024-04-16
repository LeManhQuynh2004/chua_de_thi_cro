import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity,ToastAndroid, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../redux/actions/BookActions'
import { addCartAPI, fetchCarts, updateCartApi } from '../redux/actions/CartAction'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const listCart = useSelector(state => state.listCarts.listCarts);
    const [itemBooks, setItem] = useState({})
    const listBooks = useSelector(state => state.listBooks.listBooks);
    useEffect(() => {
        if (listBooks.length === 0) {
            dispatch(fetchTodos());
            dispatch(fetchCarts());
        }
    }, [dispatch, listBooks])
    return (
        <SafeAreaView style={{ width: '100%', height: '100%', padding: 5, backgroundColor: '#9b59b6' }}>
            <Text style={{ fontSize: 25, fontWeight: '900', color: 'white' }}>Thư viện fpt_polytechnic</Text>
            <FlatList
                data={listBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                        setItem(item)
                    }}>
                        <View style={{ width: '100%', padding: 10, backgroundColor: 'white', justifyContent: 'space-between', marginTop: 5, alignItems: 'center', height: 50, flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 900 }}>{item.book_id_ph32353}.</Text>
                                <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: 500 }}>{item.name_ph32353}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        let check = listCart.find(cart => cart.book_id == item.id);
                                        if (check != null) {
                                            let data = {
                                                ...check,
                                                quantity: check.quantity + 1
                                            }
                                            dispatch(updateCartApi({ id: check.id, data: data }))
                                                .then((result) => {
                                                    // console.log(result);
                                                    ToastAndroid.show('Add successfully!', ToastAndroid.SHORT);
                                                })
                                                .catch((error) => {
                                                    ToastAndroid.show('Add error!' + error, ToastAndroid.SHORT);
                                                });
                                        } else {
                                            const currentDate = new Date();

                                            const currentYear = currentDate.getFullYear();
                                            const currentMonth = currentDate.getMonth() + 1;
                                            const currentDay = currentDate.getDate();
                                            let data = {
                                                quantity: 1,
                                                book : {...item},
                                                date: `${currentDay}/${currentMonth}/${currentYear}`
                                            } 
                                            dispatch(addCartAPI(data))
                                                .then((result) => {
                                                    // console.log(result);
                                                    ToastAndroid.show('Add successfully!', ToastAndroid.SHORT);
                                                })
                                                .catch((error) => {
                                                    ToastAndroid.show('Add error!' + error, ToastAndroid.SHORT);
                                                });
                                        }
                                    }
                                }
                                style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: '#9b59b6', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 330, height: 420, borderRadius: 20, backgroundColor: 'white', justifyContent: 'space-evenly', padding: 10, opacity: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Thông tin chi tiết
                        </Text>
                        <Image
                            source={{
                                uri: itemBooks.image_ph32353
                            }}
                            style={{ width: 100, height: 150 }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Mã sách :
                            </Text>
                            <Text>
                                {itemBooks.book_id_ph32353}
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Tên sách :
                            </Text>
                            <Text>
                                {itemBooks.name_ph32353}
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Giá sách :
                            </Text>
                            <Text>
                                {itemBooks.price_ph32353}
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Số lượng sách :
                            </Text>
                            <Text>
                                {itemBooks.quantity_ph32353}
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Năm phát hành :
                            </Text>
                            <Text>
                                {itemBooks.published_year_ph32353}
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Số trang :
                            </Text>
                            <Text>
                                {itemBooks.number_page_ph32353}
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>
                                Thể loại :
                            </Text>
                            <Text>
                                {itemBooks.category_ph32353}
                            </Text>
                        </View>
                        <Button onPress={() => setModalVisible(false)} title='Close' />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})