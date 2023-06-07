console.log("middleware")
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configuration 
cloudinary.config({
    cloud_name: "dpnpbijhw",
    api_key: "137781261383417",
    api_secret: "mlaSLv3WsJ5zvGi_VQBsRp19fUo"
  });

async function uploadToCloudinary(localFilePath , file) {
    console.log("middleware function");
    
    console.log("local file path = " , localFilePath)
    
    var mainFolderName = "main"
    var filePathOnCloudinary = mainFolderName + "/uploads/"+file.filename
  
    return cloudinary.uploader.upload(localFilePath,{"public_id":`${filePathOnCloudinary}`})
    .then((result) => {
      fs.unlinkSync(localFilePath)
      return {
        message: "Success",
        url:result.url
      };
    }).catch((error) => {
        console.log(error);
      fs.unlinkSync(localFilePath)
      return {message: "Fail",};
    });
    
}

module.exports = uploadToCloudinary;