import { Inject } from 'vue-property-decorator';
import { MenuItem } from './MenuItem';
import { Menu } from './Menu';
import { MENU, MENU_LIST } from './types';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  header?: string | null;
}

@Doc.component('MenuList', {
  provide() {
    return {
      [MENU_LIST]: this,
    };
  },
})
@Doc.event('select', 'Sent when a menu item was selected', ['item', 'MenuItem'])
@Doc.defaultSlot('0 or more menu items.')
export class MenuList extends TsxComponent<Props> {
  @Doc.prop('text displayed in the menu list (group) header',{ type: String, default: null })
  public header!: string | null;

  @Inject({ from: MENU, default: null })
  public menu!: Menu | null;

  public render() {
    const items = this.$slots.default;
    const renderList = () => <ul class='fd-menu__list'>{items}</ul>;
    const header = this.header;
    if (header == null) {
      return renderList();
    }
    return (
      <div class='fd-menu__group'>
        <h1 class='fd-menu__title'>{header}</h1>
        {renderList()}
      </div>
    );
  }

  public menuItemDidClick(item: MenuItem) {
    this.$emit('select', item.value);
    const menu = this.menu;
    if (menu) {
      menu.menuItemDidClick(item);
    }
  }
}
