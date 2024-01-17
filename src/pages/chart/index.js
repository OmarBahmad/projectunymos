import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { PieChart } from "react-native-chart-kit";
import randomColor from "randomcolor";

import PickerSelect from "../../components/forms/PickerSelect";
import { pieChartStyles } from "../../styles/GlobalStyles";

export const PieChartScreen = () => {
  const route = useRoute();
  const propItem = route?.params || {};

  const [selectedItem, setSelectedItem] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleChartCreation = () => {
    if (!selectedItem) {
      Alert.alert(
        "Selecione uma opção",
        "Por favor, selecione um item antes de criar o gráfico."
      );
      return;
    }

    const countByValue = {};
    propItem.forEach((item) => {
      const value = item[selectedItem];
      countByValue[value] = (countByValue[value] || 0) + 1;
    });

    const data = Object.entries(countByValue).map(([label, value]) => ({
      name: label,
      color: randomColor(),
      value,
    }));

    setChartData(data);
  };

  return (
    <View style={pieChartStyles.container}>
      <PickerSelect
        tableName="filterOptions"
        selectedItem={selectedItem}
        onValueChange={(value) => setSelectedItem(value)}
        label="Selecione uma Opção"
        hasTextLabel={true}
        customStyle="chart"
      />
      <TouchableOpacity
        style={pieChartStyles.createChartButton}
        onPress={handleChartCreation}
      >
        <Text style={pieChartStyles.createChartButtonText}>Criar Gráfico</Text>
      </TouchableOpacity>

      {chartData.length > 0 && (
        <View style={pieChartStyles.chartContainer}>
          <PieChart
            data={chartData}
            width={320}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
      )}
    </View>
  );
};
