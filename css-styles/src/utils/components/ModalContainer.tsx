// Import styles
import { cn } from '/src/utils/classnames';

import './ModalContainer.scss';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ModalContainer = (props: PropsT) => {
  return (
    <div className={cn('ModalContainer', props.className)}>
      {props.children}
    </div>
  );
};

export default ModalContainer;
