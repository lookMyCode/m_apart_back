import { IsNotEmpty, IsString } from "class-validator";


export class SetWorkerDTO {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  constructor(data?: SetWorkerDTO) {
    if (!data) return;

    this.login = data.login;
    this.password = data.password;
    this.name = data.name;
    this.surname = data.surname;
    this.tel = data.tel;
  }
}
