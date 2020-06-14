import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

//wrapper hack to use with navigation
export default function AdminScreen({ navigation }) {
    navigation.setOptions({ headerTitle: 'Panel Administracyjny' });

    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <Text style={styles.getStartedText}>Akcje dostepne dla Administratora:</Text>
              <View style={styles.buttonWrap}>
              <Button
                onPress={() => navigation.navigate('AddAction')}
                mode="contained"
               > Dodaj Akcje Punktowaną </Button>
               </View>
               <View style={styles.buttonWrap}>
               <Button
                onPress={() => navigation.navigate('AddCoupon')}
                mode="contained"
                disabled={true}
               >Dodaj kupon</Button>
              </View>
          </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    padding: 30,
  },
  buttonWrap: {
    paddingTop: 30,
  },
});
