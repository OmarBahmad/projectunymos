import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import removeAccents from "remove-accents";

import { stylesHome } from "../../styles/GlobalStyles";
import PickerSelect from "../../components/forms/PickerSelect";
import useStorage from "../../components/hooks/useStorage";
import { formatCPF } from "../../utils/FormatInputs";
import ItemModal from "../../components/home/ItemModal";
import SearchInput from "../../components/home/SearchInput";

export function Home({ navigation }) {
  const { getItem, removeItem } = useStorage();
  const isFocused = useIsFocused();
  const [proposals, setProposals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [forceReload, setforceReload] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [filteredProposals, setFilteredProposals] = useState([]);

  useEffect(() => {
    async function loadProposal() {
      const proposals = await getItem("@proposal");
      setProposals(proposals);
      setFilteredProposals(proposals);
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
      setforceReload(!forceReload);
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
            handleCloseModal();
          },
        },
      ]
    );
  };

  const handleSearch = () => {
    const normalizedSearch = removeAccents(textInputValue).toLowerCase();

    const filtered = proposals.filter((item) => {
      const normalizeField = (field) => removeAccents(field).toLowerCase();

      let searchCondition = false;

      switch (selectedFilter) {
        case "document":
          searchCondition = normalizeField(item.cpf).includes(normalizedSearch);
          break;
        case "name":
          searchCondition = normalizeField(item.name).includes(
            normalizedSearch
          );
          break;
        case "city":
          searchCondition = normalizeField(item.city).includes(
            normalizedSearch
          );
          break;
        case "phone":
          searchCondition = normalizeField(item.phone).includes(
            normalizedSearch
          );
          break;
        case "email":
          searchCondition = normalizeField(item.email).includes(
            normalizedSearch
          );
          break;
        default:
          searchCondition = true;
      }

      return searchCondition;
    });

    setFilteredProposals(filtered);
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
              customStyle="home"
            />
          </View>
          <SearchInput
            onChangeText={(text) => setTextInputValue(text)}
            onSearchPress={handleSearch}
            onSubmitEditing={handleSearch}
            placeholder="Search"
            value={textInputValue}
          />
        </View>
        <FlatList
          data={filteredProposals}
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

          <TouchableOpacity
            style={stylesHome.reportButton}
            onPress={() => navigation.navigate("Report", proposals)}
          >
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
