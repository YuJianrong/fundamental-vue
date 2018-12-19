import TsxComponent from '@/vue-tsx';
import { Location } from 'vue-router';
import { Doc } from '@/api';

interface Props {
  src: string;
  srcset?: string;
  to?: string | Location;
}

@Doc.component('ShellBarLogo')
export class ShellBarLogo extends TsxComponent<Props> {
  @Doc.prop('image source', {type: String, required: true })
  public src!: string;

  @Doc.prop('image source set', {
    type: String,
    default: null,
  })
  public srcset!: string | null;

  @Doc.prop('link destination', {
    type: [String, Object],
    default: '/',
  })
  public to!: string | Location;

  public render() {
    return (
      <router-link tag='a' to={this.to} class='fd-shellbar__logo'>
        <img src={this.src} srcset={this.srcset}/>
      </router-link>
    );
  }
}
