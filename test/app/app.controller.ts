import { ApiResponseView, ApiBodyView } from '@decorators/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { view, validateView } from '@nest-view';
import { AppService } from './app.service';
import { CreateUserBodyView, SuccessView } from './views/create-user.view';
import { UserView } from './views/get-user.view';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiResponseView(UserView)
  @Get()
  getUser() {
    const user = this.appService.getUser();
    return view(UserView, user);
  }

  @ApiBodyView(CreateUserBodyView)
  @ApiResponseView(SuccessView)
  @Post()
  createUser(
    @Body(validateView(CreateUserBodyView)) userData: CreateUserBodyView
  ) {
    const response = this.appService.createUser(userData);
    return view(SuccessView, response);
  }
}
