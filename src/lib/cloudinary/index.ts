import {v2} from 'cloudinary'


const cloudinary= v2
cloudinary.config({
    secure:true,
});

const uploadImage = async (imagePath: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options)
        console.log(result);
        return result.public_id;
    } catch (error) {
        console.error(error);
        
    }
}