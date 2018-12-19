import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  flex?: boolean;
  fluid?: boolean;
}

@Doc.component('Container')
@Doc.defaultSlot('Content displaye by the container.')
export class Container extends TsxComponent<Props> {
  @Doc.prop({ type: Boolean, default: false })
  public flex!: boolean;

  @Doc.prop({ type: Boolean, default: false })
  public fluid!: boolean;

  public render() {
    const body = this.$slots.default;
    return <div class={this.classes}>{body}</div>;
  }

  private get classes() {
    return {
      'fd-container': true,
      'fd-container--flex': this.flex,
      'fd-container--fluid': this.fluid,
    };
  }
}
