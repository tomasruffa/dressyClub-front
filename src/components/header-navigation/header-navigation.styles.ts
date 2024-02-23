import {StyleSheet} from 'react-native';

import {defaultColors} from '../../global/global-styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    minHeight: 24,
    marginTop: 0,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: defaultColors.black,
    textAlign: 'center',
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: -1,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 16,
  },
});

export default styles;
