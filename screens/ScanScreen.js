
import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          hasCameraPermissions: status === "granted",
          buttonState: 'clicked',
          scanned: false
        });
      }

    handleBarCodeScanned = async({type, data})=>{
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }
    
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
        if (buttonState === "clicked" && hasCameraPermissions){
          return(
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          );
        }
  
        else if (buttonState === "normal"){
          return(
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            
            <View>
                <Image source={require("../assets/barcodeIMG.jpg")} style={{marginTop:400,width:200, height: 200}}></Image>
            </View>

            <Text style={{fontSize: 15,textDecorationLine: 'underline'}}>{
              hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
            }</Text>     
  
            <TouchableOpacity
              onPress={this.getCameraPermissions}
              style={{backgroundColor: '#2196F3',padding: 10,margin: 10,marginTop: 300,justifyContent:'center',textAlign: 'center',height: 40}}>
              <Text style={{fontSize: 15,textAlign: 'center',marginTop: 10}}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
          );
        }



      }
}
