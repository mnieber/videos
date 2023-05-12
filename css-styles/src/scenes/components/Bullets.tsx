import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { Step } from '/src/scenes/components/Step';
import { useSteps } from '/src/scenes/hooks/useSteps';
import { useScript } from '/src/script/hooks/useScript';
import { ignore } from '/src/utils/ignore';

type BulletPointT = string;
type NestedBulletsT = Array<BulletPointT | NestedBulletsT>;
type FlattenedBulletT = [BulletPointT, number]; // Tuple of bullet point and nesting level

export type ContentT = {
  bullets: NestedBulletsT[];
  audio?: string;
};

export type PropsT = {
  id: string;
  content: ContentT[];
};

const DefaultProps = {};

export const Bullets = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const steps = useSteps('App');

    const script = useScript();
    const scene = script.rootScene;

    const divs = props.content.map((content, i) => {
      const flatBulletPoints = _flattenBullets(content.bullets);
      const bulletPoints = flatBulletPoints.map((bulletPoint, j) => {
        return (
          <div
            key={`${props.id}-${i}-${j}`}
            style={{ marginLeft: bulletPoint[1] * 16 }}
          >
            {bulletPoint[0]}
          </div>
        );
      });

      return (
        <Step
          key={`${props.id}-${i}`}
          id={steps.create()}
          audio={content.audio}
        >
          {bulletPoints}
        </Step>
      );
    });

    ignore(props, scene);
    return <>{divs}</>;
  }, DefaultProps)
);

function _flattenBullets(
  bullets: NestedBulletsT,
  level: number = 0
): FlattenedBulletT[] {
  let flatBullets: FlattenedBulletT[] = [];

  for (let bullet of bullets) {
    if (typeof bullet === 'string') {
      // This is a bullet point, so add it to the list with the current nesting level
      flatBullets.push([bullet, level]);
    } else {
      // This is a nested list of bullet points, so flatten it and add the results to the list
      flatBullets = flatBullets.concat(_flattenBullets(bullet, level + 1));
    }
  }

  return flatBullets;
}
