import styled from "styled-components";

import { breakpoints } from "@daohaus/ui";
import { ListDaosQueryResDaos } from "@daohaus/moloch-v3-data";
import { DaoCard } from "./DaoCard";

export const DaoList = ({ daoData }: { daoData: ListDaosQueryResDaos }) => {
  return <DaoCards daoData={daoData} />;
};

const CardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
  margin-top: 5rem;
`;

const DaoCards = ({ daoData }: { daoData: ListDaosQueryResDaos }) => (
  <CardListBox>
    {daoData.map((dao) => {
      return <DaoCard key={dao.id} dao={dao} />;
    })}
  </CardListBox>
);
