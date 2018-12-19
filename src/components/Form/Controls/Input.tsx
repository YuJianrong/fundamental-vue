import {
  Watch,
  Inject,
} from 'vue-property-decorator';
import { ItemIdentification } from './../Types/ItemIdentification';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  id?: string | null;
  placeholder?: string;
  state?: InputState | null;
  required?: boolean;
  type?: InputType;
  disabled?: boolean;
  readonly?: boolean;
  value?: string | number | null;
  compact?: boolean;
}

const typeMappings = {
  text: 'Text Field',
  password: 'Password Field',
  radio: 'Radio Button',
  checkbox: 'Checkbox',
  search: 'Search Field',
};
type InputType = keyof (typeof typeMappings);
const InputTypes = Object.keys(typeMappings) as InputType[];

const stateMapping = {
  valid: 'Valid',
  invalid: 'Invalid',
  warning: 'Warning',
};
type InputState = keyof (typeof stateMapping);
const InputStates = Object.keys(stateMapping) as InputState[];

@Doc.component('Input')
@Doc.event('input', 'Sent when the value changes', ['value', 'any'])
export class Input extends TsxComponent<Props> {
  @Doc.prop({ default: null, type: String })
  public id!: string | null;

  @Doc.prop('placeholder text', { default: '', type: String })
  public placeholder!: string;

  @Doc.prop('current state', { acceptableValues: InputStates, default: null, type: String })
  public state!: InputState | null;

  @Doc.prop('whether a value is required (adds a *)', { default: false, type: Boolean })
  public required!: boolean;

  @Doc.prop('button type', { acceptableValues: InputTypes,  default: 'text', type: String })
  public type!: InputType;

  @Doc.prop('whether the control is disabled', { default: false, type: Boolean })
  public disabled!: boolean;

  @Doc.prop('whether the control is readonly', { default: false, type: Boolean })
  public readonly!: boolean;

  @Doc.prop('current value', { default: null, type: [Boolean, String, Number] })
  public value!: boolean | string | number | null;

  @Doc.prop('whether input is compact', { type: Boolean, default: false })
  public compact!: boolean;

  @Inject({ default: null }) public itemIdentificationProvider!: ItemIdentification | null;

  private get inputId(): string | null {
    const id = this.id;
    if (id != null) { return id; }
    const provider = this.itemIdentificationProvider;
    if (provider != null) {
      return provider.itemIdentifier;
    }
    return null;
  }

  public render() {
    return (
      <input
        id={this.inputId}
        value={this.currentValue}
        on-input={this.updateInput}
        readonly={this.readonly}
        disabled={this.disabled}
        type={this.type}
        class={this.classes}
        staticClass='fd-form__control'
        placeholder={this.placeholder.length > 0 ? this.placeholder : false}
      />
    );
  }

  @Watch('value', { immediate: true })
  public handleNewValue(newValue) {
    this.currentValue = newValue;
  }

  private updateInput(event) {
    const { target } = event;
    let value: null | string = null;
    if(target != null) {
      value = target.value;
    }
    this.currentValue = value;
    this.$emit('input', this.currentValue);
    this.$emit('update:value', this.currentValue);
  }

  public currentValue: boolean | string | number | null = this.value === undefined || this.value === null ? '' : this.value;

  private get classes() {
    return {
      'fd-input--compact': this.compact,
      'is-warning': this.state === 'warning',
      'is-invalid': this.state === 'invalid',
      'is-valid': this.state === 'valid',
      'is-required': this.required,
    };
  }
}
