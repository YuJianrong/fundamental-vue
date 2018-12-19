import { Inject } from 'vue-property-decorator';
import { ItemIdentification } from './../Types/ItemIdentification';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  id?: string | null;
  placeholder?: string;
  state?: State;
  required?: boolean;
  type?: Type;
}

const stateMapping = {
  default: 'Default State',
  valid: 'Valid State (green border)',
  invalid: 'Invalid State (red border)',
  warning: 'Warning State (orange border)',
};
type State = keyof (typeof stateMapping);
const States = Object.keys(stateMapping) as State[];

const typeMapping = {
  text: 'Text Area for Text',
  password: 'Text Area for a Password', // is that a thing?
};
type Type = keyof (typeof typeMapping);
const Types = Object.keys(typeMapping) as Type[];

@Doc.component('TextArea')
@Doc.event('input', 'Sent when the value changes', ['value', 'any'])
export class TextArea extends TsxComponent<Props> {
  @Doc.prop('id of the text area element', { default: null, type: String })
  public id!: string | null;

  @Doc.prop('placeholder displayed when no value is set', { default: '', type: String })
  public placeholder!: string;

  @Doc.prop('state of the text area', { acceptableValues: States,  default: 'default', type: String })
  public state!: State;

  @Doc.prop('whether input is required', { default: false, type: Boolean })
  public required!: boolean;

  @Doc.prop('native element type', { acceptableValues: Types, default: 'text', type: String })
  public type!: Type;

  @Inject({ default: null })
  public itemIdentificationProvider!: ItemIdentification | null;

  get inputId(): string | null {
    const id = this.id;
    if (id != null) { return id; }
    const provider = this.itemIdentificationProvider;
    if (provider != null) {
      return provider.itemIdentifier;
    }
    return null;
  }

  public render() {
    return <textarea type={this.type} class={this.classes} id={this.inputId} placeholder={this.placeholder} />;
  }

  private get classes() {
    return {
      'fd-form__control': true,
      'is-warning': this.state === 'warning',
      'is-invalid': this.state === 'invalid',
      'is-valid': this.state === 'valid',
      'is-required': this.required,
    };
  }
}
