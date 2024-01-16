import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { stylesHome, pickerSelectStylesHome } from "../../styles/GlobalStyles";
import useStorage from "../../components/hooks/useStorage";

export function Home({ navigation }) {
  const { getItem, logAsyncStorageItems } = useStorage();
  const [proposals, setProposals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadProposal() {
      const proposals = await getItem("@proposal");
      console.log("teste123", proposals);
      setProposals(proposals);
    }
    loadProposal();
  }, [isFocused]);

  const filterOptions = [
    { label: "CPF", value: "document" },
    { label: "Nome", value: "name" },
    { label: "Cidade", value: "city" },
    { label: "Proposta", value: "proposal" },
  ];

  return (
    <View style={stylesHome.containerHome}>
      {/* <Text style={stylesHome.header}>Proposta de Venda</Text> */}
      <View style={stylesHome.contentMargin}>
        <View style={stylesHome.filterContainer}>
          <View style={stylesHome.filterPicker}>
            <PickerSelect
              tableName="filterOptions"
              selectedItem={selectedFilter}
              onValueChange={(value) => setSelectedFilter(value)}
              label="Filtrar por"
              hasTextLabel={true}
            />
          </View>
          <TouchableOpacity style={stylesHome.searchButton}>
            <View style={stylesHome.searchButtonContainer}>
              <Icon name="search" size={20} color="#8e8e93" />
              <Text style={stylesHome.searchButtonText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        {console.log("teste proposal", proposals)}
        <FlatList
          data={proposals}
          keyExtractor={(item) => item.id.toString()}
          style={stylesHome.tableRowContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => console.log("Item selecionado:", item)}
            >
              <View style={stylesHome.tableRowContent}>
                <View style={stylesHome.tableRowIcon}>
                  <Icon
                    name={
                      item.proposalStatus === "awaiting"
                        ? "time-outline"
                        : "checkmark-circle-outline"
                    }
                    size={45}
                    color="#000"
                    style={stylesHome.tableIcon}
                  />
                </View>
                <View style={stylesHome.tableRowData}>
                  <Text style={stylesHome.tableRowDataName}>{item.name}</Text>
                  <Text style={stylesHome.tableRowDataDoc}>
                    {item.document}
                  </Text>
                  <Text style={stylesHome.tableRowDataCity}>{item.city}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={stylesHome.buttonContainer}>
          <TouchableOpacity
            style={stylesHome.newProposalButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Icon name="add-circle" size={20} color="white" />
            <Text style={stylesHome.buttonText}>Nova Proposta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesHome.reportButton}>
            <FontAwesome5 name="print" size={20} color="white" />
            <Text style={stylesHome.buttonText}>Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
