import React from 'react';
import { View, Text, Modal, Platform } from 'react-native';
import { Spinner } from './Spinner';

const CustomModal = (props) => {
   const { modalViewStyle, modalTextStyle } = styles;
   const spinnerSize = Platform.OS === 'android' ? 100 : 1;
return (
  <Modal
  visible={props.showModal}
  transparent
  animationType='fade'
  onRequestClose={() => {}}// it is must for android app
  >

  <View style={[modalViewStyle, { alignItems: 'flex-end' }]}>
  <Text style={modalTextStyle}>{props.modalMessage}</Text>
  </View>
  <View style={modalViewStyle}>
  <Spinner
  color='#e67e22dd'
  size={spinnerSize}
  />
  </View>

  </Modal>
 );
};

const styles = {
  modalViewStyle: {
    borderWidth: 0,
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(241, 191, 142, 0.75)'
  },
   modalTextStyle: {
     flex: 1,
     textAlign: 'center',
     lineHeight: 40,
     fontSize: 40,
     // fontFamily: 'JosefinSans-Regular',
      color: '#fff'
   }
};

export { CustomModal };
