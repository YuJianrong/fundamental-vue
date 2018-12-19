import Vue from 'vue';
import { Doc } from '@/api';

@Doc.component('ListGroup')
@Doc.defaultSlot('List of list group items.')
export class ListGroup extends Vue {
  public render() {
    return (<ul class='fd-list-group'>{this.$slots.default}</ul>);
  }
}
