import Vue from 'vue';
import { Doc } from '@/api';

@Doc.component('ListGroupItem')
@Doc.defaultSlot('Content displayed by the item. Usually text.')
@Doc.slot('action', 'Custom actions (displayed on the right side, usually a button)')
export class ListGroupItem extends Vue {
  public render() {
    const action = this.$slots.action;
    return (
      <li class='fd-list-group__item'>
        {this.$slots.default}
        {!!action && <span class='fd-list-group__action'>{action}</span>}
      </li>
    );
  }
}
