import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

interface Props {
  to?: object | null;
}

@Doc.component('BreadcrumbItem')
@Doc.event('click', 'Sent when item was clicked', ['item', 'BreadcrumbItem'])
@Doc.defaultSlot('Breadcrumb Item Title')
export class BreadcrumbItem extends TsxComponent<Props> {
  @Doc.prop('target route (passed to $router.to(…))', { type: Object, default: null })
  public to!: object | null;

  private onClick(event: MouseEvent) {
    event.preventDefault();
    const to = this.to;
    const router = this.$router;
    if (to != null && router != null) {
      router.push(to);
    }
    this.$emit('click', this);
  }

  public render() {
    const title = this.$slots.default;
    return (
      <li class='fd-breadcrumb__item'>
        <a class='fd-breadcrumb__link' href='#' on-click={event => this.onClick(event)}>{title}</a>
      </li>
    );
  }
}
