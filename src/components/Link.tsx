import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  selected?: boolean;
  disabled?: boolean;
}

@Doc.component('Link')
@Doc.event('click', 'Sent when link was clicked')
@Doc.defaultSlot('Link Title')
export class Link extends TsxComponent<Props> {
  @Doc.prop('whether link is selected', { type: Boolean, default: false })
  public selected!: boolean;

  @Doc.prop('whether link is disabled', { type: Boolean, default: false })
  public disabled!: boolean;

  public render() {
    const attributes = {
      attrs: this.$attrs,
      on: this.$listeners,
    };
    return (
      <a
        class={this.classes}
        {...attributes}
      >
        {this.$slots.default}
      </a>
    );
  }

  private get classes() {
    return {
      'fd-link': true,
      'is-selected': this.selected,
      'is-disabled': this.disabled,
    };
  }
}
