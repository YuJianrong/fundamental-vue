import { ItemIdentification } from './Types/ItemIdentification';
import { UidMixin } from '@/mixins';
import { mixins } from 'vue-class-component';
import { Doc } from '@/api';

interface Props {
  label?: string;
  check?: boolean;
  inline?: boolean;
  uid?: string; // Uid mixin
}

@Doc.component('FormItem', {
  provide() {
    return {
      itemIdentificationProvider: this,
    };
  },
})
@Doc.defaultSlot('Content of the form item. Usually inputs and labels.')
export class FormItem extends mixins(UidMixin) implements ItemIdentification {
  @Doc.prop({ type: String, default: null })
  public label!: string;

  @Doc.prop({ type: Boolean, default: false })
  public check!: boolean;

  @Doc.prop({ type: Boolean, default: false })
  public inline!: boolean;

  public $tsxProps!: Readonly<{}> & Readonly<Props>;

  public render() {
    return <div class={this.classes}>{this.$slots.default}</div>;
  }

  private get classes() {
    return {
      'fd-form__item': true,
      'fd-form__item--inline': this.inline,
      'fd-form__item--check': this.check,
    };
  }

  // ItemIdentification Impl.
  get itemIdentifier(): string | null {
    return this.uid;
  }
}
