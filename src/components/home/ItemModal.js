import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import { stylesHome } from "../../styles/GlobalStyles";

const itemModal = ({ visible, title, onEdit, onDelete, onClose }) => {
  const buttons = [
    { title: "Editar", onPress: () => onEdit() },
    { title: "Excluir", onPress: () => onDelete() },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={stylesHome.modalContainer}
        onPress={onClose}
      >
        <View style={stylesHome.modalContent}>
          <Text style={stylesHome.modalTitle}>{title}</Text>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                stylesHome.modalButton,
                button.title === "Excluir"
                  ? stylesHome.modalButtonDelete
                  : stylesHome.modalButtonEdit,
              ]}
              onPress={() => {
                button.onPress();
                onClose();
              }}
            >
              <Text style={stylesHome.modalButtonText}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default itemModal;
