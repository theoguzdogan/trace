import * as React from 'react';
import { useCallback } from 'react';
import { Button, View, Text, Alert, Linking, TextInput, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { getBookDataAsync, tryfunction } from './rest';
import { useState, useEffect } from "react";
import { CameraView, Camera } from "expo-camera/next";
import { useIsFocused } from '@react-navigation/native';
import Bookshelf from './Bookshelf';


const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button
        onPress={getBookDataAsync}
        title="fetch book"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>© 2024 Oguz Dogan, All rights reserved.</Text>
      <OpenURLButton url={"https://github.com/theoguzdogan"}>GitHub</OpenURLButton>
    </View>
  );
}

 function SearchScreen({ navigation }) {
  const [isbnSearch, setIsbnSearch] = React.useState('');
  const [bookInit, setBookInit] = React.useState(false);
  //let bookData;
  let bookData = {
    title: '',
    author: '',
    image_url: 'https://reactnative.dev/img/tiny_logo.png'
  };
  const [imageUrl, setImageUrl] = React.useState("https://reactnative.dev/img/tiny_logo.png");

  useEffect(()=>{
    setImageUrl(bookData['image_url']);
  },[bookInit]);

  const handleBookFetch = () => {
    getBookDataAsync(isbnSearch)
      .then((rawData) => {
        if (rawData !== null) {
          bookData = {
            title: rawData['details']['title'],
            author: rawData['details']['authors'][0]['name'],
            image_url: rawData["thumbnail_url"]
          };
          console.log(bookData);
          console.log(bookData['image_url']);
        } else {
          console.log("error occurred");
        }
      })
      .finally((rawData) => {
        if(rawData !== null) {
          setBookInit(true);
        } else {
          setBookInit(false);
        }
        
      });
  };

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
        onPress={() => navigation.navigate('BarcodeScannerScreen', { setIsbnSearch })}
        title="scan barcode"
      />
      <Button
        onPress={handleBookFetch}
        title="fetch book"
      />
      {bookInit && <Image 
      style={{ width:200, height:320 }}
        source={{
          uri: "https://covers.openlibrary.org/b/id/12358359.jpg"
        }}/>}
    </View>
  );
}

function BarcodeScannerScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();
  const { setIsbnSearch: setIsbnSearch } = route.params;

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setIsbnSearch(data);
    handleClose();
  };

  const handleClose = () => {
    navigation.navigate('SearchScreen');
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}>
      {isFocused &&
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      }
      <Button title={"close"} onPress={handleClose}/>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="SearchScreen" component={SearchScreen} />
        <Drawer.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} />
        <Drawer.Screen name="Bookshelf" component={Bookshelf} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}