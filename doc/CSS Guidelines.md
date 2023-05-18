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
