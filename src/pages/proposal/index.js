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
import { NumericInput } from "../../components/forms/NumericInput";
import { TextInputComponent } from "../../components/forms/TextInput";
import { fetchOpenCepApi } from "../../components/api/OpenCepAPI/OpenCepAPI";

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
    try {
      await logAsyncStorageItems();
      const result = await fetchOpenCepApi(cep);
      setState(result.uf);
      setCity(result.localidade);
      setNeighborhood(result.bairro);
      setAddress(result.logradouro);
    } catch (error) {
      console.error("Error fetching data from:", error);
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
        <NumericInput
          label="CPF"
          originalValue={document}
          onChangeText={setDocument}
          placeholder="Digite CPF"
          keyboardType="numeric"
          formatType="CPF"
          shortInput={true}
          maxLength={18}
        />
      </View>

      <TextInputComponent
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Digite o Nome"
        shortInput={false}
      />

      <View style={stylesForms.formRow}>
        <NumericInput
          label="RG"
          originalValue={ieRg}
          onChangeText={setIeRg}
          placeholder="Digite RG"
          keyboardType="numeric"
          formatType="RG"
          shortInput={true}
          maxLength={10}
        />
        <PickerSelect
          tableName="maritalStatus"
          selectedItem={maritalStatus}
          onValueChange={setMaritalStatus}
          label="Estado Civil"
          hasTextLabel={true}
        />
      </View>

      <View style={stylesForms.formRow}>
        <TextInputComponent
          label="Profissão"
          value={profession}
          onChangeText={setProfession}
          placeholder="Digite a Profissão"
          shortInput={true}
        />
        <DatePicker
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </View>

      <View style={stylesForms.formRow}>
        <NumericInput
          label="Telefone"
          originalValue={phone}
          onChangeText={setPhone}
          placeholder="Digite Telefone"
          keyboardType="numeric"
          formatType="Phone"
          shortInput={true}
          maxLength={15}
        />
        <PickerSelect
          tableName="gender"
          selectedItem={gender}
          onValueChange={setGender}
          label="Gênero"
          hasTextLabel={true}
        />
      </View>

      <View style={stylesForms.formRow}>
        <TextInputComponent
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o Email"
          keyboardType="email-address"
          shortInput={false}
        />
      </View>

      <View style={stylesForms.formRow}>
        <NumericInput
          label="CEP"
          originalValue={cep}
          onChangeText={setCep}
          placeholder="Digite o CEP"
          keyboardType="numeric"
          formatType="CEP"
          shortInput={true}
          maxLength={10}
        />
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
        <TextInputComponent
          label="Estado"
          value={state}
          onChangeText={(text) => setState(text)}
          placeholder="Digite o Estado"
          shortInput={true}
        />
        <TextInputComponent
          label="Cidade"
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="Digite a Cidade"
          shortInput={true}
        />
      </View>
      <View style={stylesForms.formRow}>
        <TextInputComponent
          label="Bairro"
          value={neighborhood}
          onChangeText={(text) => setNeighborhood(text)}
          placeholder="Digite o Bairro"
          shortInput={true}
        />
        <TextInputComponent
          label="Endereço"
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Digite o Endereço"
          shortInput={true}
        />
      </View>

      <View style={stylesForms.formRow}>
        <NumericInput
          label="Número"
          originalValue={number}
          onChangeText={setNumber}
          placeholder="Digite o Número"
          keyboardType="numeric"
          formatType="number"
          shortInput={true}
        />
        <TextInputComponent
          label="Complemento"
          value={complement}
          onChangeText={setComplement}
          placeholder="Digite o Complemento"
          shortInput={true}
        />
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
