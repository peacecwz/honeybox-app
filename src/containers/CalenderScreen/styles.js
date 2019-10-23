import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.whiteTwo,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 10,
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
    },
  });