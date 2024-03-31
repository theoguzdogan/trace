import * as React from 'react';
import { Button, View, Text, Alert, Linking, TextInput } from 'react-native';
import { getBookDataAsync } from './rest';
import { NavigationContainer } from '@react-navigation/native';
import { BarcodeScanner } from './BarcodeScanner';

export function SearchScreen({ navigation }) {
    const [isbnSearch, setIsbnSearch] = React.useState('');
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top' }}>
        <TextInput
          style={{
            height: 40,
            width: 250,
            borderRadius: 5,
            margin: 12,
            borderWidth: 1,
            padding: 10
          }}
          onChangeText={setIsbnSearch}
          value={isbnSearch}
          placeholder="Enter ISBN (barcode number)"
          keyboardType="numeric"
        />
        <Button
          onPress={()=>{navigation.navigate('BarcodeScanner')}}
          title="scan barcode"
        />
        <Button
          onPress={()=>{getBookDataAsync(isbnSearch)}}
          title="fetch book"
        />
      </View>
    );
  }