# CSS Guidelines

Writing CSS for an application is complicated for various reasons:

- It can be hard to predict which CSS rules will apply to an element.
- It can be hard to find the code of the CSS rules that apply to an element.
- It can be hard to understand the combined effect of multiple CSS rules.

To mitigate these problems, it's a good idea to use guidelines when writing CSS. In this document I will
propose guidelines. I'm assuming the context of a React application, but the guidelines can be used in other
frameworks as well. Before proposing the guidelines, I will introduce some terminology.

## Terminology

Ad-hoc styles: the styles of a React component that are assumed to vary among instances of that React component.
CSS component: A CSS class that is used to apply multiple CSS rules to a React component or component part.
CSS utility: A CSS class that is used to apply a single CSS rule to an element. For example, `small-font` is a utility class that applies the CSS rule `font-size: 12px;` to an element.
Intrinsic styles: the styles of a React component that are assumed to apply to every instance of that React component.

## Guidelines

### G1. BEM naming is used for CSS components.

### G2. We use css utility classes for ad-hoc styles.

Here is an example of how css utilities are used.

```css
.text-moss-green {
  color: #38a169;
}
```

```tsx
const EmailFormField = () => (
  <div className="EmailFormField FormField">
    {/* The text color is an ad-hoc style of the FormField__Label component. */}
    {/* For the EmailFormField, the label color happens to be moss green. */}
    <label className="FormField__Label text-moss-green">Email</label>
    <input className="FormField__Input" type="email" />
  </div>
);
```

### G3. We use an scss file for the intrinsic styles of a React component.

It's important to note that a certain CSS property may be part of the intrinsic styles of one React component, but part of the ad-hoc styles of another React component. For example, the `color` property may be part of the intrinsic styles of a `Button` component (which means that all buttons have the same color), but part of the ad-hoc styles of a `FormField` component (which means that every instance of a FormField can have a different color).

Here is an example of how intrinsic styles are used.

```scss
.FormField {
  font-size: 12px; // Intrinsic style
}

.FormField__Label {
  margin-bottom: 16px; // Intrinsic style
}

.FormField__Input {
  border: 1px solid black; // Intrinsic style
}
```

```tsx
const EmailFormField = () => (
  {/* Here we apply the FormField CSS component to the entire React component */}
  {/* The FormField CSS component adds the intrinsic styles for a FormField to the EmailFormField */}
  <div className="EmailFormField FormField">
    {/* The FormField__Label CSS component is used for the label part of an EmailFormField. */}
    <label className="FormField__Label text-moss-green">Email</label>
    <input className="FormField__Input" type="email" />
  </div>
);
```

### G4. We avoid overriding the CSS rules of a CSS component.

When we apply a CSS component to a React element, then we want to make it easy to understand which CSS rules apply to that React element.
Ideally, one of the following should be the case:

- The CSS component is defined in only one place.
- The CSS component is defined for different contexts. For every context, it is defined in only one place.

Here is an example of a CSS component where this guideline is followed.

```scss
.c-form-field {
  font-family: 'Roboto', sans-serif;
}

// There is no other rule that also targets .FormField. Therefore, by looking
// at this rule, we know which properties are part of a FormField.
.FormField {
  @apply c-form-field;

  font-size: 12px;
}
```

Here is another example, where the intrinsic styles of a `FormField` depend on the context.

```scss
.c-form-field {
  font-family: 'Roboto', sans-serif;
}

// This rule uniquely describes a FormField in the context of an AuthCard.
.AuthCard .FormField {
  @apply c-form-field;

  font-size: 12px;
}

// This rule uniquely describes a FormField in the context of a UserProfileCard.
.UserProfileCard .FormField {
  @apply c-form-field;

  font-size: 16px;
}
```

Notes:

- The programmer should ensure that the contexts in which a CSS component is used are not overlapping.
  For example, there should be no case of a .FormField that is in a .UserProfileCard that is inside a .AuthCard. If the contexts are
  overlapping, then it means that some CSS properties may be overridden.
- We should not use nesting to define a CSS component in a context. This way, it will be easier to find the places in the code where a CSS component is defined in a certain context.
  For example, to find out where the `.FormField` CSS component is defined in the context of an `AuthCard`, we can search for `.AuthCard .FormField` in the codebase.

### G5: Consider capturing ad-hoc styles in a layout object.

Even though ad-hoc properties may vary per component instance, it's still good to avoid having arbitrary variation in them. This will create a more consistent look.
We can achieve this by moving some of the ad-hoc properties to a layout object. Here is an example.

```tsx
export const layout = {
  FormField: {
    root: 'FormField flex flex-col',
    label: {
      root: 'FormField__Label mb-4',
      color: {
        mossGreen: 'text-moss-green',
        skyBlue: 'text-sky-blue',
      },
    },
    input: 'FormField__Input border border-gray-300 rounded',
  },
};
```

```tsx
const EmailFormField = () => {
  const l = layout.FormField;

  return (
    {/* Here we apply the FormField CSS component to the entire React component */}
    {/* The FormField CSS component adds the intrinsic styles for a FormField to the EmailFormField */}
    <div className={cn("EmailFormField", l.root)}>
      <label className={cn(l.label.root, l.label.color.green)}>Email</label>
      <input className={cn(l.input)} type="email" />
    </div>
  );
};
```

Notes:

- the colors field in layout.FormField.label.color offers a choice of ad-hoc colors for the label. By limiting these choices, we create more consistency, while still allowing
  the color to vary per component instance.

## Scenario for changing an intrinsic style to an ad-hoc style

Let's consider the scenario in which a FormField has been styled with scss files and a layout object.
The scss files contain the intrinsic styles, and the layout object contains the ad-hoc styles. The FormField can be used in either the
AuthCard context or the UserProfileCard context, as has been illustrated before:

```scss
.c-form-field {
  font-family: 'Roboto', sans-serif;
}

// This rule uniquely describes a FormField in the context of an AuthCard.
.AuthCard .FormField {
  @apply c-form-field;

  font-size: 12px;
}

// This rule uniquely describes a FormField in the context of a UserProfileCard.
.UserProfileCard .FormField {
  @apply c-form-field;

  font-size: 16px;
}
```

It's interesting to consider what should happen when we decide that the font-size must be an ad-hoc property instead
of an intrinsic property. How should we refactor the code to avoid breaking something? The challenge here is that previously
we relied on the cascading nature of style-sheets to correctly style the FormField depending on the context (either
.AuthCard or .UserProfileCard). This means we could create an element with the .FormField class without needing to know the
context of the element. Now that we want to make the font-size an ad-hoc property, we need to know the context of the element,
and apply a font-size of 12px or 16px accordingly.

I propose the following work-flow:

1. Find all instances of `FormField` in the typescript code (i.e. all .ts and .tsx files) and annotate them with a comment: `// ad-hoc: font-size`.
2. For every annotated instance, check if the context of the FormField is known. If it is known, then add the correct font-size as an ad-hoc style.
3. If the context is not known, then we must decide whether to parametrize the component (e.g. add a context attribute that can be either 'auth' or 'user-profile')
   or create a copy of the component for every context. In the latter case, we must name each copy after the context, e.g. AuthFormField and UserProfileFormField.
4. After step 3, the typescript compiler will tell us where we broke the code. In each place, we must ask ourselves the same question as in step 3:
   do we know the context, and if not: do we parametrize or create a copy of the component?
5. After fixing the code in step 4, we can remove the intrinsic style from the scss file, and remove the comments added in step 1.
