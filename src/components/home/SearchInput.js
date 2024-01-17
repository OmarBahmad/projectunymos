import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { stylesHome } from "../../styles/GlobalStyles";

const SearchInput = ({ onChangeText, placeholder, value, onSearchPress }) => {
  return (
    <View style={stylesHome.searchButtonContainer}>
      <View style={stylesHome.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#8e8e93"
          style={stylesHome.searchIcon}
        />
        <TextInput
          style={stylesHome.searchInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          onSubmitEditing={onSearchPress}
        />
      </View>
    </View>
  );
};

export default SearchInput;
