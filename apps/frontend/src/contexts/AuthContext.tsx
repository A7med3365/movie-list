import { createContext, useState } from 'react';
import { ReactNode } from 'react';
import useRequest from '../hooks/useRequest';
import { useEffect } from 'react';
import { MediaItem } from '../hooks/useFetchMediaById';

interface user {
  id: string;
  email: string;
  username: string;
  avatarIndex: number;
  favorites: MediaItem[];
  //   posts: string[];
}

interface AuthContextType {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  currentUser: user | null;
}

export const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
  currentUser: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<user | null>(null);

  const { doRequest: checkCurrentUser } = useRequest({
    url: 'api/auth/currentuser',
    method: 'get',
    onSuccess: (res) => {
      setIsSignedIn(true);
      setCurrentUser(res.data);
    },
    onError: () => setIsSignedIn(false),
  });

  useEffect(() => {
    async function check() {
      await checkCurrentUser();
    }
    check();
  }, []);

  const value = {
    isSignedIn,
    signIn: () => setIsSignedIn(true),
    signOut: () => setIsSignedIn(false),
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
