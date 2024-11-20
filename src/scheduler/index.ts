import { cron, Patterns } from "@elysiajs/cron";
import raffleData from "../services/raffle";

/**
 * Cron job to execute the batch withdraw and unstake withdraw
 */
export default cron({
  name: `Fortu Operator Winner Pick Execution`,
  pattern: Patterns.everyHours(1),
  run: async () => {
    await raffleData();
  },
});

