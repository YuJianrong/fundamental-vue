import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

@Doc.component('ShellBarSubtitle')
@Doc.defaultSlot('Subtitle')
export class ShellBarSubtitle extends TsxComponent<{}> {
  public render() {
    return (
      <span class='fd-shellbar__subtitle'>
        {this.$slots.default}
      </span>
    );
  }
}
