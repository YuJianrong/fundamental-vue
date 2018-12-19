import { Watch } from 'vue-property-decorator';
import { ButtonContainer } from './ButtonContainer';
import { Button } from './Button';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  compact?: boolean;
  value?: number | null;
}

@Doc.component('ButtonGroup', {
  provide() {
    return {
      buttonContainer: this,
    };
  },
})
@Doc.event('input', 'triggers when index of active button changes', ['activeButtonIndex', Number])
@Doc.defaultSlot('Buttons to be displayed in a group')
export class ButtonGroup extends TsxComponent<Props> implements ButtonContainer {
  @Doc.prop('whether button group is compact', { type: Boolean, default: false })
  public compact!: boolean;

  @Doc.prop('index of active button', { type: Number, default: null })
  public value!: number | null;

  public activeButtonIndex: number | null = this.value || null;

  @Watch('value', { immediate: true })
  public handleNewValue(newValue: number | null) {
    this.activeButtonIndex = newValue;
  }
  public render() {
    return (
      <div class='fd-button-group' role='group'>
        {this.$slots.default}
      </div>
    );
  }

  // ButtonContainer Implementation
  // compact already implemented
  public didClickButton(button: Button) {
    const index = this.indexOfButton(button);
    this.activeButtonIndex = index;
    this.$emit('input', this.activeButtonIndex);
  }

  private indexOfButton(button: Button): number | null {
    const index = (this.$slots.default || []).indexOf(button.$vnode);
    return index > -1 ? index : null;
  }

  public isButtonPressed(button: Button): boolean {
    return this.indexOfButton(button) === this.activeButtonIndex;
  }
}
