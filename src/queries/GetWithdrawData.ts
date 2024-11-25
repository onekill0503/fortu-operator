import { gql } from "graphql-request";
const GET_WITHDRAW_DATA = gql`
  query getWithdrawData($batch: BigInt!) {
    withdraws(where: { batch: $batch }, orderBy: block, orderDirection: asc) {
      amount
      block
      batch
      wallet
      timestamp_
    }
  }
`;
export default GET_WITHDRAW_DATA;
