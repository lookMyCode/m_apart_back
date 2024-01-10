import { IsOptional, IsString } from "class-validator";

export class SetApartamentDTO {
  @IsString()
  street: string;

  @IsString()
  houseNumber: string;

  @IsString()
  @IsOptional()
  apartamentNumber: string;

  @IsString()
  @IsOptional()
  postcode: string;

  @IsString()
  city: string;

  @IsString()
  worker: string;
}
