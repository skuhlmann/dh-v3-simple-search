import React from "react";
import styled from "styled-components";

import { DataMd, H1, widthQuery } from "@daohaus/ui";
import hausBlock from "../assets/hausCastle.svg";
import { NetworkSelect } from "./NetworkSelect";

const StyledDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 5rem 0;
  width: 100%;
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;

const StyledHeader = styled(H1)`
  @media ${widthQuery.sm} {
    text-align: center;
  }
`;

export const Header = () => {
  return (
    <>
      <div className="img-block">
        <img src={hausBlock} alt="daohaus block pattern" />
      </div>
      <StyledHeader>DAOhaus Simple Search</StyledHeader>
      <StyledDescription>
        <DataMd>Search for Moloch V3 DAOs on</DataMd>
        <NetworkSelect />
      </StyledDescription>
    </>
  );
};
