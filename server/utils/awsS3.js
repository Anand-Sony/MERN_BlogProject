const {PutObjectCommand , S3Client , GetObjectCommand} = require("@aws-sdk/client-s3");
const {awsRegion , awsAccessKey , awsSecretAccessKey , awsBucketName} = require("../config/kyes");
const generateCode = require("../utils/generateCode");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
    region : awsRegion,
    credentials : {
        accessKeyId : awsAccessKey,
        secretAccessKey : awsSecretAccessKey
    }
});
const uploadFileToS3 = async({file , ext})=>{
    // some_random_number_some_random_number.ext
    const key = `${generateCode(12)}_${Date.now()}${ext}`;
    const params = {
        Bucket : awsBucketName,
        Body : file.buffer,
        Key : key,
        ContentType : file.mimetype 
    };
    const command = new PutObjectCommand(params);

    try{
        await client.send(command);
        return key;
    }
    catch(error){
        console.log(error);
    }
};

const signedUrl = async(key)=>{
    const params = {
        Bucket : awsBucketName,
        Key : key
    }
    const command = new GetObjectCommand(params);
    try{
        await getSignedUrl (client , command , {expiresIn:60}) // link expires in 60 seconds
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {uploadFileToS3 , signedUrl};
