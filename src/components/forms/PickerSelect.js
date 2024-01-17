import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  stylesHome,
  stylesForms,
  pieChartStyles,
  pickerSelectStylesForms,
  pickerSelectStylesHome,
} from "../../styles/GlobalStyles";
import fakeApi from "../api/formFakeAPi/FakeApi";

const PickerSelect = ({
  tableName,
  selectedItem,
  onValueChange,
  label,
  hasTextLabel,
  customStyle,
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fakeApi.getItems(tableName);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [tableName]);

  const getPickerStyle = () => {
    if (customStyle === "forms") {
      return pickerSelectStylesForms;
    }
    if (customStyle === "home") {
      return pickerSelectStylesHome;
    }
    if (customStyle === "chart") {
      return pickerSelectStylesForms;
    }

    return pickerSelectStylesForms;
  };

  const getViewStyle = () => {
    if (customStyle === "forms") {
      return [stylesForms.formCol, stylesForms.shortInput];
    }
    if (customStyle === "chart") {
      return [pieChartStyles.inputLabel];
    }
    if (customStyle === "home") {
      return '';
    }
    return "";
  };

  const getViewLabel = () => {
    if (customStyle === "forms") {
      return [stylesForms.label];
    }
    if (customStyle === "chart") {
      return [pieChartStyles.inputLabel];
    }
    if (customStyle === "home") {
      return '';
    }
    return "";
  };

  return (
    <View style={getViewStyle()}>
      {hasTextLabel && <Text style={getViewLabel()}>{label}</Text>}
      <View style={stylesForms.pickerContainer}>
        <RNPickerSelect
          style={{
            inputAndroid: getPickerStyle(),
            inputIOS: getPickerStyle(),
          }}
          placeholder={{
            label: `${label}`,
            value: null,
            color: "#9EA0A4",
          }}
          value={selectedItem}
          onValueChange={(value) => onValueChange(value)}
          items={items}
        />
      </View>
    </View>
  );
};

export default PickerSelect;
