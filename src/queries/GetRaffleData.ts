import { gql } from "graphql-request";

const GET_RAFFLE_DATA = gql`
  query GetRaffleData($batch: BigInt!) {
    joinRaffles(where: { batch: $batch }, orderDirection: asc, orderBy: block) {
      wallet
      amount
      block
      batch
      timestamp_
    }
  }
`;

export default GET_RAFFLE_DATA;
