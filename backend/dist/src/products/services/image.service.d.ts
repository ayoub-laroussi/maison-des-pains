import { ConfigService } from '@nestjs/config';
export declare class ImageService {
    private readonly configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    private ensureUploadDirExists;
    uploadImage(file: Express.Multer.File): Promise<string>;
    deleteImage(imageUrl: string): Promise<void>;
}
