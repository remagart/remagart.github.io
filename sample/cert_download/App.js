import React, { useState } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,Platform } from 'react-native';
import StorageHelper,{StoragePermissions,NEVER_ASK_AGAIN} from "./src/StorageHelper";
import CertCanvas from "./src/CertCanvas";
import {getLocalPath,createPDF} from "./src/DownloadModule";
import {HandlePDF} from "./src/HandlePDF";
import RNFetchBlob from 'rn-fetch-blob';

const App = () => {

  const [ImgUrl, setImgUrl] = useState("");

  const getImage = (img64) => {
    if(img64){
      setImgUrl(img64);
    }
  }
  
  const onClickedPermission = async () => {
    if(Platform.OS === "android"){
      try{
        let res = await StorageHelper.request();
        let isNeverAskedAgain = false;
        for(let i = 0;i < StoragePermissions.length;i++){
            if(res[StoragePermissions[i]] === NEVER_ASK_AGAIN) isNeverAskedAgain = true;
        }
        if(isNeverAskedAgain){
          throw new Error("使用者未授權");
        }
        else{
            let chkRes = await StorageHelper.check();
            if(chkRes === true){
              // Next Step
              downloadCert();
            }
            else throw new Error("使用者未授權");
        }
      }catch(err){
        // 可以跳出提示和使用者說明狀況
        throw new Error(err);
      }
    }
    else{
      downloadCert();
    }
  }

  const downloadCert = async () => {
    let path = await getLocalPath();
    let pdf64 = await HandlePDF(ImgUrl);
    await createPDF(path,pdf64,"certificate.pdf");

    if(Platform.OS === "ios"){
      RNFetchBlob.ios.previewDocument(path+"certificate.pdf");
    }
  }

  return(
    <View style={styles.container}>
      <Image source={{uri: ImgUrl}} style={{width: 300,height:200}}/>

      <TouchableOpacity onPress={()=>{onClickedPermission()}}>
        <View style={styles.btnView}>
          <Text>Download</Text>
        </View>
      </TouchableOpacity>
      
      <CertCanvas getImage={getImage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnView: {
    width: 200,
    height: 100,
    backgroundColor: "#B0E0E6",
    justifyContent: "center",
    alignItems: "center",
  }
})


export default App;
