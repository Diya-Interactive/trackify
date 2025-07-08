import type { ReactNode } from "react";
import { getMe } from "../../services/api/auth";
import { useToast } from "../../hooks/useToast";
import { createContext, useState, useEffect } from "react";
import { getErrorMessage } from "../../utils/globalFunctions";

export interface UserData {
    id: number;
    name: string;
    email: string;
    type: string;
    permissions: Record<string, string[]>;
}

interface UserContextType {
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    const { showToast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
              try {
                  const response = await getMe();
                  setUser(response.data);
              } catch (error) {
                  showToast(getErrorMessage(error), "error");
              }
             
        };
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
