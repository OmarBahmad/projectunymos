import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";

import ConfettiCannon from "react-native-confetti-cannon";
import { useRoute } from "@react-navigation/native";

import { stylesForms } from "../../styles/GlobalStyles";
import useStorage from "../../components/hooks/useStorage";
import DatePicker from "../../components/forms/DatePicker";
import PickerSelect from "../../components/forms/PickerSelect";
import { NumericInput } from "../../components/forms/NumericInput";
import { TextInputComponent } from "../../components/forms/TextInput";
import CustomModal from "../../components/forms/CustomModal";
import { fetchOpenCepApi } from "../../components/api/OpenCepAPI/OpenCepAPI";

export function ProposalFormScreen({ navigation }) {
  const [id, setId] = useState("");
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

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const moment = require("moment");
  const { getItem, saveItem, removeItem } = useStorage();
  const route = useRoute();
  const propItem = route?.params || {};
  if (propItem && Object.keys(propItem).length > 0) {
    useEffect(() => {
      if (propItem) {
        setId(propItem.id);
        setProposalDate(moment(propItem.proposalDate, "DD/MM/YYYY").toDate());
        setDocument(propItem.document);
        setName(propItem.name);
        setIeRg(propItem.ieRg);
        setMaritalStatus(propItem.maritalStatus);
        setPhone(propItem.phone);
        setGender(propItem.gender);
        setEmail(propItem.email);
        setProfession(propItem.profession);
        setBirthDate(moment(propItem.birthDate, "DD/MM/YYYY").toDate());
        setCep(propItem.cep);
        setState(propItem.state);
        setCity(propItem.city);
        setNeighborhood(propItem.neighborhood);
        setAddress(propItem.address);
        setNumber(propItem.number);
        setComplement(propItem.complement);
        setProposalStatus(propItem.proposalStatus);
      }
    }, []);
  }
  const handleIntelligentSearch = async () => {
    try {
      setLoading(true);
      if (cep.length !== 8) {
        ToastAndroid.showWithGravityAndOffset(
          "CEP deve conter 8 dígitos.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          30,
          100
        );
        setLoading(false);
        return;
      }
      const result = await fetchOpenCepApi(cep);

      if (result.error) {
        ToastAndroid.showWithGravityAndOffset(
          "CEP Inválido\nPor favor, insira um CEP válido.",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
      } else {
        setState(result.uf);
        setCity(result.localidade);
        setNeighborhood(result.bairro);
        setAddress(result.logradouro);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data from:", error);
    }
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
    navigation.navigate("Home");
  };

  const successModalButtons = [
    {
      title: "Cadastro Concluido!",
      onPress: handleModalClose,
    },
  ];

  const handleSubmit = async () => {
    try {
      const existingProposals = await getItem("@proposal");
      const existingItemIndex = existingProposals.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        await removeItem("@proposal", existingProposals[existingItemIndex]);
      }
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
      // console.log("Form data saved:", formData);
      setSuccessModalVisible(true);
      this.explosion && this.explosion.start();
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
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={stylesForms.buttonText}>Busca Inteligente</Text>
            )}
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
      <CustomModal
        visible={successModalVisible}
        title="Cadastro concluído com sucesso!"
        buttons={successModalButtons}
        onClose={handleModalClose}
      />
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fallSpeed={2000}
        ref={(ref) => (this.explosion = ref)}
      />
    </ScrollView>
  );
}
