import { ExampleCollectionFunction } from '../types';

export const plugin: ExampleCollectionFunction = ({ FdImage }) => {
    return { componentStatus: 'stable', icon: 'background', relatedComponents: [FdImage] };
};
