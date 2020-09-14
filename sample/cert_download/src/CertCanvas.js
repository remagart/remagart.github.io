import React, {useState} from 'react';
import { View, Text,Image,StyleSheet } from 'react-native';
import Canvas,{Image as CanvasImage} from "react-native-canvas";
import PIC from "./png_base64.js/cert";

const CertCanvas = (props) => {
    const [OutputPic, setOutputPic] = useState("");

    const handleCanvas = (canvas) => {
        if(canvas){
            // 畫畫囉
            canvas.width = 1558;
            canvas.height = 1100;
            const context = canvas.getContext('2d');
            let image = new CanvasImage(canvas);
            image.src = PIC;	// 背景圖片
            image.addEventListener('load',async () => {
                // context在上面宣告過了
                context.drawImage(image, 0, 0, 1558, 1100);	// 與上面畫布大小設定一樣
            

                let output = await canvas.toDataURL("image/jpeg"); // png也行
                // output就會是一個base64的圖片了

                const REG = /^\"/gi;
                const REG_T = /\"$/gi;
                if(OutputPic === ""){
                    if(REG.test(output) === true){
                        output = output.replace(REG,"");
                        if(REG_T.test(output) === true){
                            output = output.replace(REG_T,"");
                        }
                    }
                    setOutputPic(output);
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Canvas ref={handleCanvas} style={{width: 0,height:0}}/>
            <Image source={{uri: OutputPic}} style={{width: 200,height:100}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default CertCanvas;