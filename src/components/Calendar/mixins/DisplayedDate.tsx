import TsxComponent from '@/vue-tsx';
import { monthFromDate, Month } from './../util';
import { Doc } from '@/api';

const defaultDayNames = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'];
const defaultMonthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

interface Props {
  firstDayOfWeek?: number;
  dayNames?: string[];
  monthNames?: string[];
}

@Doc.component('DisplayedDateMixin')
export class DisplayedDateMixin extends TsxComponent<Props> {
  @Doc.prop('date displayed when calendar is shown and no other date has been selected.', { type: [Date, String, Number], default: Date.now() })
  public defaultValue!: Date | string | number;

  public get defaultDate(): Date {
    const value = this.defaultValue;
    if(typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    return value;
  }

  @Doc.prop('first Day of Week', { type: Number, default:0 })
  public firstDayOfWeek!: number;

  @Doc.prop('day names', { type: Array, default: () => defaultDayNames })
  public dayNames!: string[];

  @Doc.prop('month names', { type: Array, default: () => defaultMonthNames })
  public monthNames!: string[];

  public get adjustedDayNames(): string[] {
    return this.dayNames.concat(this.dayNames).slice(this.firstDayOfWeek, this.firstDayOfWeek + 7);
  }

  public get displayedMonth(): number {
    const date = this.displayedDate;
    return date.getMonth();
  }

  public set displayedMonth(month: number) {
    const copy = new Date(this.displayedDate);
    copy.setMonth(month);
    this.displayedDate = copy;
  }

  public displayedDate = this.defaultDate;
  public get month(): Month {
    const date = this.displayedDate;
    return monthFromDate(date, { firstDayOfWeek: this.firstDayOfWeek });
  }

  public get displayedYear() { return this.displayedDate.getFullYear(); }
  public set displayedYear(year: number) {
    const copy = new Date(this.displayedDate);
    copy.setFullYear(year);
    this.displayedDate = copy;
  }
}
