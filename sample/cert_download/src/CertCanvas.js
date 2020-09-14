import React, {useState} from 'react';
import { View } from 'react-native';
import Canvas,{Image as CanvasImage} from "react-native-canvas";
import PIC from "./png_base64.js/cert";

const CertCanvas = (props) => {
    const [OutputPic, setOutputPic] = useState("");

    const handleCanvas = (canvas) => {
        let userName = "王小明";
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
                
                context.font = 'bold 90px Microsoft JhengHei';
                context.fillStyle = 'rgba(120, 123, 105, 0.5)';
                context.fillText(userName, 105, 525);
                const userNameMeasure = await context.measureText(userName);
                const usernameWidth = userNameMeasure && userNameMeasure.width;

                // 下面會使用到 usernameWidth 的長度來畫畫
                context.beginPath()
                context.moveTo(95, 555)		                        // 畫線開始位置
                context.lineTo(95 + usernameWidth + 42, 555)		// 畫線結束位置
                context.lineWidth = 3.5;
                context.strokeStyle = 'rgba(120, 123, 105, 0.5)';
                context.stroke();		                            // 開始畫線

                /****** 輸出 *******/
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
                    props.getImage(output);
                    setOutputPic(output);
                }
            })
        }
    }

    return (
        <View>
            <Canvas ref={handleCanvas} style={{width: 0,height:0}}/>
        </View>
    );
}


export default CertCanvas;