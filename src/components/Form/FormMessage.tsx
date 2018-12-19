import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  type?: MessageType | null;
}

const typeMapping = {
  error: 'error',
  warning: 'warning',
  help: 'help',
};
type MessageType = keyof (typeof typeMapping);
const MessageTypes = Object.keys(typeMapping) as MessageType[];

@Doc.component('FormMessage')
@Doc.defaultSlot('Message to be displayed (usually just text).')
export class FormMessage extends TsxComponent<Props> {
  @Doc.prop({ acceptableValues: MessageTypes, default: null, type: String })
  public type!: MessageType | null;

  public render() {
    const message = this.$slots.default;
    return <span class={this.classes}>{message}</span>;
  }

  private get classes() {
    return {
      'fd-form__message': true,
      'fd-form__message--error': this.type === 'error',
      'fd-form__message--warning': this.type === 'warning',
      'fd-form__message--help': this.type === 'help',
    };
  }
}
