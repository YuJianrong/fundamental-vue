import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

const typeMapping = {
    warning: 'Warning',
    error: 'Error',
    success: 'Success',
};
type LabelType = keyof (typeof typeMapping);
const LabelTypes = Object.keys(typeMapping) as LabelType[];

interface Props {
    type?: LabelType | null;
}

@Doc.component('Label')
@Doc.defaultSlot('Text displayed inside the label.')
export class Label extends TsxComponent<Props> {
    @Doc.prop('label type', { acceptableValues: LabelTypes, type: String, default: null })
    public type!: LabelType | null;

    public render() {
        return <span class={this.classes}>{this.$slots.default}</span>;
    }

    private get classes() {
        return {
            'fd-label': true,
            'fd-label--success': this.type === 'success',
            'fd-label--warning': this.type === 'warning',
            'fd-label--error': this.type === 'error',
        };
    }
}
