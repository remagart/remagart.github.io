import {PDFDocument,degrees,PageSizes} from "pdf-lib";

// 傳進來要用base64的圖片
export const HandlePDF = async (img64) => {
    const pdfDoc = await PDFDocument.create();		// 創建PDF檔案
    const page = pdfDoc.addPage(PageSizes.A4);		// 新增一頁空白頁
    const jpgImage = await pdfDoc.embedJpg(img64);		// 將圖片放進去PDF檔案

    page.drawImage(jpgImage,{		// 開始畫畫
        x: 0,
        y: page.getHeight(),
        width: page.getHeight(),		// 這邊是要讓圖片塞滿這份PDF
        height: page.getWidth(),
        rotate: degrees(-90),
    });
    page.setRotation(degrees(-90));		// 橫式

    const pdf64 = await pdfDoc.saveAsBase64();
    return pdf64;
}