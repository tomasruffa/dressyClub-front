import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from '@react-navigation/native';
import { carModels, colorCars } from '../../utils/data';
import { CarData } from '../../model/entities/car-data';

import styles from './data-table.styles';

import EditIcon from '../../assets/edit.png';
import SaveIcon from '../../assets/save.png';
import CloseIcon from '../../assets/close.png';
import CreateIcon from '../../assets/create.png';
import RefreshIcon from '../../assets/refresh.png';
import { defaultColors } from '../../global/global-styles';

type DataTableProps = {
    customData: CarData[];
    customHeaders: string[];
    executeUpdate: (data: object[]) => void;
    reloadData: () => void;
};

const DataTable = ({ customData, customHeaders, executeUpdate, reloadData} : DataTableProps) => {
  const navigation = useNavigation();
  const [data, setData] = useState(customData || []);
  const [isEditing, setEditing] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [changedRows, setChangedRows] = useState([]);
  const headers = customHeaders || [];
  const originalData = customData;

  useEffect(() => {
    calculateColumnWidths();
  }, [data, headers]);

  const calculateColumnWidths = () => {
    const maxWidths = {};
    Object.keys(data[0]).forEach((fieldName, colIndex) => {
      const maxHeaderWidth = Math.max(
        (headers[colIndex] || fieldName).length * 10,
        80
      );
      const maxContentWidth = Math.max(
        ...data.map((rowData) => String(rowData[fieldName]).length)
      );
      maxWidths[fieldName] = Math.max(maxHeaderWidth, maxContentWidth * 10);
    });
    setColumnWidths(maxWidths);
  };

  const handleCreateNew = () => {
    navigation.push('CarCreateScreen');
  };

  const handleReloadData = () => {
    reloadData();
  };

  const handleEditAll = () => {
    setEditing(true);
    setData(JSON.parse(JSON.stringify(originalData)));
  };

  const handleSaveAll = () => {
    setEditing(false);
    const changedData = changedRows.map((rowIndex) => {
        const rowData = data[rowIndex];
  
        const changedFields = Object.keys(rowData).filter(
          (fieldName) => fieldName !== '_id' && rowData[fieldName] !== originalData[rowIndex][fieldName]
        );
  
        const changedRowObject = {
          _id: rowData._id,
        };
  
        changedFields.forEach((fieldName) => {
          changedRowObject[fieldName] = rowData[fieldName];
        });
  
        return changedRowObject;
      });
  
      executeUpdate(changedData)
      setChangedRows([]);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setData(originalData);
    setChangedRows([]);
  };

  const handleInputChange = (value, rowIndex, fieldName) => {
    const newData = [...data];
    const newChangedRows = [...changedRows];

    newData[rowIndex][fieldName] = value;

    if (!newChangedRows.includes(rowIndex)) {
      newChangedRows.push(rowIndex);
    }
    setData(newData);
    setChangedRows(newChangedRows);
  };


  const renderHeader = () => {
    const headerFields = Object.keys(data[0]);
    return (
      <View style={[styles.row, styles.headerRow]}>
        {headerFields.map((fieldName, colIndex) => (
          fieldName !== '_id' && (
            <Text
              key={colIndex}
              style={[styles.headerText, { width: columnWidths[fieldName] }]}
            >
              {headers[colIndex] || fieldName}
            </Text>
          )
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {renderHeader()}
          {data.map((rowData, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Object.keys(rowData).map((fieldName, colIndex) => (
                fieldName !== '_id' && (
                  <View key={colIndex} style={{ flex: 1 }}>
                    {fieldName === 'brand' || fieldName === 'color' ? (
                      <RNPickerSelect
                        onValueChange={(value) =>
                          handleInputChange(value, rowIndex, fieldName)
                        }
                        items={fieldName === 'brand' ? carModels : colorCars}
                        value={rowData[fieldName]}
                        style={{
                          inputAndroid: {
                            width: columnWidths[fieldName],
                            borderWidth: 1,
                            padding: 8,
                            textAlign: 'center',
                            backgroundColor: !isEditing ? defaultColors.white : defaultColors.grayChateau
                          },
                          inputIOS: {
                            width: columnWidths[fieldName],
                            borderWidth: 1,
                            padding: 8,
                            textAlign: 'center',
                            backgroundColor: !isEditing ? defaultColors.white : defaultColors.grayChateau
                          },
                        }}
                        disabled={!isEditing}
                      />
                    ) : (
                      <TextInput
                        style={[
                          styles.input,
                          { width: columnWidths[fieldName] },
                          {backgroundColor: !isEditing ? defaultColors.white : defaultColors.grayChateau}
                        ]}
                        value={rowData[fieldName].toString()}
                        onChangeText={(value) =>
                          handleInputChange(value, rowIndex, fieldName)
                        }
                        editable={isEditing}
                      />
                    )}
                  </View>
                )
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {isEditing ? (
        <FloatingAction
          actions={[
            {
              text: 'Save All',
              icon: SaveIcon,
              name: 'btn_save_all',
              color: 'black',
            },
            {
              text: 'Cancel Edit',
              icon: CloseIcon,
              name: 'btn_cancel_edit',
              color: 'black',
            },
          ]}
          onPressItem={(name) => {
            if (name === 'btn_save_all') {
              handleSaveAll();
            } else if (name === 'btn_cancel_edit') {
              handleCancelEdit();
            }
          }}
          color="black"
        />
      ) : (
        <FloatingAction
          actions={[
            {
              text: 'Refresh All',
              icon: RefreshIcon,
              name: 'btn_refresh_all',
              color: 'black',
            },
            {
              text: 'Edit All',
              icon: EditIcon,
              name: 'btn_edit_all',
              color: 'black',
            },
            {
              text: 'Create New',
              icon: CreateIcon,
              name: 'btn_create_new',
              color: 'black',
            },
          ]}
          onPressItem={(name) => {
            if (name === 'btn_edit_all') {
              handleEditAll();
            }
            if (name === 'btn_create_new') {
              handleCreateNew();
            }
            if (name === 'btn_refresh_all') {
                handleReloadData();
            }
          }}
          color="black"
        />
      )}
    </View>
  );
};


export default DataTable;
