import { NArgument } from '../types/argument';

export const createSelector = (...args: NArgument.TArgument[]) => <TData>(
  data: TData
) =>
  data
    ? args.reduce((acc, key) => {
        if (typeof key === 'string' || typeof key === 'number') {
          return (acc as any)[key];
        }

        if (typeof key === 'function') {
          return key(acc);
        }

        return undefined;
      }, data)
    : undefined;