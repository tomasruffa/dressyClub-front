import React from "react";
import { TouchableOpacity, Image } from "react-native";

import styles from "./header-back-button.styles";

type HeaderBackButtonProps = {
  onPress: () => void;
  iconStyle?: any;
  style?: any;
};

const chevronLeft = require("../../assets/chevron-left.png");

const HeaderBackButton = ({ onPress, iconStyle, style }: HeaderBackButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Image style={iconStyle} source={chevronLeft} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
