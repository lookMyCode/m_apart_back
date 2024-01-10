import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


enum Role {
  manager = 'manager',
  worker = 'worker',
}


@Schema()
export class User {
  @Prop({required: true})
  login: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  surname: string;

  @Prop()
  tel: string;

  @Prop({type: String, enum: Role, default: Role.worker})
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
