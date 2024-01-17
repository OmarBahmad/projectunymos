import React from "react";
import { Modal, View, Text, Button } from "react-native";
import { stylesForms } from "../../styles/GlobalStyles";

const CustomModal = ({ visible, title, buttons, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={stylesForms.modalContainer}>
        <View style={stylesForms.modalContent}>
          <Text style={stylesForms.modalTitle}>{title}</Text>
          {buttons.map((button, index) => (
            <Button
              key={index}
              title={button.title}
              onPress={button.onPress}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;