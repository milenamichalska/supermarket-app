import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

class PunktyScreenClass extends React.Component {
    constructor () {
        super();
        this.state = {
          saldo: 0,
          akcje: []
        };

        this.dbh = firebase.firestore();
        this.id = 1;
    }

    aktywujAkcje(el) {
        const new_saldo = Number(this.state.saldo) + Number(el['ilosc_punktow']);
        this.setState({
            saldo: new_saldo,
        });

        this.dbh.collection("punkty_uzytkownika").doc("1B3nD6ID5xNjTGH2Fr70").set({
            id_uzytkownika: this.id,
            saldo: new_saldo
        })
    }

    componentDidMount() { 

        this.dbh.collection("punkty_uzytkownika").get().then((collection) => {
            collection.forEach((doc) => {
                const data = doc.data();
                if (data['id_uzytkownika'] == this.id) 
                this.setState({
                    saldo: data['saldo'],
                });
            })
        })

        let akcje = [];
        this.dbh.collection("akcja_punktowa").get().then((collection) => {
            collection.forEach((doc) => {
                console.log(doc.id);
                const data = doc.data();
                const date_now = new Date().getTime() / 1000;

                if (data['data_rozpoczecia']?.seconds < date_now && (!data['data_zakonczenia'] || data['data_zakonczenia']?.seconds > date_now))
                akcje.push({id: doc.id, ...doc.data()});
            })

            console.log(akcje);

            this.setState({
                akcje: akcje,
            });
        })
    }

    render () {
        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <Text style={styles.getStartedText}>Saldo Twoich Punktów Plus wynosi:</Text>
                  <View>
                      <Text style={{ padding: 30, fontWeight: 'bold', fontSize: 100, textAlign: 'center' }}>{this.state.saldo}</Text>
                  </View>
                  <Text style={styles.getStartedText}>Weź udział w jednej z akcji promocyjnych, żeby zdobyć więcej punktów:</Text>
                  <View>
                  {this.state.akcje.map(el => <View style={styles.actionWrapper}>
                        <Text style={styles.actionTitle}>{el.nazwa}</Text>
                        <Text>{el.ilosc_punktow} pkt</Text>
                        <Button
                        onPress={() => {this.aktywujAkcje(el)}}
                        icon="lock-open"
                        mode="contained"
                        >Aktywuj</Button>
                      </View>)}
                  </View>
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
  getStartedText: {
  },
  actionWrapper: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#ddd'
  },
  actionTitle: {
    fontWeight: 'bold'
  }
});
