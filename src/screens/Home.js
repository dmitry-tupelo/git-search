import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, TextInput, Button, Text, Image, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

const Home = () => {
  let API = 'https://api.github.com/users'

  const [userName, setUserName] = useState('')
  const [data, setData] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    
        fetch(API)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
  }, [])

  
  useEffect(() => {
      setLoading(true)
      if (userName) {
        API = `https://api.github.com/users/${userName}`
      }
  
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [userName]);
    

    const renderItem = ({item}) => {
      console.log(item)
      return (
        <TouchableOpacity
          style={styles.userItem}
          onPress={() => {navigation.navigate('UserDetails')}}
        >
          <Image
            style={{width: 100, height: 100, marginRight: 30}}
            source={{uri: `${item?.avatar_url}`}}
          />
          <View style={styles.userDetails}>
              <Text>
                Username: {item?.login}
              </Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                    style={{borderWidth: 1, padding: 10, marginRight: 10}}
                    autoCorrect={false}
                    onSubmitEditing={(value) => {
                        console.log(value)
                    }}
                    onChangeText={(text) => {
                        setUserName(text)
                    }}
                    value={userName}
                />
                <Button
                    title="Search"
                />
            </View>
            {isLoading ? <ActivityIndicator /> :
            (
                <View>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                />
                </View>
            )}
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userItem: {
      marginVertical: 10,
      flexDirection: 'row',
    },
    userDetails: {
      justifyContent: 'center',
    },
  });

export default Home;