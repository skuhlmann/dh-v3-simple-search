import styled from "styled-components";

import {
  charLimit,
  formatValueTo,
  fromWei,
  toWholeUnits,
} from "@daohaus/utils";
import { getNetworkName } from "@daohaus/keychain-utils";
import {
  Badge,
  Bold,
  border,
  Link,
  ParLg,
  ParMd,
  ParSm,
  ProfileAvatar,
  Tag,
} from "@daohaus/ui";
import { useSearch } from "../contexts/SearchContext";
import { ListDaosQueryResDaos } from "@daohaus/moloch-v3-data";

const StyledDaoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 34rem;
  min-width: 26rem;
  padding: 2.4rem;
  background-color: ${(props) => props.theme.blue2};
  border: 1px solid ${(props) => props.theme.blue1};
  border-radius: ${border.radius};
  .top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }

  .badge {
    transform: translateX(-0.8rem);
  }
  .dao-description {
    margin: 1rem 0;
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
    p {
      margin-bottom: 0.6rem;
    }
  }
  .tag-box {
    font-size: 1.4rem;
    margin-bottom: 2.4rem;
    div {
      margin-right: 1.5rem;
    }
  }
`;

export const DaoCard = ({ dao }: { dao: ListDaosQueryResDaos[number] }) => {
  const { chainId } = useSearch();
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-box">
        <div className="alert-box">
          <ProfileAvatar size="xl" address={dao.id} />
        </div>
      </div>
      <ParLg className="dao-title">
        {dao.name ? charLimit(dao.name, 21) : charLimit(dao.id, 21)}{" "}
      </ParLg>

      {dao.description && (
        <ParSm className="dao-description">
          {charLimit(dao.description, 100)}
        </ParSm>
      )}
      <div className="stats-box">
        {dao.activeMemberCount && (
          <ParMd>
            <Bold>{dao.activeMemberCount}</Bold>{" "}
            {parseInt(dao.activeMemberCount) === 1 ? "Member" : "Members"}
          </ParMd>
        )}
        {dao.proposalCount && (
          <ParMd>
            <Bold>{dao.proposalCount}</Bold>{" "}
            {parseInt(dao.proposalCount) === 1 ? "Proposal" : "Proposals"}
          </ParMd>
        )}
        {dao.shareTokenSymbol && (
          <ParMd>
            <Bold>{toWholeUnits(dao.totalShares)}</Bold>{" "}
            <Bold>
              {formatValueTo({
                value: fromWei(dao.totalShares),
                decimals: 2,
                format: "numberShort",
              })}
            </Bold>
            {`${charLimit(dao.shareTokenSymbol, 20)} tokens in circulation`}
          </ParMd>
        )}
      </div>
      <div className="tag-box">
        {chainId && <Tag tagColor="red">{getNetworkName(chainId)}</Tag>}
        <Tag tagColor="blue">Moloch V3</Tag>
      </div>
      <Link
        href={`https://admin.daohaus.club/#/molochv3/${chainId}/${dao.id}`}
        target="_blank"
        rel="noreferrer"
      >
        Go
      </Link>
    </StyledDaoCard>
  );
};
