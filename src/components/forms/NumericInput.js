import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";

import { stylesForms } from "../../styles/GlobalStyles";
import { formatCPF, formatRG, formatPhone, formatCEP } from "../../utils/FormatInputs";

const formatValue = (value, formatType) => {
  switch (formatType) {
    case "CPF":
      return formatCPF(value);
    case "RG":
      return formatRG(value);
    case "Phone":
      return formatPhone(value);
    case "CEP":
      return formatCEP(value);
    default:
      return value;
  }
};

export const NumericInput = ({
  label,
  originalValue,
  onChangeText,
  placeholder,
  keyboardType,
  formatType,
  shortInput,
  maxLength,
}) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    setFormattedValue(formatValue(originalValue, formatType));
  }, [originalValue, formatType]);

  const handleInputChange = (text) => {
    const formattedText = formatValue(text, formatType);
    setFormattedValue(formattedText);
    onChangeText && onChangeText(text);
  };

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
        value={formattedValue}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        keyboardType={keyboardType || "numeric"}
        maxLength={maxLength}
      />
    </View>
  );
};