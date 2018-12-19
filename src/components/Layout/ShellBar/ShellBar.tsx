import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

@Doc.component('ShellBar')
@Doc.defaultSlot('Main Shell Bar Content')
export class ShellBar extends TsxComponent<{}> {
  public render() {
    return <div class='fd-shellbar'>{this.$slots.default}</div>;
  }
}
