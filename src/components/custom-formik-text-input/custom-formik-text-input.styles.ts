import {StyleSheet} from 'react-native';

import {defaultColors} from '../../global/global-styles';

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 14,
    color: defaultColors.cinder,
    width: '100%',
    height: 48,
    borderBottomColor: defaultColors.gray,
    borderBottomWidth: 1,
  },
  inputFocused: {
    borderBottomColor: defaultColors.black,
  },
  labelWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 6,
  },
  errorText: {
    fontSize: 10,
    color: defaultColors.darkRed,
    lineHeight: 16,
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 14,
    color: defaultColors.gray,
  },
  errorMessage: {
    color: defaultColors.darkRed,
  },
  validatedMessage: {
    fontSize: 10,
    lineHeight: 14,
    color: defaultColors.cinder,
    marginTop: 10,
  },
  disabledColor: {
    color: defaultColors.gray,
  },
  prefixIcon: {
    width: 14,
    height: 14,
    marginRight: 10,
  },
  prefixIconError: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  showButton: {
    marginLeft: -150,
  },
  pickerContainer: {
    flex: 1,
  }
});

export default styles;
