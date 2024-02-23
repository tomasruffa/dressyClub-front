import { ActivityIndicator, Alert, Text, View } from "react-native";
import CustomSafeAreaView from "../../components/custom-safe-area-view/custom-safe-area-view.component";
import DataTable from "../../components/data-table/data-table";
import { useLazyGetCarsQuery, usePutCarMutation } from "../../model/request/cars.api";
import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../components/header-navigation/header-navigation.component";
import { CarData } from "../../model/entities/car-data";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import CreateIcon from '../../assets/create.png';
import styles from "./home.styles";

const Home = () => {
    const navigation = useNavigation();
    const [getCarsTrigger, getCars] = useLazyGetCarsQuery();
    const [putCarsTrigger, putCars] = usePutCarMutation();
    const [allCars, setAllCars] = useState<CarData[]>([]);

    const getAllCarsTrigger = async () => {
        const result = await getCarsTrigger();
        setAllCars([])
        if (result.data) {
            setAllCars(result.data)
        }
    }

    const updateAllCars = async (data: CarData[]) => {
        const result = await putCarsTrigger(data);
        if (result.data.message) {
            Alert.alert(result.data.message)
        }
        getAllCarsTrigger();
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getAllCarsTrigger()
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <CustomSafeAreaView tabScreen>
            <HeaderNavigation title={'Home Car Table'} />
            <View style={styles.container}>
                {getCars.isFetching && <ActivityIndicator size='large' style={styles.loading} />}
                {(allCars.length > 0 && !getCars.isFetching) && <DataTable customData={allCars} customHeaders={['Model', 'Brand', 'Color', 'Value', 'Production Cost', 'Transportation Cost', 'Total']} executeUpdate={(data) => updateAllCars(data)} reloadData={getAllCarsTrigger} />}
                {(allCars.length === 0 && !getCars.isFetching) && <>
                    <Text style={styles.noData}>There is no data, please start creating it with floating button bellow</Text>
                    <FloatingAction
                        actions={[
                            {
                                text: 'Create New',
                                icon: CreateIcon,
                                name: 'btn_create_new',
                                color: 'black',
                            },
                        ]}
                        onPressItem={(name) => {
                            if (name === 'btn_create_new') {
                                navigation.push('CarCreateScreen');
                            }
                        }}
                        color="black"
                    />
                </>
                }
            </View>
        </CustomSafeAreaView>
    );
}

export default Home;