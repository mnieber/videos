import { observer } from 'mobx-react-lite';
import { cn } from '/src/utils/classnames';

// Import styles
import './ChapterList.scss';

export type PropsT = {
  className?: any;
};

export const ChapterList = observer((props: PropsT) => {
  return <div className={cn('ChapterList', props.className)}></div>;
});
