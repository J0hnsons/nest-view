import { View, PropView } from '@nest-view/decorators/view';

@View()
export class UserView {
  @PropView({ type: String })
  name: string;

  @PropView({ type: String })
  email: string;

  @PropView({ type: Date, path: 'extras.birthday' })
  birthday: Date;
}
