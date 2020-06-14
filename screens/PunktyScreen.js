import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

class PunktyScreenClass extends React.Component {
    constructor () {
        super();
        this.state = {
          saldo: 0
        };
    }

    componentDidMount() {
        console.log('hello');
        const dbh = firebase.firestore();
        const id = 1;
        
        // dbh.collection("characters").doc("luigi").set({
        //     employment: "plumber",
        //     outfitColor: "red",
        //     specialAttack: "speedball"
        // })

        dbh.collection("punkty_uzytkownika").get().then((collection) => {
            collection.forEach((doc) => {
                const data = doc.data();
                if (data['id_uzytkownika'] == id) 
                this.setState({
                    saldo: data['saldo'],
                });
            })
        })
    }

    render () {
        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <Text style={styles.getStartedText}>Saldo Twoich Punktów Plus wynosi:</Text>
                  <View style={{ padding: 30, fontWeight: 'bold', fontSize: 50 }}>
                      <Text>{this.state.saldo}</Text>
                  </View>
                  <Text style={styles.getStartedText}>Weź udział w jednej z akcji promocyjnych, żeby zdobyć więcej punktów:</Text>
              </ScrollView>
            </View>
          );
    }
}

//wrapper hack to use with navigation
export default function PunktyScreen() {
  return (
    <PunktyScreenClass></PunktyScreenClass>
    )
}

PunktyScreen.navigationOptions = {
    header: null,
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    padding: 30,
  },
});
