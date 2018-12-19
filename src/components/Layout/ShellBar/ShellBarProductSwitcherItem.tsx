import TsxComponent from '@/vue-tsx';
import { Location } from 'vue-router';
import { ShellBarProductSwitcherItemTitle, ShellBarProductSwitcherItemImg } from '@/components';
import { Doc } from '@/api';

interface Props {
  src: string;
  to?: string | Location;
  href: string;
  title: string;
}

@Doc.component('ShellBarProductSwitcherItem')
@Doc.defaultSlot('Product Switcher Item Title')
export class ShellBarProductSwitcherItem extends TsxComponent<Props> {
  @Doc.prop('image source', {type: String, required: false, default: ''})
  public src!: string;

  @Doc.prop({type: String, required: false, default: ''})
  public title!: string;

  @Doc.prop('router link destination', {type: [String, Object], required: false, default: ''})
  public to!: string | Location;

  @Doc.prop('external link destination', {type: [String, Object], required: false, default: ''})
  public href!: string;

  public render() {
    const content = this.$slots.default;
    const title = (
      <ShellBarProductSwitcherItemTitle>{this.title}</ShellBarProductSwitcherItemTitle>
    );
    const img = (
      <ShellBarProductSwitcherItemImg src={this.src}/>
    );
    const template = (
      [
        img,
        title,
      ]
    );
    return (
      <li>
      {content}
      {!content && (
        (!this.href && !this.to) ? template :
        this.to ? <a href={this.href}>{template}</a> : <router-link to={this.to}>{template}</router-link>
      )}
      </li>
    );
  }
}
