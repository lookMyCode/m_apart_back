import { WorkersService } from './workers.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SetWorkerDTO } from 'src/shared/dto/set-worker.dto';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { FilterDtoPipe } from 'src/shared/pipes/filter-dto/filter-dto.pipe';

@Controller('workers')
export class WorkersController {

  constructor(private workersService: WorkersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getWorkers(@Query('hint') hint?: string) {
    return this.workersService.getWorkers(hint);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getWorker(@Param('id') id: string) {
    return this.workersService.getWorker(id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true }),
  )
  @Post()
  createWorker(@Body() setWorkerDTO: SetWorkerDTO) {
    return this.workersService.createWorker(setWorkerDTO);
  }

  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true }),
  )
  @Put(':id')
  updateWorker(@Param('id') id: string, @Body() setWorkerDTO: SetWorkerDTO) {
    return this.workersService.updateWorker(id, setWorkerDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteWorker(@Param('id') id: string) {
    return this.workersService.deleteWorker(id);
  }
}
