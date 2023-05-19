// Import styles
import { cn } from '/src/utils/classnames';

import './ModalContainer.scss';

export type PropsT = React.PropsWithChildren<{
  autoFocus?: boolean;
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
    <div className={cn('ModalContainer', props.className)} {...autoFocusProps}>
      {props.children}
    </div>
  );
};

export default ModalContainer;
