import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  createService() {
    try {
      return this.serviceService.createService();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
