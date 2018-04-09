import React from 'react';
import { View, Text, Modal, Platform } from 'react-native';
import { Spinner } from './Spinner';

const CustomModal = (props) => {
   const { modalViewStyle, modalTextStyle } = styles;
   const { modalMessageColor, spinnerColor } = props;
   const spinnerSize = Platform.OS === 'android' ? 100 : 1;
return (
  <Modal
  visible={props.showModal}
  transparent
  animationType='fade'
  onRequestClose={() => {}}// it is must for android app
  >

  <View style={modalViewStyle}>
  <Text style={[modalTextStyle, { color: modalMessageColor }]}>{props.modalMessage}</Text>
  </View>
  <View style={modalViewStyle}>
  <Spinner
  color={spinnerColor}
  size={spinnerSize}
  />
  </View>

  </Modal>
 );
};
// justifyContent property doesnot seem to have any effect
// I donot know why for now
const styles = {
  modalViewStyle: {
    borderWidth: 0,
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.70)'
  },
   modalTextStyle: {
     flex: 1,
     textAlign: 'center',
     lineHeight: 40,
     fontSize: 40,
     // fontFamily: 'JosefinSans-Regular',
      color: '#000'
   }
};

export { CustomModal };
