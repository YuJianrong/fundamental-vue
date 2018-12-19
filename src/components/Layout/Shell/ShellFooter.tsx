import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  fixed?: boolean;
}

@Doc.component('ShellFooter')
@Doc.defaultSlot('Footer Content')
export class ShellFooter extends TsxComponent<Props> {
  @Doc.prop({ type: Boolean, default: false })
  public fixed!: boolean | null;

  private get classes() {
    return ['fd-shell__footer'].concat(this.fixed ? ['fd-shell__footer--fixed'] : []);
  }

  public render() {
    return <div class={this.classes}>{this.$slots.default}</div>;
  }
}
