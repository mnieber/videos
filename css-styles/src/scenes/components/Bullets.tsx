import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';

type BulletPointT = string;
type NestedBulletsT = Array<BulletPointT | NestedBulletsT>;
type FlattenedBulletT = [BulletPointT, number]; // Tuple of bullet point and nesting level

export type PropsT = {
  bullets: NestedBulletsT[];
};

const DefaultProps = {};

export const Bullets = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const flatBulletPoints = _flattenBullets(props.bullets);
    const bulletPoints = flatBulletPoints.map((bulletPoint, idx) => {
      const marginLeft = bulletPoint[1] * 16;
      const stepId = bulletPoint[0]; // HACK
      return (
        <div key={`${stepId}-${idx}`} style={{ marginLeft: marginLeft }}>
          {bulletPoint[0]}
        </div>
      );
    });

    return <>{bulletPoints}</>;
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
