import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { stylesForms } from "../../styles/GlobalStyles";
import useStorage from "../../components/hooks/useStorage";
import DatePicker from "../../components/forms/DatePicker";
import PickerSelect from "../../components/forms/PickerSelect";

export function ProposalFormScreen() {
  const [proposalDate, setProposalDate] = useState(new Date());
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [ieRg, setIeRg] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cep, setCep] = useState("");
  const [stateFromCep, setStateFromCep] = useState("");
  const [cityFromCep, setCityFromCep] = useState("");
  const [neighborhoodFromCep, setNeighborhoodFromCep] = useState("");
  const [addressFromCep, setAddressFromCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [proposalStatus, setProposalStatus] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const moment = require("moment");

  const { getItem, saveItem, logAsyncStorageItems } = useStorage();

  const handleIntelligentSearch = async () => {
    // Implement logic to fetch data from Correios API based on the entered CEP
    // Update the state, city, neighborhood, and address fields accordingly
    try {
      await logAsyncStorageItems();
      // Example: const result = await fetchCorreiosApi(cep);
      // Example: setStateFromCep(result.state);
      // Example: setCityFromCep(result.city);
      // Example: setNeighborhood(result.neighborhood);
      // Example: setComplement(result.address);
    } catch (error) {
      console.error("Error fetching data from Correios API:", error);
    }
  };

  useEffect(() => {
    // Fetch data from API for dropdowns (replace with actual API calls)
    // Example: fetchStateData();
    // Example: fetchCityData(selectedState);
    // Example: fetchNeighborhoodData(selectedCity);
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = {
        id: new Date().getTime(),
        proposalDate: moment(proposalDate).format("DD/MM/YYYY"),
        document,
        name,
        ieRg,
        maritalStatus,
        phone,
        gender,
        email,
        profession,
        birthDate: moment(birthDate).format("DD/MM/YYYY"),
        cep,
        stateFromCep,
        cityFromCep,
        neighborhoodFromCep,
        addressFromCep,
        state,
        city,
        neighborhood,
        address,
        number,
        complement,
        proposalStatus,
      };
      await saveItem("@proposal", formData);
      console.log("Form data saved:", formData);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={stylesForms.container}>
      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <View style={stylesForms.labelContainer}>
            <Text style={stylesForms.label}>Data da Proposta</Text>
          </View>
          <TextInput
            style={[stylesForms.input]}
            value={moment(proposalDate).format("DD/MM/YYYY")}
            editable={false}
          />
        </View>

        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <View style={stylesForms.labelContainer}>
            <Text style={stylesForms.label}>CPF/CNPJ</Text>
          </View>
          <TextInput
            style={[stylesForms.input]}
            value={document}
            onChangeText={(text) => setDocument(text)}
            placeholder="CPF/CNPJ"
            maxLength={14}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={[stylesForms.formCol, stylesForms.longInput]}>
        <View style={stylesForms.labelContainer}>
          <Text style={stylesForms.label}>Nome do Titular</Text>
        </View>
        <TextInput
          style={stylesForms.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Nome do Titular"
        />
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>IE/RG</Text>
          <TextInput
            style={stylesForms.input}
            value={ieRg}
            onChangeText={(text) => setIeRg(text)}
            placeholder="IE/RG"
            keyboardType="numeric"
          />
        </View>
        <PickerSelect
          tableName="maritalStatus"
          selectedItem={maritalStatus}
          onValueChange={setMaritalStatus}
          label="Estado Civil"
          hasTextLabel={true}
        />
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Profissão</Text>
          <TextInput
            style={stylesForms.input}
            value={profession}
            onChangeText={(text) => setProfession(text)}
            placeholder="Profissão"
          />
        </View>
        <DatePicker
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Celular</Text>
          <TextInput
            style={stylesForms.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Celular"
            keyboardType="numeric"
          />
        </View>
        <PickerSelect
          tableName="gender"
          selectedItem={gender}
          onValueChange={setGender}
          label="Gênero"
          hasTextLabel={true}
        />
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.longInput]}>
          <Text style={stylesForms.label}>Email</Text>
          <TextInput
            style={stylesForms.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />
        </View>
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>CEP</Text>
          <TextInput
            style={stylesForms.input}
            value={cep}
            onChangeText={(text) => setCep(text)}
            placeholder="CEP"
            keyboardType="numeric"
          />
        </View>
        <View style={[stylesForms.seachButtonContainer]}>
          <TouchableOpacity
            style={[
              stylesForms.formCol,
              stylesForms.shortInput,
              stylesForms.button,
            ]}
            onPress={handleIntelligentSearch}
          >
            <Text style={stylesForms.buttonText}>Busca Inteligente</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Estado</Text>
          <TextInput
            style={stylesForms.input}
            value={state || stateFromCep}
            onChangeText={(text) => setState(text)}
            placeholder="Estado"
          />
        </View>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Cidade</Text>
          <TextInput
            style={stylesForms.input}
            value={city || cityFromCep}
            onChangeText={(text) => setCity(text)}
            placeholder="Cidade"
          />
        </View>
      </View>
      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Bairro</Text>
          <TextInput
            style={stylesForms.input}
            value={neighborhood || neighborhoodFromCep}
            onChangeText={(text) => setNeighborhood(text)}
            placeholder="Bairro"
          />
        </View>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Endereço</Text>
          <TextInput
            style={stylesForms.input}
            value={address || addressFromCep}
            onChangeText={(text) => setAddress(text)}
            placeholder="Endereço"
          />
        </View>
      </View>

      <View style={stylesForms.formRow}>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Número</Text>
          <TextInput
            style={stylesForms.input}
            value={number}
            onChangeText={(text) => setNumber(text)}
            placeholder="Número"
            keyboardType="numeric"
          />
        </View>
        <View style={[stylesForms.formCol, stylesForms.shortInput]}>
          <Text style={stylesForms.label}>Complemento</Text>
          <TextInput
            style={stylesForms.input}
            value={complement}
            onChangeText={(text) => setComplement(text)}
            placeholder="Complemento"
          />
        </View>
      </View>

      <View style={stylesForms.formRow}>
        <PickerSelect
          tableName="proposalStatus"
          selectedItem={proposalStatus}
          onValueChange={setProposalStatus}
          label="Conclusão da Proposta"
          hasTextLabel={true}
        />
      </View>

      <TouchableOpacity style={stylesForms.submitButton} onPress={handleSubmit}>
        <Text style={[stylesForms.buttonText, stylesForms.submitButtonText]}>
          Enviar Proposta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
