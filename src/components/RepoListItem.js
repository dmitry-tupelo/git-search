import React from 'react';
import {Linking, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";

const RepoListItem = ({html_url, full_name, forks_count, watchers_count}) => {

    return (
        <TouchableOpacity
            style={styles.repoItem}
            onPress={async () => {
                const supported = await Linking.canOpenURL(html_url);

                if (supported) {
                    await Linking.openURL(html_url)
                } else {
                    Alert.alert(`Wrong url format`);
                }

            }}
        >
            <Text>Repo name: {full_name}</Text>
            <Text>Forks count: {forks_count}</Text>
            <Text>Watchers count: {watchers_count}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    repoItem: {
        marginBottom: 10
    }
})
export default RepoListItem
