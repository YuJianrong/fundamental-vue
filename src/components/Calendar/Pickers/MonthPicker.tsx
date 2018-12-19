import TsxComponent from '@/vue-tsx';
import { CalendarItem } from './../CalendarItem';
import { Doc } from '@/api';

interface Props {
  monthNames: string[];
  presentMonth?: number;
  selectionContainsMonth?: (month: number) => boolean;
}

@Doc.component('MonthPicker')
export class MonthPicker extends TsxComponent<Props> {
  @Doc.prop('monthNames', Array)
  public monthNames!: string[];

  @Doc.prop('presentMonth', { type: Number, default: 0 })
  public presentMonth!: number;

  @Doc.prop('selectionContainsMonth', { type: Function, default: () => false })
  public selectionContainsMonth!: (month: number) => boolean;

  public render() {
    return (
      <div class='fd-calendar__months' aria-hidden={false}>
        <ul class='fd-calendar__list'>
          {this.monthNames.map((month, index) => (
          <CalendarItem
            tag='li'
            text={month}
            state={this.selectionContainsMonth(index) ? 'selected' : null}
            modifier={this.presentMonth === index ? 'current' : null}
            on-click={() => this.$emit('select', index)}
          />))}
        </ul>
      </div>
    );
  }
}
