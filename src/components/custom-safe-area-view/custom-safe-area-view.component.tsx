import React, { ReactNode } from "react";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import styles from "./custom-safe-area-view.styles";
import { defaultColors } from "../../global/global-styles";

type CustomSafeAreaViewProps = {
  children: ReactNode;
  backgroundColor?: String;
  style?: any;
  tabScreen?: boolean;
};
const CustomSafeAreaView = ({
  children,
  backgroundColor = defaultColors.white,
  style,
  tabScreen = false,
}: CustomSafeAreaViewProps) => {
  const edges: Edge[] = tabScreen
    ? ["top", "left", "right"]
    : ["top", "left", "right", "bottom"];
  const containerStyle = tabScreen
    ? styles.container
    : { ...styles.container, ...styles.fullScreen };
  return (
    <>
      <SafeAreaView
        style={[containerStyle, style, { backgroundColor }]}
        edges={edges}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default CustomSafeAreaView;
