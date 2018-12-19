import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

@Doc.component('ShellBarProductTitle')
@Doc.defaultSlot('Product Title')
export class ShellBarProductTitle extends TsxComponent<{}> {
  public render() {
    return (
      <span class='fd-shellbar__title'>
        {this.$slots.default}
      </span>
    );
  }
}
