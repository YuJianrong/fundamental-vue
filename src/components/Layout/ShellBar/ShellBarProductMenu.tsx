import { Doc } from '@/api';
import { Button, ShellBarProductTitle, Popover } from '@/components';
import TsxComponent from '@/vue-tsx';

@Doc.component('ShellBarProductMenu')
@Doc.defaultSlot('Product Items (FdShellBarProductSwitcherItem)')
@Doc.slot('control', 'Popover Control (optional). Defaults to a specially configured FdButton with grid icon.')
export class ShellBarProductMenu extends TsxComponent<{}> {
  public render() {
    const title = this.$slots.title;
    const menu = this.$slots.menu;
    return (
      <div class='fd-product-menu'>
          <Popover placement='right'>
              <div slot='control'>
                <Button styling='light' class='fd-product-menu__control'>
                  <ShellBarProductTitle class='fd-product-menu__title'>{title}</ShellBarProductTitle>
                </Button>
              </div>
              {menu}
          </Popover>
      </div>
    );
  }
}
