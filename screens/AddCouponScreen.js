import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

class AddCouponScreenClass extends React.Component {
    constructor () {
        super();
        this.state = {
          saldo: 0,
          akcje: []
        };

        this.dbh = firebase.firestore();
        this.id = 1;
    }

    componentDidMount() { 
    }

    render () {
        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <Text style={styles.getStartedText}>Dodaj nowy kupon:</Text>
              </ScrollView>
            </View>
          );
    }
}

//wrapper hack to use with navigation
export default function AddCouponScreen({ navigation }) {
    navigation.setOptions({ headerTitle: 'Dodaj nowy kupon' });

  return (
    <AddCouponScreenClass></AddCouponScreenClass>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    padding: 30,
  },
});
