"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
let ImageService = class ImageService {
    constructor(configService) {
        this.configService = configService;
        this.uploadDir = this.configService.get('UPLOAD_DIR') || 'uploads/products';
        this.ensureUploadDirExists();
    }
    async ensureUploadDirExists() {
        try {
            await fs_1.promises.access(this.uploadDir);
        }
        catch {
            await fs_1.promises.mkdir(this.uploadDir, { recursive: true });
        }
    }
    async uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('Aucun fichier n\'a été fourni');
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Format de fichier non supporté');
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('La taille du fichier ne doit pas dépasser 5MB');
        }
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const filePath = (0, path_1.join)(this.uploadDir, fileName);
        await fs_1.promises.writeFile(filePath, file.buffer);
        return `/products/images/${fileName}`;
    }
    async deleteImage(imageUrl) {
        if (!imageUrl || !imageUrl.trim())
            return;
        const fileName = imageUrl.split('/').pop();
        if (!fileName)
            return;
        const filePath = (0, path_1.join)(this.uploadDir, fileName);
        try {
            const exists = await fs_1.promises.stat(filePath).then(() => true).catch(() => false);
            if (exists) {
                await fs_1.promises.unlink(filePath);
            }
        }
        catch {
        }
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImageService);
//# sourceMappingURL=image.service.js.map