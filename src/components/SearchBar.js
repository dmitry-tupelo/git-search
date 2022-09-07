import React, { useState, useEffect } from 'react';
import { TextInput, View, Button } from 'react-native';

const SearchBar = () => {



    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
                style={{borderWidth: 1}}
                autoCorrect={false}
                onSubmitEditing={(value) => {
                    console.log(value)
                }}
                onChangeText={(text) => {
                    console.log(text)
                    setUserName(text)
                }}
                value={userName}
            />
            <Button
                title="Search"
            />
        </View>
    )
}

export default SearchBar;