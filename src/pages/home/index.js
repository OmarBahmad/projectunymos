import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { stylesHome} from "../../styles/GlobalStyles";
import PickerSelect from "../../components/forms/PickerSelect";
import useStorage from "../../components/hooks/useStorage";

export function Home({ navigation }) {
  const { getItem } = useStorage();
  const [proposals, setProposals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadProposal() {
      const proposals = await getItem("@proposal");
      setProposals(proposals);
    }
    loadProposal();
  }, [isFocused]);


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
              hasTextLabel={false}
              customStyle={true}
            />
          </View>
          <TouchableOpacity style={stylesHome.searchButton}>
            <View style={stylesHome.searchButtonContainer}>
              <Icon name="search" size={20} color="#8e8e93" />
              <Text style={stylesHome.searchButtonText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
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
