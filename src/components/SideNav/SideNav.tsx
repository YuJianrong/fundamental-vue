import { Watch } from 'vue-property-decorator';
import { SideNavItem } from './SideNavItem';
import TsxComponent from '@/vue-tsx';
import { SIDE_NAV } from './shared';
import { Doc } from '@/api';

interface Props {
  indexPath?: string | null;
}

@Doc.component('SideNav', {
  provide() {
    return {
      [SIDE_NAV]: this,
    };
  },
})
@Doc.event('select', 'Sent when a item was clicked', ['item', 'SideNavItem'])
@Doc.defaultSlot('Side Navigation-Lists/-Items displayed by the Side Navigation.')
export class SideNav extends TsxComponent<Props> {
  @Doc.model('default index path', { event: 'change', type: String, default: null })
  public indexPath!: string | null;

  public activeIndexPath: string | null = this.indexPath;

  @Watch('indexPath', { immediate: true})
  public handleNewIndexPath(newIndexPath: string | null) {
    this.activeIndexPath = newIndexPath;
  }

  public render() {
    const itemsOrLists = this.$slots.default;
    return <nav class='fd-side-nav'>{itemsOrLists}</nav>;
  }

  public didClickSideNavItem(item: SideNavItem) {
    this.activeIndexPath = item.itemId;
    this.$emit('select', item);
    this.$emit('change', this.activeIndexPath);
  }
}
