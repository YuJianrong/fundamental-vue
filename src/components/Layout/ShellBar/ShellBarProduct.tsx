import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

@Doc.component('ShellBarProduct')
@Doc.defaultSlot('Product Title')
export class ShellBarProduct extends TsxComponent<{}> {
  public render() {
    return (
      <div class='fd-shellbar__product'>
          {this.$slots.default}
      </div>
    );
  }
}
