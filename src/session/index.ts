import { AUTH_TOKEN_KEY } from "src/constants/keys";

import {
  Consumer as SessionConsumer,
  Context as SessionContext,
} from "./SessionProvider";

import SessionProvider from "./SessionProvider";

const getAuthToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY);

export { SessionContext, SessionConsumer, getAuthToken };
export default SessionProvider;
