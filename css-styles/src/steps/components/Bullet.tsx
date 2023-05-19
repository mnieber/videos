import { observer } from 'mobx-react-lite';
import React from 'react';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{
  isPreviewed?: boolean;
  className?: any;
}>;

export const Bullet = observer((props: PropsT) => {
  return (
    <div
      className={cn(
        'Bullet',
        props.className,
        props.isPreviewed && 'text-blue-300'
      )}
    >
      {props.children}
    </div>
  );
});
