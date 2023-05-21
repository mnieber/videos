import { observer } from 'mobx-react-lite';
import { IntroSlide } from '/src/content/components/IntroSlide';
import { OverviewSlide } from '/src/content/components/OverviewSlide';
import { WelcomeSlide } from '/src/content/components/WelcomeSlide';
import { ChapterList } from '/src/dashboard/components/ChapterList';
import { DeckKeyHandler } from '/src/deck/components/DeckKeyHandler';
import { Presentation } from '/src/deck/components/Presentation';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Dashboard.scss';

export type PropsT = {
  className?: any;
};

export const Dashboard = observer((props: PropsT) => {
  return (
    <div className={cn('Dashboard', L.row.banner(), props.className)}>
      <DeckKeyHandler className={cn(L.col.banner(), 'grow')}>
        <Presentation
          className={cn(L.col.banner(), 'w-[1920px] h-[1080px]')}
          autoFocus={true}
        >
          <OverviewSlide />
          <WelcomeSlide />
          <IntroSlide />
        </Presentation>
      </DeckKeyHandler>
      <ChapterList className="bg-red-400 h-[600px] w-[200px]" />
    </div>
  );
});
