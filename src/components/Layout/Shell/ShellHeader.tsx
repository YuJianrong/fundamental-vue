import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  fixed?: boolean;
}

@Doc.component('ShellHeader')
@Doc.defaultSlot('Header Content')
export class ShellHeader extends TsxComponent<Props> {
  @Doc.prop({type: Boolean, default: false })
  public fixed!: boolean | null;

  private get classes() {
    return ['fd-shell__header'].concat(this.fixed ? ['fd-shell__header--fixed'] : []);
  }

  public render() {
    return <div class={this.classes}>{this.$slots.default}</div>;
  }
}
