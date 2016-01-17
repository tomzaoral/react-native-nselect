/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";
import { connect } from "react-redux/native";


let {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  PickerIOS,
  Dimensions,
  Modal
} = React;

const {width, height} = Dimensions.get('window')

let PickerItemIOS = PickerIOS.Item;

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startValue: props.selectedValue,
      selectedValue: props.selectedValue,
      isVisible: false
    };
  }

  _handleValueChanged(value) {
    this.setState({selectedValue: value});
  }

  _pickerDone() {
    this.setState({startValue: this.state.selectedValue});
    this.props.onChange(this.state.selectedValue);
    this.toggle();
  }

  _pickerCanceled() {
    this.setState({selectedValue: this.state.startValue});
    this.props.onChange(this.state.startValue);
    this.toggle();
  }


  _renderToolbar() {
    return (
      <View style={styles.pickerToolbar}>
        <View style={styles.pickerCancelBtnView}>
          <Text
            style={styles.pickerCancelBtnText}
            onPress={this._pickerCanceled.bind(this)}>
            Cancel
          </Text>
        </View>
        <Text style={styles.pickerTitle}>
          {this.props.title}
        </Text>
        <View style={styles.pickerDoneBtnView}>
          <Text
            style={styles.pickerDoneBtnText}
            onPress={this._pickerDone.bind(this)}>
            Done
          </Text>
        </View>
      </View>
    );
  }

  _renderWheel() {
    return (
      <View style={styles.pickerWheel}>
        {this._renderToolbar()}
        <PickerIOS
          selectedValue={this.state.selectedValue}
          onValueChange={this._handleValueChanged.bind(this)}>
          {this.props.pickerData.map((item) => (
            <PickerItemIOS
              key={item}
              value={item}
              label={item}
            />
          ))}
        </PickerIOS>
        </View>
    );
  }

  toggle() {
    this.setState({isVisible: !this.state.isVisible});
  }

  hide() {
    if(this.isPickerShow) {
      this.setState({isVisible: false});
    }
  }

  render() {
    return (
       <Modal
        animated={true}
        transparent={true}
        visible={this.state.isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            {this._renderWheel()}
          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)' // overlay
  },
  modalInnerContainer: {
    width: width
  },
  pickerWheel: {
    flex: 1,
    backgroundColor: '#d2d5db'
  },
  pickerToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#bbc2c9'
  },
  pickerCancelBtnView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pickerCancelBtnText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#007aff'
  },
  pickerDoneBtnView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  pickerDoneBtnText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#007aff',
    borderRadius: 6,
    color: '#ffffff',
    overflow: 'hidden'
  },
  pickerTitle: {
		flex: 3,
		color: 'black',
		textAlign: 'center'
	},
});

Picker.propTypes = {
  pickerData: React.PropTypes.array,
  selectedValue: React.PropTypes.string,
  title: React.PropTypes.string,
  onChange: React.PropTypes.func,
  toggle: React.PropTypes.bool
};

Picker.defaultProps = {
  pickerData: [],
  selectedValue: null,
  pickerTittle: null
};

export default Picker;
