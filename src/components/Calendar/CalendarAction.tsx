import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';
import { Button, ButtonType } from '@/components/Button';

interface Props {
  title?: string;
  icon?: string;
  type?: ButtonType;
  disabled?: boolean;
}

@Doc.component('CalendarAction')
export class CalendarAction extends TsxComponent<Props> {
  @Doc.prop(String) public title!: string | null;
  @Doc.prop(String) public icon!: string | null;
  @Doc.prop({type: Boolean, default: false}) public disabled!: boolean;
  @Doc.prop({type: String, default: null}) public type!: ButtonType | null;

  public render() {
    return (
      <div class='fd-calendar__action'>
        <Button
          state={this.disabled ? 'disabled' : 'normal'}
          icon={this.icon}
          compact={true}
          styling='light'
          type={this.type || undefined}
          on-click={() => this.$emit('click')}
        >
          {this.title}
        </Button>
      </div>
    );
  }
}
