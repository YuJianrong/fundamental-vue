import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

const positionMapping = {
  start: 'start',
  middle: 'middle',
  end: 'end',
};
type Position = keyof typeof positionMapping;
const Positions = Object.keys(positionMapping) as Position[];

interface Props {
  position?: Position;
}

@Doc.component('ShellBarGroup')
@Doc.defaultSlot('Main Group Content')
export class ShellBarGroup extends TsxComponent<Props> {
  @Doc.prop('position in the shell bar', { acceptableValues: Positions, type: String, validator: value => Positions.includes(value) })
  public position!: Position;

  public render() {
    const classes = `fd-shellbar__group fd-shellbar__group--${this.position}`;
    return <div class={classes}>{this.$slots.default}</div>;
  }
}
