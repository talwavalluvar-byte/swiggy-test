import React, { Component, ReactNode } from "react";

export type SessionContextType = {
  resolved?: boolean;
  loading?: boolean;
  error?: any;
  logout?: () => Promise<boolean>;
  clearClientDB?: () => Promise<boolean>;
  clearLocalStorage?: () => void;
};

const defaultState: SessionContextType = {
  resolved: false,
  loading: false,
  error: null,
  logout: undefined,
  clearClientDB: undefined,
  clearLocalStorage: undefined,
};

const Context = React.createContext<SessionContextType>(defaultState);

const { Consumer, Provider } = Context;

export { Consumer, Context };

type Props = { children: ReactNode };

type State = {
  resolved: boolean;
  loading: boolean;
  error: any;
};

class SessionProvider extends Component<Props, State> {
  readonly state: State = {
    resolved: true,
    loading: false,
    error: null,
  };

  componentDidMount() {}

  render() {
    const { resolved } = this.state;
    return (
      resolved && (
        <Provider value={{ ...this.state }}>{this.props.children}</Provider>
      )
    );
  }
}

export default SessionProvider;
