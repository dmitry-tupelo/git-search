import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { getDefaultUsersList, getUserByUserName } from '../utils/octokit';

const Home = ({navigation}) => {

  const [searchName, setSearchName] = useState('')
  const [usersData, setUsersData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
      getDefaultUsersList().then((users) => {
          if (users) {
              setUsersData(users)
              setLoading(false)
          }
      })
  }, [])



    const renderUser = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.userItem}
          onPress={() => {navigation.navigate('UserDetails', {
              userName: item?.login
          })}}
        >
          <Image
            style={styles.userAvatar}
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

    const renderEmptyList = () => <Text>No users found</Text>


    return (
            <View style={styles.container}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        autoCorrect={false}
                        autoCapitalize={false}
                        onChangeText={(text) => {
                            setSearchName(text)
                        }}
                        value={searchName}
                    />
                    <Button
                        title="Search"
                        onPress={async () => {
                            setLoading(true)
                            try {
                                const userByName = await getUserByUserName(searchName)
                                const getUsersList = await getDefaultUsersList()

                                if(searchName.length > 0) {
                                    setUsersData(userByName
                                        ? [userByName]
                                        : getUsersList
                                    )
                                }
                            } catch (error) {
                                console.log(error)
                                setUsersData([])
                            }
                            setLoading(false)
                        }}
                    />
                </View>
                {isLoading
                    ? <ActivityIndicator
                        size='large' />
                    : (
                        <FlatList
                            style={{width: '100%'}}
                            data={usersData}
                            renderItem={renderUser}
                            ListEmptyComponent={renderEmptyList}
                            keyExtractor={item => item?.id}
                        />
                    )
                }
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    userItem: {
      marginVertical: 10,
      flexDirection: 'row',
    },
    userDetails: {
      justifyContent: 'center',
    },
    userAvatar: {
        width: 100,
        height: 100,
        marginRight: 30,
    },
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    searchInput: {
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        flex: 1,
    },
  });

export default Home;
