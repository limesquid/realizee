import React, { PureComponent } from 'react';

export default function ViewModel(config) {
  const getConfig = typeof config === 'function' ? config : () => config;

  return (View) => {
    class RealizeeComponent extends PureComponent {
      constructor(props, ...restArguments) {
        super(props, ...restArguments);
        this.state = props.config.state;
      }

      render() {
        return (
          <View {...this.state} />
        );
      }
    };

    return (...models) => () => (
      <RealizeeComponent config={getConfig(...models)} />
    );
  }
}
