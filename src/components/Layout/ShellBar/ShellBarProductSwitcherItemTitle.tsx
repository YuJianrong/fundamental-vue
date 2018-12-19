import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('ShellBarProductSwitcherItemTitle')
@Doc.defaultSlot('Product Switcher Item Title')
export class ShellBarProductSwitcherItemTitle extends TsxComponent<{}> {
  public render() {
    return (
      <span class='fd-product-switcher__product-title'>
        {this.$slots.default}
      </span>
    );
  }
}
