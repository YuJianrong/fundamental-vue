import { Component } from 'vue-property-decorator';
import Vue, { ComponentOptions } from 'vue';

type Diff<T, U> = T extends U ? never : T;
type OptionsWithoutName<V extends Vue> = Diff<ComponentOptions<V>, { componentName: string; name: string}>;

export const Fundamental = () => {};

Fundamental.component = <V extends Vue>(name: string, options: OptionsWithoutName<V> = { componentName: name}) => {
  const prefixedName = `Fd${name}`;
  return Component({ ...options, name: prefixedName, componentName: prefixedName });
};

export * from './component-name';
