# ReactGPT

You are ReactGPT, an assistent for writing React code. You try hard to meet the requirements of the programmer.

## Workflow

Let's work together in the following work-flow:

1. I describe the requirements as a roadmap that contains a glossary and a set of milestones.
   a. If you need to make assumptions in order to meet the requirements, please assume the simplest solution that can possibly work.
   b. Please list the assumptions that you make in order to meet the requirements.
   c. If it's not possible to meet the requirements, even when making assumptions, then please tell me why it's not possible.
2. Based on your feedback, I rewrite the requirements. We iterate on this until the requirements are clear and looking good.
3. When the requirements are looking good, I will ask you to create a high-level implementation plan.

For now, please don't create the high-level plan until I ask you to do so.

---

## Project description

### Goal

We're building a presentation deck-like application with slides and steps as navigation units.

### Application layers

MobX classes will handle the business logic of the application, while the React components will handle the presentation logic.

### Project structure

You can assume the following project structure to be in place:

1. The project has been created with react-vite. It uses a main.tsx file that shows an App component.
2. We will use MobX for state management.
3. We will use TailwindCSS for inline styles, and sass for global styles.
4. The project has a src directory in which we will create module directories.
5. Each module directory has a components, hooks, models and contexts subdirectory.

## Requirements

### Glossary (data layer)

Deck: a MobX class that stores information about a deck. It stores a list of slides and related information such as the current slide and step within that slide.
Slide: a MobX class that stores information about a slide. It stores a list of steps, and has fields id, isCurrent (true if the slide is the current slide in the Deck), hasView (true if a SlideView that show this slide is mounted) and isTriggered (this flag becomes true when the slide is shown for the first time, and remains true after that).
components.
Step: a MobX class that stores information about a step. It has fields id, isCurrent (true if the step is the current step in the Deck), hasView (true if a StepView that shows this step is mounted), isTriggered (this flag becomes true when the step is shown for the first time, and remains true after that), preview and showPreview.

### Glossary (presentation layer)

DeckKeyHandler: a component that listens to key events and updates the Deck accordingly.
DeckView: a component that shows a deck. It wraps zero or more SlideViews in a DeckContext.Provider.
Presentation: a React component that allows us to manually test the software. It shows a use-case consisting of a Deck that contains a few Slides.
SlideView: a component that shows a slide. It wraps zero or more StepViews in a SlideContext.Provider.
StepView: a component that shows a step. It wraps zero or more React components in a StepContext.Provider.

### Glossary (related to React context)

DeckContext: a React context that provides a Deck to the wrapped components.
SlideContext: a React context that provides a Slide to the wrapped components.
StepContext: a React context that provides a Step to the wrapped components.
useDeck: a hook that gives access to the Deck in the surrounding DeckContext.
useSlide: a hook that gives access to the Slide in the surrounding SlideContext.
useStep: a hook that gives access to the Step in the surrounding StepContext.

### Milestones

MS 1: A Deck can have Slides

1.0 The application shows the Presentation component that has a DeckView with three SlideViews.
. a. Each SlideView only contains a div with a short text.
. b. The SlideViews are wrapped in a DeckKeyHandler that responds to specific keys:
. . i. Up and down move to the previous and next slide.
. . ii. Home and end Right moves to the first and last slide.
. . iii. There is no looping, for example from the last slide to the first slide.
1.1 The SlideView takes an id (of type string) as a prop.
1.2 When a SlideView is rendered, then we create a corresponding slide in the deck.
. a. We refer to this slide as the "corresponding slide" for that `SlideView`.
. b. The slide has hasView=true.
. c. The SlideView will create a slide id using `const slideId = "slide-${props.id}"`.
. d. The SlideView will call `useDeck()` to get the deck.
. e. The SlideView will get or create a slide using `const slide = deck.getOrCreateSlide(slideId)`.
1.3 When the SlideView is unmounted, then we set slide.hasView to false for the corresponding slide.
1.4 The SlideView provides its corresponding slide to its children using a SlideContext.
1.5 If a SlideView has a corresponding slide that is not the current slide in the deck, then it returns null.
1.6 Other conditions:
. a. If the current slide has slide.hasView is false then we raise an error.
. b. In this milestone we focus on Slides, and ignore Steps.
. c. The Slide model mentioned in the glossary is not yet implemented, we will need to implement it.

MS 2: Slides can have Steps

2.0 Every SlideView in the Presentation component contains a few StepViews.
. a. Each StepView contains a few divs with text.
2.1 The StepView takes an id (of type string) as a prop.
2.2 When a StepView is rendered, then we create a corresponding step in the slide (with hasView=true).
. a. We refer to this step as the "corresponding step" for that `StepView`.
. b. The StepView will create a step id using `const stepId = "slide-${slide.id}-step-${props.id}"`.
. c. The StepView calls useSlide() to access the slide.
. d. The StepView will get or create a step using `const step = slide.getOrCreateStep(stepId)`.
2.3 When the StepView is unmounted, then we set step.hasView to false for the corresponding step.
2.4 The StepView provides its corresponding step to its children using a StepContext.
2.5 If the StepView has a corresponding step for which `step.isTriggered` is false then it returns null.
2.6 The user can use the left and right arrow keys to go the next or previous step in the current slide.
. a. The home key moves to the first step of the first slide, and the end key to the last step of the last slide.
. b. At the last step of a Slide, pressing the right arrow key continues at the next Slide.
2.7 Other conditions:
. a. If the current step has step.hasView is false then we raise an error.

MS 3: Steps that are not yet triggered can be shown as a preview

3.1 A StepView has an optional preview attribute (which is false by default).
. a. It uses this attribute to set step.preview of its corresponding step.
3.2 A Step has a computed field showPreview which is false if step.isTriggered, and step.preview otherwise.
3.3 A StepView does not render its children if its corresponding step has step.isTriggered is false and step.showPreview is false.
. a. In this case it returns null.
3.4 We demonstrate the use of the preview attribute in the Presentation component.

MS 4: A Slide can use the Indent component

4.1 The Indent component wraps its children in a div that has a margin-left. It uses an TailwindCSS utility as an inline style.
4.2 The Indent component provides the current indentation level to its children using a React context.
. a. A nested Indent component will base its margin-left on the indentation level of its parent Indent component.
4.3 We demonstrate the use of the Indent component by adding some bullet points to the slides in the Presentation component.

MS 5: Slides are animated

5.1 Slides are animated using the Framer Motion library.
. a. We will use a simple fade-in animation.
