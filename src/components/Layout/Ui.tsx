import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

interface Props {
  headerClass?: string;
}

@Doc.component('Ui')
@Doc.defaultSlot('Main Content')
@Doc.slot('sidebar', 'Sidebar Content')
@Doc.slot('header', 'Header Content')
@Doc.slot('footer', 'Footer Content')
export class Ui extends TsxComponent<Props> {
  @Doc.prop('header class', {type: String, default: null })
  public headerClass!: string | null;

  public render() {
    const sidebar = this.$slots.sidebar;
    const header = this.$slots.header;
    const footer = this.$slots.footer;
    const main = this.$slots.default;
    const headerClasses = ['fd-ui__header'];
    const headerClass = this.headerClass;
    if(headerClass != null) { headerClasses.push(headerClass); }
    return (
      <div class='fd-ui fd-ui--fundamental'>
        {!!header && <div class={headerClasses}>{header}</div>}
        <div class='fd-ui__app'>
          <div class='fd-app'>
          {!!sidebar && <div class='fd-app__sidebar'>{sidebar}</div>}
            <main class='fd-app__main' style='padding-top: 20px; background-color: white;'>{main}</main>
          </div>
        </div>
        {!!footer && <div class='fd-ui__footer'>{footer}</div>}
      </div>
    );
  }
}
