import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
    url?: string | null;
    title?: string | null;
    isButton?: boolean;
}

@Doc.component('ProductTile')
@Doc.slot('content', 'Product Content')
export class ProductTile extends TsxComponent<Props> {
    @Doc.prop('image url', { type: String, default: null, required: true })
    public url!: string | null;

    @Doc.prop({ type: String, default: null })
    public title!: string | null;

    @Doc.prop('render product tile as a button', { type: Boolean, default: false })
    public isButton!: boolean;

    @Doc.prop('disable product tile', { type: Boolean, default: false })
    public disabled!: boolean;

    private get style() {
        const url = this.url;
        if (url == null) {
            return {};
        }
        return {
            'background-image': `url(${this.url})`,
        };
    }

    public render() {
        const content = this.$slots.content;
        const title = this.title;
        const isButton = this.isButton;
        const disabled = this.disabled;

        return (
            <div class='fd-product-tile' role={isButton ? 'button' : null} aria-disabled={disabled}>
                <div class='fd-product-tile__media' style={this.style} />
                <div class='fd-product-tile__content'>
                    {title && <h2 class='fd-product-tile__title'>{title}</h2>}
                    {content}
                </div>
            </div>
        );
    }
}
