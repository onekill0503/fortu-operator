import { gql } from "graphql-request";

const GET_RAFFLE_DATA = gql`
  query GetRaffleData($batch: BigInt!) {
    joinRaffles(where: { batch_eq: $batch }) {
      wallet
      amount
      block
      batch
      timestamp
    }
  }
`;

export default GET_RAFFLE_DATA;
