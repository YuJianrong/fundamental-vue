import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  title?: string | null;
}

@Doc.component('Section')
@Doc.defaultSlot('Section Body')
@Doc.slot('title', 'Custom Title')
export class Section extends TsxComponent<Props> {
  @Doc.prop({ type: String, default: null })
  public title!: string | null;

  public render() {
    const body = this.$slots.default;
    const titleSlot = this.$slots.title;
    const title = this.title;

    const renderHeaderWithTitle = () => {
      const hasTitle = title != null;
      const hasTitleSlot = !!titleSlot;
      if (!hasTitle && !hasTitleSlot) {
        return null;
      }
      return (
        <div class='fd-section__header'>
          {titleSlot}
          {hasTitle && <h1 class='fd-section__title'>{title}</h1>}
        </div>
      );
    };

    return (
      <section class={this.classes}>
        {renderHeaderWithTitle()}
        {body}
      </section>
    );
  }

  private get classes() { return ['fd-section']; }
}
