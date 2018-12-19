import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';
import { CalendarAction } from './CalendarAction';

interface Props {
  month: string;
  year: number;
  hasPrevious?: () => boolean;
  hasNext?: () => boolean;
}

@Doc.component('CalendarHeader')
export class CalendarHeader extends TsxComponent<Props> {
  @Doc.prop(String) public month!: string;
  @Doc.prop(Number) public year!: number;

  @Doc.prop({ type: Function, default: () => true })
  public hasPrevious!: () => boolean;

  @Doc.prop({ type: Function, default: () => true })
  public hasNext!: () => boolean;

  public render() {
    return (
      <header class='fd-calendar__header'>
        <div class='fd-calendar__navigation'>
          <CalendarAction
            icon='slim-arrow-left'
            type={'standard'}
            disabled={!this.hasPrevious()}
            on-click={() => this.$emit('previous')}
          />
          <CalendarAction
           title={this.month}
           on-click={() => this.$emit('month')}
          />
          <CalendarAction
            title={String(this.year)}
            on-click={() => this.$emit('year')}
          />
          <CalendarAction
            type={'standard'}
            icon='slim-arrow-right'
            disabled={!this.hasNext()}
            on-click={() => this.$emit('next')}
          />
        </div>
      </header>
    );
  }
}
