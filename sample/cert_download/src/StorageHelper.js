import {PermissionsAndroid} from "react-native";

export const NEVER_ASK_AGAIN = PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
export const StoragePermissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
];

export default class StorageHelper{
    // 跳出彈窗詢問權限
    static request = async () => {
        try {
            return await PermissionsAndroid.requestMultiple(StoragePermissions);
        } catch (err) {
            console.log('request permission error !', err);
        }
    }

    // 確認權限
    static check = async () => {
        try {
            return await PermissionsAndroid.check(StoragePermissions[0]) && 
                    await PermissionsAndroid.check(StoragePermissions[1]);
        } catch (err) {
            console.log('check permission error !', err);
        }
    }
}