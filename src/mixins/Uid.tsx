import { Vue } from 'vue-property-decorator';
import { Doc } from '@/api';

const makeId = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

@Doc.component('UidMixin')
export class UidMixin extends Vue  {
  @Doc.prop({
    type: String,
    required: false,
    default: () => makeId(),
  })
  public uid!: string;
}
