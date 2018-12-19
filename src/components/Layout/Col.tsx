import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  span?: number | null;
}

@Doc.component('Col')
@Doc.defaultSlot('Column content')
export class Col extends TsxComponent<Props> {
  @Doc.prop({ type: Number, default: null })
  public span!: number | null;

  public render() {
    const content = this.$slots.default;
    return <div class={this.classes}>{content}</div>;
  }

  private get classes() {
    const colClass = 'fd-col';
    const span = this.span;
    if (span != null) {
      return [colClass, `fd-col--${span}`];
    }
    return [colClass];
  }
}
