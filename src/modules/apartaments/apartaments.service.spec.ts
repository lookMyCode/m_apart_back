import { Test, TestingModule } from '@nestjs/testing';
import { ApartamentsService } from './apartaments.service';

describe('ApartamentsService', () => {
  let service: ApartamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartamentsService],
    }).compile();

    service = module.get<ApartamentsService>(ApartamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
