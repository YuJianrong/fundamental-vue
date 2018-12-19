import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

const positionMapping = {
  left: 'Left of icon',
  right: 'Right of icon (default)',
  center: 'Center of icon',
};

type Position = keyof (typeof positionMapping);
const Positions = Object.keys(positionMapping) as Position[];

interface Props {
  inline?: boolean;
  position?: Position;
}

@Doc.component('InlineHelp')
@Doc.defaultSlot('Helpful Text')
export class InlineHelp extends TsxComponent<Props> {
  @Doc.prop('location of inline help relative to icon', { acceptableValues: Positions, type: String, default: 'right' })
  public position!: Position;

  @Doc.prop('whether the inline help is displayed adjacent to the icon', { type: Boolean, default: false })
  public inline!: boolean;

  public render() {
    return (
    <span class='fd-inline-help'>
      <span class={this.classes}>
          {this.$slots.default}
      </span>
    </span>
    );
  }

  private get classes() {
    return {
      'fd-inline-help__content': true,
      'fd-inline-help__content--bottom-left': this.position === 'left' && this.inline === false,
      'fd-inline-help__content--bottom-right': this.position === 'right' && this.inline === false,
      'fd-inline-help__content--bottom-center': this.position === 'center' && this.inline === false,
      'fd-inline-help__content--left': this.position === 'left' && this.inline === true,
      'fd-inline-help__content--right': this.position === 'right' && this.inline === true,
    };
  }
}
