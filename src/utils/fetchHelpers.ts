import { Keychain } from "@daohaus/keychain-utils";

import { Dao_Filter, Dao_OrderBy, listDaos } from "@daohaus/moloch-v3-data";
import { Ordering, Paging } from "@daohaus/data-fetch-utils";

const DEFAULT_RECORDS_PER_PAGE = 100;

export const fetchDaosList = async ({
  filter,
  ordering,
  paging,
  daochain,
  graphApiKeys,
}: {
  filter: Dao_Filter;
  ordering?: Ordering<Dao_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  try {
    const res = await listDaos({
      networkId: daochain,
      filter,
      ordering,
      paging: paging || {
        pageSize: DEFAULT_RECORDS_PER_PAGE,
        offset: 0,
      },
      graphApiKeys,
    });
    if (!res) {
      console.error("no proposals found");
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};
