import React from 'react';
import {  View,  StyleSheet,  } from 'react-native';
import { Modal, Text, Button, IconButton } from 'react-native-paper';

const CustomModal = ({ visible, onDismiss, icon, message, buttonText, onButtonPress, iconColor }) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContent}>
      <View style={styles.modalInnerContent}>
        {icon && <IconButton icon={icon} size={50} style={styles.iconStyle} iconColor={iconColor} />}
        <Text style={styles.textStyle}>{message}</Text>
        <Button mode="contained" onPress={onButtonPress} style={styles.buttonStyle}>
          {buttonText}
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalInnerContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  },
  iconStyle: {
    marginBottom: 10,
  },
  textStyle: {
    textalign: 'center',
    fontSize: 20,
    marginBottom: 15,
    },
    buttonStyle: {
    marginTop: 10,
    },
    });

export default CustomModal;
