import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import StorageHelper,{StoragePermissions,NEVER_ASK_AGAIN} from "./src/StorageHelper";

const App = () => {
  
  const onClickedPermission = async () => {
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
          }
          else throw new Error("使用者未授權");
      }
    }catch(err){
      // 可以跳出提示和使用者說明狀況
      throw new Error(err);
    }
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{onClickedPermission()}}>
        <View style={styles.btnView}>
          <Text>Android Permission</Text>
        </View>
      </TouchableOpacity>
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
