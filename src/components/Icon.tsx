import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

const sizeMapping = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra Large',
};
type IconSize = keyof (typeof sizeMapping);
export const IconSizes = Object.keys(sizeMapping) as IconSize[];

interface Props {
  name?: string;
  size?: IconSize | null;
}

@Doc.component('Icon')
export class Icon extends TsxComponent<Props> {
  @Doc.prop('icon name', { type: String, required: true })
  public name!: string;

  @Doc.prop('icon size', { acceptableValues: IconSizes, type: String, default: null })
  public size!: IconSize | null;

  public render() {
    return <span class={this.classes} />;
  }

  private get classes() {
    return {
      [`sap-icon--${this.name}`]: true,
      // Sizes
      'sap-icon--s': this.size === 's',
      'sap-icon--m': this.size === 'm',
      'sap-icon--l': this.size === 'l',
      'sap-icon--xl': this.size === 'xl',
    };
  }
}
