import { StyleSheet, Text, View ,SafeAreaView,Image,Button} from 'react-native'
import React from 'react'
import { updateCartApi } from '../redux/actions/CartAction'
import { useDispatch} from 'react-redux'

const ItemCart = ({ item }) => {
    const dispatch = useDispatch()
    const handleAddQuantity = () => {
        let data = {
            ...item,
            quantity: item.quantity + 1
        }
        dispatch(updateCartApi({ id: item.id, data: data })).then(() => {
            console.log("Thành công");
        }).catch((err) => { console.log("Thất bại"); })
    }
    const handleApartQuantity = () => {
        if (item.quantity > 1) {
            let data = {
                ...item,
                quantity: item.quantity - 1
            }
            dispatch(updateCartApi({ id: item.id, data: data })).then(() => {
                console.log("Thành công");
            }).catch((err) => { console.log("Thất bại"); })
        } else {
            ToastAndroid.show("Không thể thực hiện !", ToastAndroid.SHORT)
        }
    }
    return (
        <SafeAreaView style={{ width: '100%', backgroundColor: 'white', height: 160, marginTop: 5, padding: 10, flexDirection: 'row', borderRadius: 5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    resizeMethod='resize'
                    resizeMode='contain'
                    source={{ uri: item.book.image_ph32353 }}
                    style={{ width: 100, height: 130 }} />
            </View>
            <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>Tên sách : {item.book.name_ph32353}</Text>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>Giá sách : {item.book.price_ph32353}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Tổng tiền : {item.quantity * item.book.price_ph32353}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '50%', alignItems: 'center' }}>
                        <Button onPress={handleApartQuantity} title='-' />
                        <Text>{item.quantity}</Text>
                        <Button onPress={handleAddQuantity} title='+' />
                    </View>
                </View>
            </View>
            <Text style={{ color: 'red' }}>Xóa</Text>
        </SafeAreaView>
    )
}

export default ItemCart

const styles = StyleSheet.create({})