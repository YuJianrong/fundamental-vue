import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('FormGroup')
@Doc.defaultSlot('Content of the form group. Usually form items.')
export class FormGroup extends TsxComponent<{}> {
  public render() {
    return <div class='fd-form__group'>{this.$slots.default}</div>;
  }
}
