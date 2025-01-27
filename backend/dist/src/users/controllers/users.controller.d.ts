import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { User } from '../entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<ApiResponse<any>>;
    findAll(): Promise<ApiResponse<any>>;
    findOne(id: number): Promise<ApiResponse<any>>;
    update(id: number, updateUserDto: Partial<User>): Promise<ApiResponse<any>>;
    remove(id: number): Promise<ApiResponse<any>>;
}
