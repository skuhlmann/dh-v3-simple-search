import React, { ReactNode } from "react";
import styled from "styled-components";
import { Footer, SingleColumnLayout, widthQuery } from "@daohaus/ui";

const Container = styled.div`
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  @media ${widthQuery.md} {
    width: 95%;
    padding: 0 0.5rem;
  }
`;

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Container>
        <SingleColumnLayout>{children}</SingleColumnLayout>
      </Container>
      <Footer />
    </>
  );
};
