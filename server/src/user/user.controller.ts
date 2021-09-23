import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from '@app/user/user.service';
import {CreateUserDto} from '@app/user/dto/create-user.dto';
import {UserResponseInterface} from '@app/user/types/user-response.interface';
import {LoginDto} from '@app/user/dto/login.dto';

@Controller()

export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto):
        Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginDto: LoginDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginDto);
        return this.userService.buildUserResponse(user);
    }
}