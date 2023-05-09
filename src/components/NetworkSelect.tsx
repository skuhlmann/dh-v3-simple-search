import React from "react";

import { ValidNetwork } from "@daohaus/keychain-utils";
import { Select } from "@daohaus/ui";
import { useSearch } from "../contexts/SearchContext";

export const NetworkSelect = () => {
  const { chainId, setChainId, setDaoData, isLoading } = useSearch();

  const updateNetwork = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDaoData(undefined);
    setChainId(e.target.value as ValidNetwork);
  };

  if (!chainId) return null;

  return (
    <Select
      id="networkSelect"
      disabled={isLoading}
      defaultValue={chainId}
      containerClassName="inline-select"
      onChange={updateNetwork}
      options={[
        {
          name: "Mainnet",
          value: "0x1",
        },
        {
          name: "Gnosis Chain",
          value: "0x64",
        },
        {
          name: "Optimism",
          value: "0xa",
        },
        {
          name: "Arbitrum",
          value: "0xa4b1",
        },
        {
          name: "Polygon",
          value: "0x89",
        },
        {
          name: "Goerli",
          value: "0x5",
        },
      ]}
    />
  );
};
