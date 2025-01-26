import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { ImageService } from '../services/image.service';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('products/images')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @Roles(Role.ADMIN, Role.BOULANGER)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse<{ imageUrl: string }>> {
    const imageUrl = await this.imageService.uploadImage(file);
    return {
      success: true,
      message: 'Image uploaded successfully',
      data: { imageUrl: imageUrl },
      statusCode: 201,
    };
  }

  @Delete(':filename')
  @Roles(Role.ADMIN, Role.BOULANGER)
  async deleteImage(
    @Param('filename') filename: string,
  ): Promise<ApiResponse<void>> {
    await this.imageService.deleteImage(`/products/images/${filename}`);
    return {
      success: true,
      message: 'Image deleted successfully',
      statusCode: 200,
    };
  }
} 