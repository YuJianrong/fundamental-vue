import Vue from 'vue';
import { Doc } from '@/api';

@Doc.component('Breadcrumb')
@Doc.defaultSlot('Breadcrumb Items')
export class Breadcrumb extends Vue {
  public render() {
    return <ul class='fd-breadcrumb'>{this.$slots.default}</ul>;
  }
}
