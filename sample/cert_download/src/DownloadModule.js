import RNFS from "react-native-fs";
import {Platform,ToastAndroid} from "react-native";
import RNFetchBlob from "rn-fetch-blob";

const DEFAULT_KEEP = 1024 * 1024 * 10;  // 10MB
export const getLocalPath = async (keepSize = DEFAULT_KEEP) => {
    let spaceInfo = await RNFS.getFSInfo();
    if(spaceInfo.freeSpace > keepSize){
        let path = (Platform.OS === "android" ? 
            RNFS.ExternalStorageDirectoryPath
            : RNFS.DocumentDirectoryPath
        ) 
        + "/download/";

        return path; 
    }
    else{
        // 錯誤處理
    }
}

export const createPDF = async (path,pdf64,fileName) => {
    let file = path + fileName;
    try{
        if(await RNFetchBlob.fs.exists(path)){		// 確認路徑存不存在
            console.log("folder exist");
        }
        else{
            await RNFetchBlob.fs.mkdir(path);		// 創建資料夾
        }
    
        await RNFS.writeFile(file,pdf64,"base64");		// 創建PDF這個檔案在相對應路徑
        if(Platform.OS === "android") ToastAndroid.show("Download complete",ToastAndroid.LONG);
        console.log("createPDF success!");
    }catch(err){
        console.log("createPDF err",err);
    }
}