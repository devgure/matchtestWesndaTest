// backend/src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findNearby(userId: string, maxDistanceKm: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user.location) return [];

    const earthRadiusKm = 6371;
    const maxDistanceRadians = maxDistanceKm / earthRadiusKm;

    return this.prisma.user.findMany({
      where: {
        id: { not: userId },
        location: {
          geoWithin: {
            centerSphere: [
              user.location.coordinates,
              maxDistanceRadians,
            ],
          },
        },
      },
      take: 20,
    });
  }
}