import { Test, TestingModule } from '@nestjs/testing';
import { ApartamentsController } from './apartaments.controller';

describe('ApartamentsController', () => {
  let controller: ApartamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartamentsController],
    }).compile();

    controller = module.get<ApartamentsController>(ApartamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
