import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

@Doc.component('AppMain')
@Doc.defaultSlot('Main App Content')
export class AppMain extends TsxComponent<{}> {
  public render() {
    return <main class='fd-app__main'>{this.$slots.default}</main>;
  }
}
