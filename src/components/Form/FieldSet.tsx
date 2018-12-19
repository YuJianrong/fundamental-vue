import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('FieldSet')
@Doc.defaultSlot('Content of the field set. Usually a legend with a form group.')
export class FieldSet extends TsxComponent<{}> {
  public render() {
    return <fieldset class='fd-form__set'>{this.$slots.default}</fieldset>;
  }
}
