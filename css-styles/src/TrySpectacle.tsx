import { Deck, DefaultTemplate, Slide } from 'spectacle';

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
  },
};
// SPECTACLE_CLI_THEME_END

const template = <DefaultTemplate />;

export const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide>
      <p>Hello, world!</p>
      <Stepper tagName="p" alwaysVisible values={['foo', 'bar']}>
        {(value, step, isActive) =>
          isActive
            ? `The first stepper is active. Step: ${step} Value: ${value}`
            : `The first stepper is not active. Step: ${step} Value: ${value}`
        }
      </Stepper>
      <Stepper tagName="p" alwaysVisible values={['baz', 'quux']}>
        {(value, step, isActive) =>
          isActive
            ? `The second stepper is active. Step: ${step} Value: ${value}`
            : `The second stepper is not active. Step: ${step} Value: ${value}`
        }
      </Stepper>
    </Slide>{' '}
  </Deck>
);
