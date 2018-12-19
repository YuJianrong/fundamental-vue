import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

@Doc.component('PresentDateMixin')
export class PresentDateMixin extends TsxComponent<{}> {
  public presentYear = new Date(Date.now()).getFullYear();
  public presentMonth = new Date(Date.now()).getMonth();
  public presentDay = new Date(Date.now()).getDate();

  public isPresent(date: Date) {
    return (
      this.presentYear === date.getFullYear() &&
      this.presentMonth === date.getMonth() &&
      this.presentDay === date.getDate()
    );
  }
}
