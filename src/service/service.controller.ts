import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  createService() {
    try {
      const newService = this.serviceService.createService();
      return newService;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
