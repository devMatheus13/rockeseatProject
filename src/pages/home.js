import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// import { Container } from './styles';
import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {

    const [Data, setData] = useState([]);
    const [Page, setPage] = useState(1);
    const [totalPage, setTotal] = useState(0);
    const [ProductInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...Info } = response.data
        setData([...Data, ...docs])
        const { pages } = response.data
        // setData({docs:[...docs,...docs]})
      
        setProductInfo(Info)
    }
    console.log(ProductInfo)

    const loadMore = useCallback (() => {
      //  setPage(Page + 1)
        console.log(Page)
        if (Page === ProductInfo.pages){
            return;
        }
        setPage(Page + 1)
        loadProducts(Page)
    ,Page
    })
    const _renderItem = ({ item }) => {
        return (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>
                    {item.title}
                </Text>
                <Text style={styles.productDescription}>
                    {item.description}
                </Text>
                <TouchableOpacity style={styles.productButton} onPress={() => { }}>
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>

        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={Data}
                renderItem={_renderItem}
                keyExtractor={item => item._id}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    productButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    }
})