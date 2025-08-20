// backend/src/user/user.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('nearby')
  async getNearby(@Req() req) {
    return this.userService.findNearby(req.user.id, 50); // 50 km
  }
}