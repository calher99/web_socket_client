import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserData } from "../types/types";

interface AppContextInterface {
  displayUserCount: number;
  setDisplayUserCount: Dispatch<SetStateAction<number>>;
  userList: UserData[];
  onAddUser: (newUser: UserData) => void;
  onDelete: (id: string) => void;
  prevUsers: UserData[];
  addPrevUser: (newUser: UserData) => void;
}

const defaultValues: AppContextInterface = {
  displayUserCount: 5,
  setDisplayUserCount: () => {},
  userList: [],
  onAddUser: () => {},
  onDelete: () => {},
  prevUsers: [],
  addPrevUser: () => {},
};

const AppContext = createContext<AppContextInterface>(defaultValues);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [displayUserCount, setDisplayUserCount] = useState(5);
  const [userList, setUserList] = useState<UserData[]>(defaultValues.userList);
  const [prevUsers, setPrevUsers] = useState<UserData[]>([]);

  const addPrevUser = useCallback((newUser: UserData) => {
    setPrevUsers((currentPrevUsers) => {
      // Check if the user is already in the list
      const isUserExists = currentPrevUsers.some(
        (user) => user.userId === newUser.userId
      );
      if (!isUserExists) {
        return [...currentPrevUsers, newUser];
      }
      return currentPrevUsers;
    });
  }, []);

  const findInsertIndex = (userList: UserData[], newEntry: UserData) => {
    if (userList.length === 0) return 0;
    if (userList[0].score < newEntry.score) {
      return 0;
    }
    let i = 1;
    while (i < userList.length && userList[i].score > newEntry.score) {
      i = i + 1;
    }
    return i;
  };

  const onAddUser = useCallback(
    (newUser: UserData) => {
      setUserList((previousUsers) => {
        let usersArray = [...previousUsers];
        if (previousUsers.length < displayUserCount) {
          usersArray.splice(findInsertIndex(usersArray, newUser), 0, newUser);
        } else {
          if (newUser.score > previousUsers[previousUsers.length - 1].score) {
            usersArray.splice(findInsertIndex(usersArray, newUser), 0, newUser);
            usersArray.splice(-1, 1);
          } else {
            //Wont add
          }
        }
        return usersArray;
      });
    },
    [displayUserCount]
  );

  useEffect(() => {
    setUserList((previousUsers) => {
      return previousUsers.slice(0, displayUserCount);
    });
  }, [displayUserCount]);

  const onDelete = (id: string) => {
    let usersArrayUpdated = userList.filter((user) => user.userId !== id);
    setUserList(usersArrayUpdated);
  };

  const value: AppContextInterface = {
    displayUserCount,
    setDisplayUserCount,
    userList,
    onAddUser,
    onDelete,
    prevUsers,
    addPrevUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
