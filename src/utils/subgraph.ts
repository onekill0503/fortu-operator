import { GraphQLClient } from "graphql-request";
import { Raffle } from "../schema/types/Raffle";
import GET_RAFFLE_DATA from "../queries/GetRaffleData";

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
