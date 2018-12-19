import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

interface Props {
  headerClass?: string;
}

@Doc.component('App')
@Doc.defaultSlot('Main Content')
@Doc.slot('header', 'Header Content')
@Doc.slot('footer', 'Footer Content')
export class App extends TsxComponent<Props> {
  @Doc.prop('header CSS class', { type: String, default: null })
  public headerClass!: string | null;

  public render() {
    const header = this.$slots.header;
    const footer = this.$slots.footer;
    const main = this.$slots.default;
    return (
      <div class='fd-shell__app'>
        {header}
          <div class='fd-app'>{main}</div>
        {footer}
      </div>
    );
  }
}
