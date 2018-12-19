import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

@Doc.component('Token')
@Doc.event('click', 'triggers when clicked')
@Doc.defaultSlot('Token Text')
export class Token extends TsxComponent<{}> {
  public render() {
    return (
      <span
        class='fd-token'
        role='button'
        on-click={() => this.$emit('click', this)}
      >
        {this.$slots.default}
      </span>
    );
  }
}
