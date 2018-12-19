import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  ariaLabel?: string;
}

@Doc.component('Spinner')
export class Spinner extends TsxComponent<Props> {
  @Doc.prop('ARIA label', { type: String, default: 'Loading' })
  public ariaLabel!: string;

  public render() {
    return (
      <div class='fd-spinner' aria-hidden='false' aria-label={this.ariaLabel}>
        <div />
      </div>
    );
  }
}
