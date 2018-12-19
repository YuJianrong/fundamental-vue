import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('Shell')
@Doc.defaultSlot('Main Content')
export class Shell extends TsxComponent<{}> {
  public render() {
    return <div class='fd-shell fd-shell--fixed fd-shell--fundamentals'>{this.$slots.default}</div>;
  }
}
