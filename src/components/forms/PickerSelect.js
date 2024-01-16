import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  stylesForms,
  pickerSelectStylesForms,
} from "../../styles/GlobalStyles";
import fakeApi from "../api/formFakeAPi/FakeApi";

const PickerSelect = ({ tableName, selectedItem, onValueChange, label, hasTextLabel }) => {
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

  return (
    <View style={[stylesForms.formCol, stylesForms.shortInput]}>
      {hasTextLabel && <Text style={stylesForms.label}>{label}</Text>}
      <View style={stylesForms.pickerContainer}>
        <RNPickerSelect
          style={pickerSelectStylesForms}
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
