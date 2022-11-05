import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn() {
    console.log('Vamos logar!');
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: 'Jane Doe',
        avatarUrl: 'http://someurl.com/avatar.png',
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
