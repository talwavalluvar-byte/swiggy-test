import React, { Component, ReactNode } from "react";
import { ApolloClient } from "apollo-client";

export type SessionContextType = {
  resolved?: boolean;
  loading?: boolean;
  error?: any;
  client?: ApolloClient<any>;
  logout?: () => Promise<boolean>;
  clearClientDB?: () => Promise<boolean>;
  clearLocalStorage?: () => void;
};

const defaultState: SessionContextType = {
  resolved: false,
  loading: false,
  error: null,
  client: undefined,
  logout: undefined,
  clearClientDB: undefined,
  clearLocalStorage: undefined,
};

const Context = React.createContext<SessionContextType>(defaultState);

const { Consumer, Provider } = Context;

export { Consumer, Context };

type Props = { children: ReactNode; client: ApolloClient<any> };

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

  render() {
    const { resolved } = this.state;
    return (
      resolved && (
        <Provider value={{ ...this.state, client: this.props.client }}>
          {this.props.children}
        </Provider>
      )
    );
  }
}

export default SessionProvider;
