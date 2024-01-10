import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApartamentsService } from './apartaments.service';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { SetApartamentDTO } from 'src/shared/dto/set-apartament.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';


export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(32))
    .join('');

  callback(null, `${randomName}${fileExtName}`);
};


@Controller('apartaments')
export class ApartamentsController {

  constructor(private apartamentsService: ApartamentsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getApartaments(@Query('hint') hint?: string) {
    return this.apartamentsService.getApartaments(hint);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getApartament(@Param('id') id: string) {
    return this.apartamentsService.getApartament(id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true }),
  )
  @Post()
  createApartament(@Body() setApartamentDTO: SetApartamentDTO) {
    return this.apartamentsService.createApartament(setApartamentDTO);
  }

  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true }),
  )
  @Put(':id')
  updateApartament(@Param('id') id: string, @Body() setApartamentDTO: SetApartamentDTO) {
    return this.apartamentsService.updateApartament(id, setApartamentDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteApartament(@Param('id') id: string) {
    return this.apartamentsService.deleteApartament(id);
  }

  @Post(':id/file')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/apartaments',
        filename: editFileName,
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    return this.apartamentsService.saveFile(id, file.filename);
  }

  @Get('file/:filename')
  // @UseGuards(AuthGuard)
  getFile(@Param('filename') fileName, @Res() res) {
    return res.sendFile(
      fileName, 
      {root: './files/apartaments'},
      err => {
        if (err) {
          const status = (err as any).status || 404;
          res.status(status).send()
        }
      }
    );
  }
}
