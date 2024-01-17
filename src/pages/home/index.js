import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { stylesHome } from "../../styles/GlobalStyles";
import PickerSelect from "../../components/forms/PickerSelect";
import useStorage from "../../components/hooks/useStorage";
import { formatCPF } from "../../utils/FormatInputs";
import ItemModal from "../../components/home/ItemModal";

export function Home({ navigation }) {
  const { getItem, removeItem } = useStorage();
  const isFocused = useIsFocused();
  const [proposals, setProposals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [forceReload, setforceReload] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");


  useEffect(() => {
    async function loadProposal() {
      const proposals = await getItem("@proposal");
      setProposals(proposals);
      console.log('all proposals',proposals )
    }
    loadProposal();
  }, [isFocused, forceReload]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEdit = () => {
    navigation.navigate("Profile", selectedItem);
  };

  const handleDelete = async () => {
    try {
      await removeItem("@proposal", selectedItem);
      setforceReload(!forceReload)
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      "Você tem certeza?",
      "Você tem certeza que deseja remover o usuário?",
      [
        {
          text: "Sim",
          onPress: () => {
            handleDelete();
          },
        },
        {
          text: "Não",
          onPress: () => {
            handleCloseModal()
          },
        },
      ]
    );
  };

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
          keyExtractor={(item) => item?.id?.toString()}
          style={stylesHome.tableRowContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
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
                    {formatCPF(item.document)}
                  </Text>
                  <Text style={stylesHome.tableRowDataCity}>
                    {item.city} - {item.state}
                  </Text>
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
      <ItemModal
        visible={modalVisible}
        title="Escolha uma ação"
        onEdit={handleEdit}
        onDelete={showConfirmDialog}
        onClose={handleCloseModal}
      />
    </View>
  );
}
