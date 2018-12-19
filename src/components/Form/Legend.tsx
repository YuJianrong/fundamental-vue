import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('Legend')
@Doc.defaultSlot('Legend text')
export class Legend extends TsxComponent<{}> {
  public render() {
    return <legend class='fd-form__legend'>{this.$slots.default}</legend>;
  }
}
