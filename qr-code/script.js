function getQrCode() {
  // set the size of the tag:
  let tagWidth = 50;
  let tagHeight = 50;
  // get the text field:
  let tagCode = document.getElementById('textField').value;
  // start the tag request from qrserver.com:
  let url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + tagCode;
  // get the image:
  let img = document.getElementById('qrCode');
  // fill in the properties of the image:
  img.src = url;
  img.alt = "a QR code of the text field";
  img.height = tagHeight;
  img.width = tagWidth;
}