import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    headerRow: {
      backgroundColor: 'lightgray',
    },
    headerText: {
      fontWeight: 'bold',
      padding: 8,
      textAlign: 'center',
    },
    input: { borderWidth: 1, padding: 8, textAlign: 'center'},
  });
  
  export default styles;