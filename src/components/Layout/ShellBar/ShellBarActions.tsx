import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('ShellBarActions')
@Doc.defaultSlot('Shell Bar Action Instances')
export class ShellBarActions extends TsxComponent<{}> {
  public render() {
    return <div class='fd-shellbar__actions'>{this.$slots.default}</div>;
  }
}
