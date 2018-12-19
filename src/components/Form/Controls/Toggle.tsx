import {
  Inject,
  Watch,
} from 'vue-property-decorator';
import { ItemIdentification } from './../Types/ItemIdentification';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  id?: string | null;
  size?: ToggleSize | null;
  label?: string | null;
  on?: boolean;
}

const sizeMapping = {
  xs: 'Extra Small',
  s: 'Small',
  l: 'Large',
};
type ToggleSize = keyof (typeof sizeMapping);
const ToggleSizes = Object.keys(sizeMapping) as ToggleSize[];

@Doc.component('Toggle')
export class Toggle extends TsxComponent<Props> {
  @Doc.prop({ default: null, type: String })
  public id!: string | null;

  @Doc.prop('size class', { acceptableValues: ToggleSizes,  type: String, default: null })
  public size!: ToggleSize | null;

  @Doc.prop({ type: String, default: null })
  public label!: string | null;

  @Doc.prop('whether toggle is disabled', { type: Boolean, default: false })
  public disabled!: boolean;

  @Doc.model('whether toggle is checked', { event: 'input', default: false, type: Boolean })
  public on!: boolean;

  private currentOn = this.on;

  @Inject({ default: null })
  public itemIdentificationProvider!: ItemIdentification | null;

  private get inputId(): string | null {
    const id = this.id;
    if (id != null) { return id; }
    const provider = this.itemIdentificationProvider;
    if (provider != null) {
      return provider.itemIdentifier;
    }
    return null;
  }

  @Watch('on', { immediate: true})
  public onChanged(value) {
    this.currentOn = value;
  }

  private onChange(event) {
    const checked = event.target.checked;
    this.currentOn = checked;
    this.$emit('input', this.currentOn);
  }

  private get classes() {
    return {
      'fd-toggle': true,
      'fd-toggle--s': this.size === 's',
      'fd-toggle--xs': this.size === 'xs',
      'fd-toggle--l': this.size === 'l',
      'fd-form__control': true,
    };
  }

  public render() {
    const disabled = this.disabled ? true : null;
    return (
      <div class='fd-form__item fd-form__item--check'>
        <label class='fd-form__label' for={this.inputId}>
          <span class={this.classes}>
            <input
              type='checkbox'
              on-change={this.onChange}
              disabled={disabled}
              id={this.inputId}
              checked={this.currentOn}
            />
            <span class='fd-toggle__switch' role='presentation' />
          </span>
          {this.label}
        </label>
      </div>
    );
  }
}
