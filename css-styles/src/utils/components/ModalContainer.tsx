// Import styles
import { cn } from '/src/utils/classnames';

import './ModalContainer.scss';

export type PropsT = React.PropsWithChildren<{
  //
  className?: any;
}>;

const ModalContainer = (props: PropsT) => {
  return (
    <div
      ref={(el: any) => el?.focus()}
      className={cn('ModalContainer', props.className)}
      tabIndex={1}
    >
      {props.children}
    </div>
  );
};

export default ModalContainer;
