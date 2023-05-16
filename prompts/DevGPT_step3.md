Great! Before we continue with writing source code, please memorize these guidelines for writing source code, as we will need them in the next step.

## Guidelines for writing source code

The guidelines for writing source code are explained in examples. In each example, specific guidelines are mentioned in comments that start with a guideline id.
A guideline is composed of the letter G, then a dash, and then the guideline id, e.g. G-props-children.

### Example 1: React component signature

```tsx
// G-cn: The `cn` function from `/src/utils/classnames` is used to create class names. Here, `cn` is an alias for `classnames` from the `classnames` package.
// G-abspath: All imports from local files use absolute paths that start with `/src`. The only exception is .scss files, which are imported using relative paths.
import { cn } from '/src/utils/classnames';

// G-import-scss: If a module imports scss files then the imports are placed in a separate section that start with `// Import styles`.
// Import styles
import './MyComponent.scss';

// G-propst: The properties for a component are defined in a type named `PropsT`.
// G-props-children: If `PropsT` has `children` then React.PropsWithChildren is used to define `PropsT`. Otherwise, React.PropsWithChildren is not used.
// G-classname-prop: All components have an optional `className` property.
export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

// G-functional: Components should be functional components.
// G-props-arg: Components have a single argument that is called `props`. The `props` argument is of type `PropsT`.
// G-observer: Components should use `observer` from `mobx-react-lite` to make them reactive.
// G-react-fc: We don't use React.FC to type the React component function, but keep the type function implicit.
export const MyComponent = observer((props: PropsT) => {
  return (
    // G-top-level-cn: The className at the top-level div of a component contains the component name and props.className.
    // G-inline-styles: If a div needs margins, paddings or flexbox then these are added as inline styles using TailwindCSS utilities. The other styles are added to the .scss file,
    // G-bem: BEM naming is used to name the classes.
    <div className={cn('MyComponent', 'ml-4', props.className)}>
      Example of a component
    </div>
  );
});

// G-default-exports: We never use default exports.
```

### Example 2: React hook signature

```tsx
// G-hook-props-type: The properties for a hook are defined in a type named `PropsT`.
export type PropsT = {
  // Props go here
};

// G-hooks-arg: Hooks have a single argument that is called `props`. The `props` argument is of type `PropsT`.
export const useMyHook = (props: PropsT) => {
  // Implementation goes here
};
```

### Example 3: MobX class

```tsx
import { observable, makeObservable } from 'mobx';

export class MyMobXClass {
  // G-mobx-decorators: MobX decorators are used in MobX classes.
  @observable myObservable = 0;

  constructor() {
    makeObservable(this);
  }
}
```
