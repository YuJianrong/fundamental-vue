import { Watch } from 'vue-property-decorator';
import { TabItemContainer } from './TabItemContainer';
import { TabItem } from './TabItem';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  value?: string | null;
}

@Doc.component('Tabs', {
  provide() {
    return { tabItemContainer: this };
  },
})
@Doc.event('input', 'triggers when the active tab item name changes', ['tabItemName', String])
@Doc.defaultSlot('Tab Items')
export class Tabs extends TsxComponent<Props> implements TabItemContainer {
  @Doc.prop('active tab item name', { type: String, default: null })
  public value!: string | null;

  @Watch('value', { immediate: true })
  public handleNewValue(newValue) {
    this.activeName = newValue;
  }
  private tabItems: TabItem[] = [];

  public render() {
    const tabItems = this.tabItems;
    return (
      <div>
        <ul class='fd-tabs' role='tablist'>
          {tabItems.map(tabItem => (
            <li class='fd-tabs__item'>
              <a
                class='fd-tabs__link'
                aria-controls={tabItem.uid}
                aria-selected={tabItem.active}
                aria-disabled={tabItem.disabled}
                role='tab'
                on-click={() => this.tabItemClicked(tabItem)}
              >
                {tabItem.label}
              </a>
            </li>))}
        </ul>
        {this.$slots.default}
      </div>
    );
  }

  private tabItemClicked(item: TabItem) {
    // Ignore disabled items
    if (item.disabled) {
      return;
    }
    this.activeName = item.name;
    this.$emit('input', item.name);
  }

  // TabItemContainer Implementation
  public activeName: string | null = this.value || null;

  public addTabItem(item: TabItem) {
    const index = (this.$slots.default || []).indexOf(item.$vnode);
    this.tabItems.splice(index, 0, item);
  }

  public removeTabItem(item: TabItem) {
    const tabItems = this.tabItems;
    const index = tabItems.indexOf(item);
    if (index > -1) {
      tabItems.splice(index, 1);
    }
  }
}
