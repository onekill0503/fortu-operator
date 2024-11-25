import { GraphQLClient } from "graphql-request";
import { Raffle } from "../schema/types/Raffle";
import GET_RAFFLE_DATA from "../queries/GetRaffleData";
import { Withdraw } from "../schema/types/Withdraw";
import GET_WITHDRAW_DATA from "../queries/GetWithdrawData";

export const getSubGraphClient = () => {
  const client = new GraphQLClient(process.env.SUBGRAPH_ENDPOINT ?? ``);
  return client;
};

export const getRaffleData = async (batch: BigInt) => {
  const client = getSubGraphClient();
  try {
    const response = (await client.request<{ joinRaffles: Raffle[] }>(GET_RAFFLE_DATA, { batch: batch.toString() })).joinRaffles;
    return response;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
}

export const getWithdrawData = async (batch: BigInt) => {
  const client = getSubGraphClient();
  try {
    const response = (await client.request<{ withdraws: Withdraw[] }>(GET_WITHDRAW_DATA, { batch: batch.toString() })).withdraws;
    return response;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
}