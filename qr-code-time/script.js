/*
  QR Code generator with time dependency
  Draws a QR code using a text string that changes 
  according to the time.  Uses 
  https://github.com/kazuhikoarase/qrcode-generator
  as the QR Code generator library. It's hosted at this CDN:
  https://unpkg.com/qrcode-generator@1.4.4/qrcode.js
  created 4 Jun 2026
  by Tom Igoe
*/

function getQrCode() {
  // get the div element for the QR code image:
  let qrDiv = document.getElementById('qrCode');
  // get th text of the text field:
  let qrText = document.getElementById('textField').value;
   let now = new Date();
   qrText += "\n" + now;
   console.log(qrText);
  // make the QR code:
  let qr = qrcode(0, 'L');
  qr.addData(qrText);
  qr.make();
  // create an image from it:
  let qrImg = qr.createImgTag(2, 8, "qr code of " + qrText);
  // add it to the div:
  qrDiv.innerHTML = qrImg;
}


// set an interval function to run once a second:
 setInterval(getQrCode, 5000); 