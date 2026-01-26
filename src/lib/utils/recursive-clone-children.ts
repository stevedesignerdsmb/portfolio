import * as React from 'react';

export function recursiveCloneChildren(
  children: React.ReactNode,
  sharedProps: Record<string, any>,
  componentNames: string[],
  uniqueId: string,
  asChild?: boolean,
): React.ReactNode {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const childType = child.type as any;
    const displayName = childType?.displayName || childType?.name;

    if (componentNames.includes(displayName)) {
      return React.cloneElement(child, {
        ...sharedProps,
        key: `${uniqueId}-${index}`,
      } as any);
    }

    if (child.props.children) {
      return React.cloneElement(child, {
        key: `${uniqueId}-${index}`,
        children: recursiveCloneChildren(
          child.props.children,
          sharedProps,
          componentNames,
          uniqueId,
          asChild,
        ),
      } as any);
    }

    return child;
  });
}
