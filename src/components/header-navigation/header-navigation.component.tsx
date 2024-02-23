import React, { ReactNode } from "react";
import { View, Text, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./header-navigation.styles";

type HeaderNavigationProps = {
  title?: String;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  style?: any;
  titleStyle?: any;
  titleEllipsis?: boolean;
  adjustFontSizeToFit?: boolean;
  numberOfLines?: number;
};

const HeaderNavigation = ({
  title,
  leftButton,
  rightButton,
  style,
  titleStyle,
  titleEllipsis,
  adjustFontSizeToFit = true,
  numberOfLines = 2,
}: HeaderNavigationProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      {leftButton && (
        <View style={styles.leftButtonContainer}>{leftButton}</View>
      )}

      {titleEllipsis ? (
        <Text
          selectable
          style={[styles.title, titleStyle]}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustFontSizeToFit}
        >
          {title} 
        </Text>
      ) : (
        <Text selectable style={[styles.title, titleStyle]}>{title}</Text>
      )}

      {rightButton && (
        <View style={styles.rightButtonContainer}>{rightButton}</View>
      )}
    </View>
  );
};

export default HeaderNavigation;
