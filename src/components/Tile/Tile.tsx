import TsxComponent from '@/vue-tsx';
import { Color, Colors, backgroundColorClassName } from '@/lib';
import { Doc } from '@/api';

interface Props {
    media?: any | null;
    title?: string | null;
    description?: string | null;
    actions?: any | null;
    isButton?: boolean;
    rowSpan?: number | null;
    colSpan?: number | null;
    backgroundColor?: Color | null;
}

@Doc.component('Tile')
@Doc.slot('media', 'Tile Media')
@Doc.slot('actions', 'Tile Actions')
export class Tile extends TsxComponent<Props> {
    @Doc.prop({ type: String, default: null })
    public title!: string | null;

    @Doc.prop({ type: String, default: null })
    public description!: string | null;

    @Doc.prop('row span', { type: Number, default: null })
    public rowSpan!: number | null;

    @Doc.prop('column span', { type: Number, default: null })
    public colSpan!: number | null;

    @Doc.prop('background color', { acceptableValues: Colors, default: null, type: String })
    public backgroundColor!: Color | null;

    @Doc.prop('render tile as a button', { type: Boolean, default: false })
    public isButton!: boolean;

    @Doc.prop('disable tile', { type: Boolean, default: false })
    public disabled!: boolean;

    public render() {
        const media = this.$slots.media;
        const actions = this.$slots.actions;
        const title = this.title;
        const description = this.description;
        const isButton = this.isButton;
        const disabled = this.disabled;

        return (
            <div class={this.classObject} role={isButton ? 'button' : null} aria-disabled={disabled}>
                {media && <div class='fd-tile__media'>{media}</div>}
                <div class='fd-tile__content'>
                    {title && <h2 class='fd-tile__title'>{title}</h2>}
                    {description && <p>{description}</p>}
                </div>
                {actions && <div class='fd-tile__actions'>{actions}</div>}
            </div>
        );
    }

    get classObject() {
        const rowSpanObject = () => {
            const rowSpan = this.rowSpan;
            if (typeof rowSpan === 'number') {
                return { [`fd-has-grid-row-span-${rowSpan}`]: true };
            }
            return {};
        };

        const colSpanObject = () => {
            const colSpan = this.colSpan;
            if (typeof colSpan === 'number') {
                return { [`fd-has-grid-column-span-${colSpan}`]: true };
            }
            return {};
        };

        const backgroundColorClasses =
            this.backgroundColor == null ? {} : { [backgroundColorClassName(this.backgroundColor)]: true };

        return {
            ...rowSpanObject(),
            ...colSpanObject(),
            ...backgroundColorClasses,
            'fd-tile': true,
        };
    }
}
