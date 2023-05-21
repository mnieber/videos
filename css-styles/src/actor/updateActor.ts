import { ActorT } from '/src/actor/Actor';

export type PropsT = {
  dx?: number;
  dy?: number;
  height?: number;
  width?: number;
  posFrom?: ActorT;
  child?: React.ReactElement;
  pickStyles?: string[];
  dPickStyles?: string[];
  visible?: boolean;
};

export const updateActor = (actor: ActorT, props: PropsT) => {
  if (props.dx) {
    actor.x += props.dx;
  }
  if (props.dy) {
    actor.y += props.dy;
  }
  if (props.posFrom) {
    actor.x = props.posFrom.x;
    actor.y = props.posFrom.y;
  }
  if (props.child) {
    actor.child = props.child;
  }
  if (props.height) {
    actor.height = props.height;
  }
  if (props.width) {
    actor.width = props.width;
  }
  if (props.pickStyles) {
    actor.pickStyles = props.pickStyles;
  }
  if (props.dPickStyles) {
    actor.pickStyles = _updateStyles(actor.pickStyles, props.dPickStyles);
  }
  if (props.visible !== undefined) {
    actor.visible = props.visible;
  }
};

/**
 * This function merges and updates an array of styles based on a second array of styles following a set of rules.
 *
 * @param {string[]} pickStyles - An array of styles, where each style is a string in the format "one.two.style",
 * where "one.two" is the prefix and can have arbitrary parts separated by dots.
 *
 * @param {string[]} dPickStyles - A secondary array of styles in the same format as pickStyles.
 *
 * The function returns a new array of styles that is created as follows:
 *
 * 1. Styles in pickStyles that have a prefix that is not present in dPickStyles are kept.
 * 2. Every style in pickStyles that has a prefix that is also present in dPickStyles is replaced by
 *    the last style in dPickStyles that has that same prefix.
 * 3. Every style in dPickStyles that has a prefix not present in pickStyles is added to the returned array.
 *
 * @returns {string[]} - The array of updated styles.
 */
const _updateStyles = (
  pickStyles: string[],
  dPickStyles: string[]
): string[] => {
  const stylesMap = new Map<string, string>();

  // Process dPickStyles, mapping prefixes to corresponding styles
  for (const style of dPickStyles) {
    const prefix = style.substring(0, style.lastIndexOf('.'));
    stylesMap.set(prefix, style);
  }

  // Process pickStyles, replacing where needed and keeping otherwise
  const updatedStyles = pickStyles.map((style) => {
    const prefix = style.substring(0, style.lastIndexOf('.'));
    return stylesMap.get(prefix) || style;
  });

  // Adding styles from dPickStyles with prefixes not in pickStyles
  for (const style of dPickStyles) {
    const prefix = style.substring(0, style.lastIndexOf('.'));
    if (!pickStyles.find((ps) => ps.startsWith(prefix + '.'))) {
      updatedStyles.push(style);
    }
  }

  return updatedStyles;
};
