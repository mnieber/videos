import { observer } from 'mobx-react-lite';
import { InlineStylesSlide } from '/src/content/components/InlineStylesSlide';
import { OverviewSlide } from '/src/content/components/OverviewSlide';
import { ScssSlide } from '/src/content/components/ScssSlide';
import { ChapterList } from '/src/dashboard/components/ChapterList';
import { MouseCoordsPanel } from '/src/dashboard/components/MouseCoordsPanel';
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
          <ScssSlide />
          <InlineStylesSlide />
        </Presentation>
      </DeckKeyHandler>
      <div className={cn(L.col.banner())}>
        <MouseCoordsPanel className="ml-4" />
        <ChapterList className="bg-red-400 h-[600px] w-[200px]" />
      </div>
    </div>
  );
});
