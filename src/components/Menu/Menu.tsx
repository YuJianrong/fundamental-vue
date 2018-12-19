import { MenuItem } from './MenuItem';
import { MENU } from './types';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  canHaveAddon?: boolean;
}

@Doc.component('Menu', {
  provide() {
    return {
      [MENU]: this,
    };
  },
})
@Doc.event('select', 'Sent when a menu item was selected', ['value', String])
@Doc.defaultSlot('0 or more menu lists.')
export class Menu extends TsxComponent<Props> {
  @Doc.prop('whether menu item can have an addon', { type: Boolean, default: false })
  public canHaveAddon!: boolean;

  public render() {
    const lists = this.$slots.default;
    return <nav class={this.classes}>{lists}</nav>;
  }

  private get classes() {
    return {
      'fd-menu': true,
      'fd-menu--addon-before': this.canHaveAddon,
    };
  }

  public menuItemDidClick(item: MenuItem) {
    this.$emit('select', item);
  }
}
