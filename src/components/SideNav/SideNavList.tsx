import { Inject } from 'vue-property-decorator';
import { SideNavItem } from './SideNavItem';
import { SideNav } from './SideNav';
import TsxComponent from '@/vue-tsx';
import { SIDE_NAV } from './shared';
import { Doc } from '@/api';

interface Props {
  value?: string | null;
  header?: string | null;
}

@Doc.component('SideNavList')
@Doc.event('select', 'Sent when a item was clicked', ['item', 'Item'])
@Doc.event('input', 'Sent when a item was clicked', ['itemId', String])
@Doc.defaultSlot('Side Navigation Items or Side Navigation Submenus.')
export class SideNavList extends TsxComponent<Props> {
  @Doc.prop('value of the selected item', { type: String, default: null })
  public value!: string | null;

  public get activeItemId(): string | null {
    const nav = this.sideNav;
    if(nav != null) {
      return nav.activeIndexPath;
    }
    return this.localActiveItemId;
  }
  private localActiveItemId: string | null = this.value;

  @Doc.prop('text displayed in the side nav list (group) header', { type: String, default: null })
  public header!: string | null;

  @Inject({ from: SIDE_NAV, default: null })
  private sideNav!: SideNav | null;

  public render() {
    const itemsOrSubmenus = this.$slots.default;
    const renderList = () => {
      return <ul class='fd-side-nav__list'>{itemsOrSubmenus}</ul>;
    };
    const header = this.header;
    if (header == null) {
      return renderList();
    }

    return (
      <div class='fd-side-nav__group'>
        <h1 class='fd-side-nav__title'>{header}</h1>
        {renderList()}
      </div>
    );
  }

  public didClickSideNavItem(item: SideNavItem) {
    this.$emit('select', item);
    this.$emit('input', item.itemId);
    this.localActiveItemId = item.itemId;
    const nav = this.sideNav;
    if (nav != null) { nav.didClickSideNavItem(item); }
  }
}
