import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";

import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function App() {
  const [proposals, setProposals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();

  const filterOptions = [
    { label: "CPF", value: "CPF" },
    { label: "Nome", value: "Nome" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Proposta de Venda</Text>
      <View style={styles.contentMargin}>
        <View style={styles.filterContainer}>
          <View style={styles.filterPicker}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedFilter(value)}
              items={filterOptions}
              placeholder={{ label: "Filtrar por", value: null }}
              style={pickerSelectStyles}
            />
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <View style={styles.searchButtonContainer}>
              <Icon name="search" size={20} color="#8e8e93" />
              <Text style={styles.searchButtonText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={proposals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.description}</Text>
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.newProposalButton}>
            <Icon name="add-circle" size={20} color="white" reverse />
            <Text style={styles.buttonText}>Nova Proposta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportButton}>
            <FontAwesome5 name="print" size={20} color="white" />
            <Text style={styles.buttonText}>Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    color: "#000",
    paddingRight: 30,
  },
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#42a5f5",
    width: "100%",
    padding: 16,
  },
  contentMargin: {
    paddingHorizontal: 16,
  },
  filterContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  filterPicker: {
    fontSize: 16,
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    color: "#000",
    width: "100%",
    margin: "auto",
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#c9c9ce",
    marginTop: 10,
  },
  searchButtonContainer: {
    paddingVertical: 5,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#8e8e93",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
  },
  newProposalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#42a5f5",
    padding: 10,
    borderRadius: 5,
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72bb53",
    padding: 10,
    borderRadius: 5,
  },
  buttonText:{
    color: "#fff",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "600",
  },
});
