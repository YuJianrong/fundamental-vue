import VueTsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('FormSet')
@Doc.defaultSlot('Content of the form set (usually form items).')
export class FormSet extends VueTsxComponent<{}> {
  public render() {
    const items = this.$slots.default;
    return <div class='fd-form__set'>{items}</div>;
  }
}
