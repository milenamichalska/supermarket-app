import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, RadioButton, Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as firebase from 'firebase';
import "firebase/firestore";

class AddActionScreenClass extends React.Component {
    constructor () {
        super();
        this.state = {
          text: '',
          products: [],
          checked: {},
          quantity: 0,
          startDate: new Date(),
          showStartDatepicker: false,
          visibleDialog: false,
        };

        this.dbh = firebase.firestore();
        this.id = 1;
    }

    componentDidMount() { 

        let products = [];
        this.dbh.collection("produkt").get().then((collection) => {
            collection.forEach((doc) => {
                products.push({id: doc.id, ...doc.data(), checked: false});
            })
            this.setState({
                products: products,
            });
        })
    }

    onStartChange = (event) => {
        const date = event.nativeEvent.timestamp;
        this.setState({ startDate: date, showStartDatepicker: false }); 
    }

    addAction () {
        let newAction = this.dbh.collection("akcja_punktowa").doc();

        newAction.set(
            {
                data_rozpoczecia: firebase.firestore.Timestamp.fromDate(new Date(this.state.startDate)),
                nazwa: this.state.text,
                ilosc_punktow: this.state.quantity,
                kod_produktu: this.state.checked.id
            }
        );

        this.setState({ visibleDialog: true }); 
    }

    render () {
        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardDismissMode="interactive">
                <Text>Akcja Punktowana to akcja dotycząca konkretnego produktu - po zakupie określonej ilości produktu do konta Użytkownika dodawana jest określona ilośc Punktów Plus.</Text>
                <Text style={styles.paragraph}>Dodaj nową Akcję Punktowaną:</Text>
                <View style={styles.paragraph}>
                <Text style={styles.paragraph}>Wpisz nazwę Akcji:</Text>
                <TextInput value={this.state.text} onChangeText={text => this.setState({ text })} label={'Tytuł akcji'}/>
                </View>
                <View style={styles.paragraph}>
                <Text style={styles.paragraph}>Wybierz produkt, na który obowiązuje Akcja:</Text>
                {this.state.products.map(el => <View>
                    <RadioButton
                    value={el}
                    style={{width: 10}}
                    status={this.state.checked == el ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: el }); }}
                    />
                    <Text>{el.nazwa}</Text>
                </View>)}
                </View>
                <View style={styles.paragraph}>
                <Text>Ile punktów użytkownik otrzyma za daną Akcję?</Text>
                <TextInput keyboardType={'number-pad'} value={this.state.quantity} onChangeText={quantity => this.setState({ quantity })} label={'Ilość punktów'}/>
                </View>
                <View style={styles.paragraph}>
                    <Text>Wybierz datę rozpoczęcia Akcji:</Text>
                    <Button
                        onPress={() => this.setState({ showStartDatepicker: true })}
                        icon="calendar"
                    > Wybierz datę </Button>
                    <Text style={styles.paragraph}>Akcja bedzie trwała 7 dni od podanej daty.</Text>
                    <Text style={styles.paragraph}>Wszystko gotowe?</Text>
                    <Button
                        icon="plus"
                        onPress={() => {this.addAction()}}
                        mode="contained"
                    >Dodaj Akcję</Button>
                    {this.state.showStartDatepicker && (
                    <DateTimePicker
                    value={this.state.startDate}
                    mode={'date'}
                    display="default"
                    onChange={this.onStartChange}
                    />
                    )}
                </View>
                <Portal>
                    <Dialog
                        visible={this.state.visibleDialog}
                        onDismiss={() => this.setState({ visibleDialog: false })}>
                        <Dialog.Title>Akcja dodana!</Dialog.Title>
                        <Dialog.Content>
                        <Paragraph>Jest już widoczna w zakładce Punkty Plus!</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={() => this.setState({ visibleDialog: false })}>Gotowe</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
              </ScrollView>
            </View>
          );
    }
}

//wrapper hack to use with navigation
export default function AddActionScreen({ navigation }) {
    navigation.setOptions({ headerTitle: 'Dodaj nową akcję' });

  return (
    <AddActionScreenClass></AddActionScreenClass>
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
  paragraph: {
      paddingTop: 20
  }
});
