import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { FORTU_CONTRACT_ABI, SUSDE_CONTRACT_ABI } from "../json/abis";

export const getOwnerWallet = async (): Promise<Wallet> => {
  return new Wallet(process.env.OWNER_PRIVATE_KEY ?? "", await getProvider());
};

export const getProvider = async (): Promise<JsonRpcProvider> => {
  return new JsonRpcProvider(process.env.RPC_PROVIDER ?? "");
};

export const getLatestBlock = async (): Promise<number> => {
  const Provider = await getProvider();
  return await Provider.getBlockNumber();
}

export const getFortuSmartContract = async (): Promise<Contract> => {
  return new Contract(
    process.env.FORTU_SMART_CONTRACT ?? "",
    FORTU_CONTRACT_ABI,
    await getOwnerWallet()
  );
};

export const getSUSDContract = async (): Promise<Contract> => {
  return new Contract(
    process.env.SUSD_CONTRACT_ADDRESS ?? "",
    SUSDE_CONTRACT_ABI,
    await getOwnerWallet()
  );
};
