import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  src: string;
}

@Doc.component('ShellBarProductSwitcherItemImg')
export class ShellBarProductSwitcherItemImg extends TsxComponent<Props> {
  @Doc.prop('image source', { type: String, default: '' })
  public src!: string;

  public render() {
    return (
      <span class='fd-product-switcher__product-icon'>
        <img src={this.src} alt=''/>
      </span>
    );
  }
}
