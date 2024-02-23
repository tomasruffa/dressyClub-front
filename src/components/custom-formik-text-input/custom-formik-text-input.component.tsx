import React, { useState } from "react";
import { Text, View, ActivityIndicator, Image, TextInput } from "react-native";
import { FormikProps, FieldInputProps } from "formik";
import RNPickerSelect from 'react-native-picker-select';

import styles from "./custom-formik-text-input.styles";

type RestProps = {
  [x: string]: any;
};

type CustomFormikTextInputProps = {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label: string;
  validatedMessage: string;
  correctInfo: boolean;
  editable: boolean;
  loading: boolean;
  disabled: boolean;
  labelStyle: any;
  inputStyle: any;
  inputProps: RestProps;
  secureEntry: boolean;
  isPicker?: boolean; // New prop for input type
  pickerItems?: { label: string, value: any }[]; // New prop for picker items
};

const CustomFormikTextInput = (props: CustomFormikTextInputProps) => {
  const {
    form: { errors, touched, setFieldTouched },
    field: { name, onBlur, onChange, value },
    label,
    validatedMessage,
    correctInfo,
    editable,
    loading,
    disabled,
    labelStyle,
    inputStyle,
    secureEntry,
    isPicker = false,
    pickerItems,
    ...inputProps
  } = props;

  const [focused, setFocused] = useState(false);
  const hasError = (errors[name] && touched[name]) || false;

  const renderTextInput = () => (
    <TextInput
      returnKeyType={"done"}
      style={[
        styles.textInput,
        inputStyle,
        focused ? styles.inputFocused : {},
        disabled && styles.disabledColor,
      ]}
      onChangeText={(text) => onChange(name)(text)}
      onFocus={() => {
        setFocused(true);
      }}
      value={value}
      onBlur={() => {
        setFieldTouched(name);
        onBlur(name);
        setFocused(false);
      }}
      editable={!disabled || editable}
      {...inputProps}
    />
  );

  const renderPickerSelect = () => (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        onValueChange={(selectedValue) => onChange(name)(selectedValue)}
        items={pickerItems}
        value={value}
        style={{
          inputAndroid: {
            ...styles.textInput,
            width: '100%',
            borderWidth: 1,
            padding: 8,
          },
          inputIOS: {
            ...styles.textInput,
            width: '100%',
            borderWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          },
        }}
      disabled={disabled || !editable}
      />
    </View>

  );

  return (
    <>
      {label && (
        <Text
          style={[
            styles.inputLabel,
            labelStyle,
            hasError && styles.errorMessage,
          ]}
        >
          {label}
        </Text>
      )}
      <View style={styles.inputWrap}>
        {!isPicker ? renderTextInput() : renderPickerSelect()}
        {loading && <ActivityIndicator size="small" color="#2DA961" />}
      </View>
      {hasError && (
        <View style={styles.labelWrap}>
          <Text style={styles.errorText}>{String(errors[name])}</Text>
        </View>
      )}
    </>
  );
};

export default CustomFormikTextInput;
