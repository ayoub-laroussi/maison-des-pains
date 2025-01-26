import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<any>> {
    const user = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: 'User created successfully',
      data: user,
      statusCode: 201
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll(): Promise<ApiResponse<any>> {
    const users = await this.usersService.findAll();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      statusCode: 200
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    const user = await this.usersService.findOne(id);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
      statusCode: 200
    };
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Partial<User>
  ): Promise<ApiResponse<any>> {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      success: true,
      message: 'User updated successfully',
      data: user,
      statusCode: 200
    };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    await this.usersService.remove(id);
    return {
      success: true,
      message: 'User deleted successfully',
      statusCode: 200
    };
  }
} 