import React from 'react'
import { Button, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Field, Formik } from 'formik';
import CustomFormikTextInput from '../../components/custom-formik-text-input/custom-formik-text-input.component';
import { defaultColors } from '../../global/global-styles';
import CustomSafeAreaView from '../../components/custom-safe-area-view/custom-safe-area-view.component';
import styles from './create-car-screen.styles'
import { carModels, colorCars } from '../../utils/data';
import * as Yup from 'yup';
import HeaderNavigation from '../../components/header-navigation/header-navigation.component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderBackButton from '../../components/header-back-button/header-back-button.component';
import { useNavigation } from '@react-navigation/native';
import { usePostCarMutation } from '../../model/request/cars.api';

type createCarFormValues = {
    model: string;
    brand: string;
    color: string;
    value: string;
    productionCost: string;
    transportationCost: string;
}

const validationSchema = Yup.object().shape({
    model: Yup.string().required('Model is required'),
    brand: Yup.string().required('Brand is required'),
    color: Yup.string().required('Color is required'),
    value: Yup.string().required('Value is required'),
    productionCost: Yup.string().required('Production Cost is required'),
    transportationCost: Yup.string().required('Transportation Cost is required')
  });

const CreateCarScreen = () => {
    const navigation = useNavigation();
    const initialFormValues: createCarFormValues = {
        model: '',
        brand: '',
        color: '',
        value: '',
        productionCost: '',
        transportationCost: ''
    };
    const [postCarTrigger, postCar] = usePostCarMutation();

    const createCar = async (values: createCarFormValues, {resetForm}: any) => {
        await postCarTrigger(values);
        navigation.pop();
    }

    return (
        <CustomSafeAreaView>
            <HeaderNavigation
          title="Create New Car"
          leftButton={<HeaderBackButton onPress={() => navigation.goBack()} />}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={80}
          style={styles.content}>
          <TouchableOpacity
            onPress={Keyboard.dismiss}
            style={styles.content}>
            <Formik
                initialValues={initialFormValues}
                validationSchema={validationSchema}
                onSubmit={createCar}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.container}>
                        <View style={styles.itemContainer}>
                            <Field
                                label="Model"
                                component={CustomFormikTextInput}
                                name="model"
                                autoCorrect={false}
                                placeholder="Enter your Model"
                                autoCapitalize="none"
                                placeholderTextColor={defaultColors.grayChateau}
                            />
                        </View>
                        <View style={styles.itemContainer}>
                            <Field
                                label="Brand"
                                component={CustomFormikTextInput}
                                name="brand"
                                autoCorrect={false}
                                placeholder="Enter your Brand"
                                autoCapitalize="none"
                                placeholderTextColor={defaultColors.grayChateau}
                                pickerItems={carModels}
                                isPicker
                                editable={true}
                                disabled={false}
                            />
                        </View>
                        <View style={styles.itemContainer}>
                            <Field
                                label="Main Color"
                                component={CustomFormikTextInput}
                                name="color"
                                autoCorrect={false}
                                placeholder="Enter your Main Color"
                                autoCapitalize="none"
                                placeholderTextColor={defaultColors.grayChateau}
                                pickerItems={colorCars}
                                isPicker
                                editable={true}
                                disabled={false}
                            />
                        </View>
                        <View style={styles.itemContainer}>
                            <Field
                                label="Value"
                                component={CustomFormikTextInput}
                                name="value"
                                autoCorrect={false}
                                placeholder="Enter your Value"
                                autoCapitalize="none"
                                placeholderTextColor={defaultColors.grayChateau}
                            />
                        </View>
                        <View style={styles.itemContainer}>

                            <Field
                                label="Production Cost"
                                component={CustomFormikTextInput}
                                name="productionCost"
                                autoCorrect={false}
                                placeholder="Enter your Production Cost"
                                autoCapitalize="none"
                                placeholderTextColor={defaultColors.grayChateau}
                            />
                        </View>
                        <View style={styles.itemContainer}>
                            <Field
                                label="Transportation Cost"
                                component={CustomFormikTextInput}
                                name="transportationCost"
                                autoCorrect={false}
                                placeholder="Enter your Transportation Cost"
                                autoCapitalize="none"
                                placeholderTextColor={defaultColors.grayChateau}
                            />
                        </View>
                        <Pressable style={styles.buttonSubmit} onPress={() => handleSubmit()}>
                            <Text style={styles.buttomSubmitText}>Submit</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
            </TouchableOpacity>
            </KeyboardAwareScrollView>
        </CustomSafeAreaView>
    )
}

export default CreateCarScreen;