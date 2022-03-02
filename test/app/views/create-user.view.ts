import { View, PropView } from '@nest-view/decorators/view';

@View()
export class CreateUserBodyView {
  @PropView({ type: String, required: true })
  name: string;

  @PropView({ type: String, required: true, format: 'password' })
  password: string;

  @PropView({ type: String, required: true })
  email: string;

  @PropView({ type: Date, required: true, format: 'date' })
  birthday: Date;
}

@View()
export class SuccessView {
  @PropView({ type: Boolean, default: true })
  success: boolean;

  @PropView({ type: Date })
  createdAt: Date;
}
