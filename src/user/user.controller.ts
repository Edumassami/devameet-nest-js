import { Controller, Get, Request, BadRequestException, Put, HttpCode, HttpStatus, Body} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserMessageHelper } from "./helpers/messages.helper";
import { UpdateUserDto } from "./dtos/updateuser.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getUser(@Request() req){
        const {userId} = req?.user;
        const user = await this.userService.getUserById(userId);

        if(!user) {
            throw new BadRequestException(UserMessageHelper.GET_USER_NOT_FOUND);
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id: user._id
        }
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
        const {userId} = req?.user;
        await this.userService.updateUser(userId, dto);
    }
}