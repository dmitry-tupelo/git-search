import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { octokit } from "../utils/octokit";
import RepoListItem from "../components/RepoListItem";

const UserDetails = ({route}) => {
    const { userName } = route?.params
    const [ user, setUser ] =  useState({})
    const [ searchRepoName, setSearchRepoName ] = useState('')
    const [ initialUserRepos, setInitialUserRepos ] = useState([])
    const [ filteredRepos, setFilteredRepos] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)



    useEffect(() => {
        octokit.request(`/users/${userName}`)
            .then((user) => setUser(user?.data))
            .catch((error) =>{console.log(error)})


        octokit.request(`/users/${userName}/repos`, {
            username: userName
        }).then((repos) => {
            setInitialUserRepos(repos?.data)
            setFilteredRepos(repos?.data)
            setIsLoading(false)
        })
            .catch((error) =>{console.log(error)})

    }, [])


    const renderReposList = () => {
        const stateToRender = searchRepoName.length > 0 ? filteredRepos : initialUserRepos
       return stateToRender?.length > 0
           ? stateToRender.map((item) => {
            return (
                <RepoListItem
                    key={item?.id}
                    {...item}
                />
            )})
           : <Text>User doesn't have any repos</Text>
    }

    const filterRepos = (searchText) => {
        setFilteredRepos(initialUserRepos.filter((repo) => repo?.full_name.includes(searchText)))
    }

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{width: 200, height: 200, marginRight: 30}}
                    source={{uri: `${user?.avatar_url}`}} />
                <View style={styles.userInfo}>
                    <Text>Username: {user?.login}</Text>
                    <Text>Number of followers: {user?.followers}</Text>
                    <Text>Number of following: {user?.following}</Text>
                    {user?.bio && (<Text>Biography: {user?.bio}</Text>)}
                    {user?.email && (<Text>Email: {user?.email}</Text>)}
                    {user?.location && (<Text>Location: {user?.location}</Text>)}
                    <Text>Join date: {user?.created_at}</Text>
                </View>

                    <TextInput
                        style={styles.searchInput}
                        autoCorrect={false}
                        autoCapitalize={false}
                        onChangeText={(text) => {
                            setSearchRepoName(text)
                            filterRepos(text)
                        }}
                        placeholder='Search over user repos'
                        value={searchRepoName}
                    />
                {isLoading ?
                    <ActivityIndicator
                        size='large'
                    />
                    : (
                        <ScrollView>
                            {renderReposList()}
                        </ScrollView>
                    )
                }
            </View>
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
    userInfo: {
        marginVertical: 20,
    },
    searchInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20
    }
})

export default UserDetails;
