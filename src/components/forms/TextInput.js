import React from "react";
import { View, TextInput, Text } from "react-native";

import { stylesForms } from "../../styles/GlobalStyles";

export const TextInputComponent = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  shortInput,
  maxLength,
}) => {
  return (
    <View
      style={[
        stylesForms.formCol,
        shortInput ? stylesForms.shortInput : stylesForms.longInput,
      ]}
    >
      <View style={stylesForms.labelContainer}>
        <Text style={stylesForms.label}>{label}</Text>
      </View>
      <TextInput
        style={stylesForms.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType || "default"}
        maxLength={maxLength}
      />
    </View>
  );
};