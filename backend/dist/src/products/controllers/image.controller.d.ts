import { ImageService } from '../services/image.service';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    uploadImage(file: Express.Multer.File): Promise<ApiResponse<{
        imageUrl: string;
    }>>;
    deleteImage(filename: string): Promise<ApiResponse<void>>;
}
