import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { withDefaultProps } from '/src/app/defaultProps';
import { createScene } from '/src/scenes/Scene';
import { Script } from '/src/script/Script';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const ScriptProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const script = useBuilder(() => {
      const script = new Script();
      script.scenes = [createScene()];
      return script;
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          script: () => script,
        },
      };

      return result;
    };

    return (
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
