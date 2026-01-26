import * as React from 'react';

export type PolymorphicComponentProps<T extends React.ElementType, P = {}> = {
  as?: T;
} & P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof P>;
