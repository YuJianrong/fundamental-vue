const prefix = 'Fd';
const hasPrefix = (name: string) => name.startsWith(prefix);
export const assertHasPrefix = (name: string) => {
  if(hasPrefix(name)) { return; }
  throw Error(`'${name}' has not the default component prefix ('${prefix}'). Please create an issue.`);
};
