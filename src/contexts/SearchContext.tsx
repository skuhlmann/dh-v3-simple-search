import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { ListDaosQueryResDaos, MolochV3Dao } from "@daohaus/moloch-v3-data";
import {
  ReactNode,
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { fetchDaosList } from "../utils/fetchHelpers";

const graphApiKeys = { "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET };

const defaultData = {
  searchTerm: undefined,
  daoData: undefined,
  chainId: "0x64" as ValidNetwork,
  isLoading: false,
  setChainId: async () => {
    return;
  },
  setSearchTerm: async () => {
    return;
  },
  setDaoData: async () => {
    return;
  },
  reset: () => {
    return;
  },
};

export type SearchContextType = {
  searchTerm: string | null | undefined;
  daoData: ListDaosQueryResDaos | undefined;
  chainId: ValidNetwork | null | undefined;
  isLoading: boolean;
  setChainId: Dispatch<SetStateAction<ValidNetwork | null | undefined>>;
  setSearchTerm: Dispatch<SetStateAction<string | undefined>>;
  setDaoData: Dispatch<SetStateAction<ListDaosQueryResDaos | undefined>>;
  reset: () => void;
};

export const SearchContext = createContext<SearchContextType>(defaultData);

type SearchContextProps = {
  children: ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProps) => {
  const [daoData, setDaoData] = useState<ListDaosQueryResDaos>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [chainId, setChainId] = useState<ValidNetwork | null | undefined>(
    "0x64" as ValidNetwork
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let shouldUpdate = true;
    const fetchDaoData = async () => {
      if (searchTerm && chainId) {
        setIsLoading(true);
        const res = await fetchDaosList({
          filter: {
            name_contains_nocase: searchTerm,
          },
          daochain: chainId as ValidNetwork,
          graphApiKeys,
        });

        if (shouldUpdate) {
          setDaoData(res?.items);
          setIsLoading(false);
        }
      }
    };

    if (searchTerm && chainId) {
      fetchDaoData();
    } else {
      setDaoData(undefined);
    }

    return () => {
      shouldUpdate = false;
    };
  }, [searchTerm, chainId]);

  const getNextPage = async (): Promise<void> => {
    //store paging and update with that
  };

  const reset = () => {
    setDaoData(undefined);
    setSearchTerm(undefined);
  };

  return (
    <SearchContext.Provider
      value={{
        chainId,
        daoData,
        searchTerm,
        isLoading,
        setDaoData,
        setChainId,
        setSearchTerm,
        reset,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const {
    chainId,
    daoData,
    searchTerm,
    isLoading,
    setDaoData,
    setChainId,
    setSearchTerm,
    reset,
  } = useContext(SearchContext);
  return {
    chainId,
    daoData,
    searchTerm,
    isLoading,
    setDaoData,
    setChainId,
    setSearchTerm,
    reset,
  };
};
