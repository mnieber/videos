// Import styles
import { cn } from '/src/utils/classnames';

import './ModalContainer.scss';

export type PropsT = React.PropsWithChildren<{
  autoFocus?: boolean;
  onMouseMove?: (e: React.MouseEvent) => void;
  className?: any;
}>;

const ModalContainer = (props: PropsT) => {
  const autoFocusProps = props.autoFocus
    ? {
        tabIndex: 0,
        ref: (el: any) => el?.focus(),
      }
    : {};

  return (
    <div
      className={cn('ModalContainer', props.className)}
      {...autoFocusProps}
      onMouseMove={props.onMouseMove}
    >
      {props.children}
    </div>
  );
};

export default ModalContainer;
