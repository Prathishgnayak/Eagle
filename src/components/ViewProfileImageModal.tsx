// ImageModal.js
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const ViewProfileImageModal = ({selectedImage, isVisible, onClose}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onClose}>
      <View style={styles.modalContent}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.modalImage} />
        )}
      </View>
    </Modal>
  );
};
export default ViewProfileImageModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalImage: {
    width: 400,
    height: 400,
  },
});
