import React from "react";
import { Spinner } from "@daohaus/ui";
import { Layout } from "../components/Layout";
import { useSearch } from "../contexts/SearchContext";
import SearchInput from "../components/SearchInput";
import { Header } from "../components/Header";
import { DaoList } from "../components/DaoList";

export const Search = () => {
  const { searchTerm, setSearchTerm, daoData, isLoading } = useSearch();

  return (
    <Layout>
      <Header />
      <SearchInput
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        loading={isLoading}
      />
      {isLoading && <Spinner />}
      {daoData && <DaoList daoData={daoData} />}
    </Layout>
  );
};
