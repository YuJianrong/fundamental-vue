import { Doc } from '@/api';
import TsxComponent from '@/vue-tsx';

export interface Props {
  itemsPerPage?: number;
  itemsTotal: number;
  initialPage?: number;
  displayTotal: boolean;
  totalText: string;
}

@Doc.component('Pagination')
@Doc.event('click', 'Sent when button is clicked')
@Doc.defaultSlot('pagination content (usually just total number of items and page numbers)')
export class Pagination extends TsxComponent<Props> {
  @Doc.prop('items per page', { type: Number, default: 10 })
  public itemsPerPage!: number;

  @Doc.prop('total number of items', { type: Number, required: true })
  public itemsTotal!: number;

  @Doc.prop('initial page', { type: Number, default: 1 })
  public initialPage!: number;

  @Doc.prop('whether to dispaly total', { type: Boolean, default: true })
  public displayTotal!: boolean;

  @Doc.prop('total text', { type: String, default: '' })
  public totalText!: string;

  private numberOfPages = Math.ceil(
    this.itemsTotal / (this.itemsPerPage ? this.itemsPerPage : 10),
  );

  private selectedPage: number = this.initialPage ? this.initialPage : 1;

  private createPaginationLinks(numberOfPages: number) {
    // create an array with number of pages and fill it with links
    const aPages = Array(numberOfPages)
      .fill(0)
      .map((link, index) => (
        <a
          key={index}
          href='#'
          class='fd-pagination__link'
          aria-selected={this.selectedPage === index + 1}
          onClick={(event: Event) => this.pageClicked(event)}
        >
          {index + 1}
        </a>
      ));
    return aPages;
  }

  private pageClicked(event: Event) {
    const element = event.target as HTMLAnchorElement;
    this.selectedPage = element && +element.text || 1;
    this.$emit('page-change', this.selectedPage);
  }

  private navigateForward() {
    if (this.selectedPage === this.numberOfPages) {
      return;
    }
    ++this.selectedPage;
    this.$emit('page-change', this.selectedPage);
  }

  private navigateBack() {
    if (this.selectedPage === 1) {
      return;
    }
    --this.selectedPage;
    this.$emit('page-change', this.selectedPage);
  }

  public render() {
    return (
      <div class='fd-pagination'>
      {this.displayTotal ? (
        <span class='fd-pagination__total'>
          {this.itemsTotal} {this.totalText || 'items'}
        </span>
      ) : (
        ''
      )}
        <nav class='fd-pagination__nav'>
          <a
            href='#'
            class='fd-pagination__link fd-pagination__link--previous'
            aria-label='Previous'
            aria-disabled={this.selectedPage === 1}
            on-click={this.navigateBack}
          />
          {this.createPaginationLinks(this.numberOfPages)}
          <a
            href='#'
            class='fd-pagination__link fd-pagination__link--next'
            aria-label='Next'
            aria-disabled={this.selectedPage === this.numberOfPages}
            onClick={this.navigateForward}
          />
        </nav>
      </div>
    );
  }
}
