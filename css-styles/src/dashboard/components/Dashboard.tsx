import { observer } from 'mobx-react-lite';
import { IntroSlide } from '/src/content/components/IntroSlide';
import { WelcomeSlide } from '/src/content/components/WelcomeSlide';
import { cn } from '/src/utils/classnames';

// Import styles
import './Dashboard.scss';

export type PropsT = {
  className?: any;
};

export const Dashboard = observer((props: PropsT) => {
  return (
    <div
      className={cn('Dashboard', 'grow', props.className)}
      ref={(el) => el?.focus()}
      tabIndex={1}
    >
      <WelcomeSlide />
      <IntroSlide />
    </div>
  );
});
