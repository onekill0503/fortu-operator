import { Wallet } from "ethers";
import { Raffle } from "../schema/types/Raffle";
import { UserTicket } from "../schema/types/UserTicket";
import { getFortuSmartContract, getLatestBlock, getOwnerWallet } from "../utils/blockchain";
import { getRaffleData } from "../utils/subgraph";

const raffleData = async () => {
    const FortuSmartContract = await getFortuSmartContract();
    const OperatorWallet: Wallet = await getOwnerWallet();
    const activeBatch = (await FortuSmartContract.currentBatch())[0];
    const isOperatorAlreadySubmit: boolean = (await FortuSmartContract.operatorConfirm(activeBatch, OperatorWallet.address))[0]
    
    if(isOperatorAlreadySubmit){
        console.log(`[${new Date()}] FORTU : Operator already submit winner`);
        return;
    }

    const finalUserRaffleData = await getFinalRaffleData(BigInt(activeBatch));
    const getGeneratedLuckyNumber: string = (await FortuSmartContract.randomNumbers(activeBatch))[1];
    const luckyNumber: BigInt = (BigInt(getGeneratedLuckyNumber) / finalUserRaffleData.totalTickets) + BigInt(1);
    const luckyUser: UserTicket | undefined = finalUserRaffleData.data.find((ticket) => {
        return luckyNumber >= ticket.startTicketNumber && luckyNumber <= ticket.endTicketNumber;
    });
    
    if(!luckyNumber) {
        console.log(`[${new Date()}] FORTU : Lucky User Not Found !`);
        return;
    }

    const submitWinnerTx = await FortuSmartContract.submitWinner(luckyNumber , luckyUser?.wallet);
    await submitWinnerTx.wait();
}

const getFinalRaffleData = async (batch: BigInt): Promise<{ data: UserTicket[], totalTickets: bigint}> => {
    const rawRaffleData: Raffle[] = await getRaffleData(batch);
    if(rawRaffleData.length === 0) return { data: [], totalTickets: BigInt(0)};
    const cleanRaffleData: Raffle[] = removeDuplicateAddresses(rawRaffleData);
    return await generateUserTickets(cleanRaffleData);
}

const removeDuplicateAddresses = (raffleData: Raffle[]) => {
    const raffleMap = new Map<string, Raffle>();
    raffleData.forEach((r: Raffle) => {
        if (raffleMap.has(r.wallet)) {
            const newRaffleData: Raffle = {
                ...r,
                amount: (
                    BigInt(raffleMap.get(r.wallet)!.amount) + BigInt(r.amount)
                ).toString(),
            };
            raffleMap.set(r.wallet, newRaffleData);
        } else {
            raffleMap.set(r.wallet, r);
        }
    });
    return Array.from(raffleMap.entries()).map((d) => d[1]);
}

const generateUserTickets = async (raffleData: Raffle[]): Promise<{ data: UserTicket[], totalTickets: bigint}> => {
    let ticketNumber = BigInt(1);
    const FortuSmartContract = await getFortuSmartContract();
    const blockToTicketRatio: bigint = (await FortuSmartContract.BLOCK_TO_TICKET_RATIO())[0]
    const latestBlock: bigint = BigInt(await getLatestBlock());
    const userTickets: UserTicket[] = [];
    raffleData.forEach((r: Raffle) => {
        const holdingBlock = (latestBlock - BigInt(r.block));
        const userTotalTicket = (holdingBlock / blockToTicketRatio) + BigInt(r.amount);
        const endTicketNumber = (ticketNumber + userTotalTicket);
        const userTicket: UserTicket = {
            wallet: r.wallet,
            startTicketNumber: ticketNumber,
            endTicketNumber: endTicketNumber - BigInt(1),
        };
        userTickets.push(userTicket);
        ticketNumber = endTicketNumber;
    });
    return { data: userTickets, totalTickets: ticketNumber};
}

export default raffleData;