import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
import { WhirlpoolContext, buildWhirlpoolClient, ORCA_WHIRLPOOL_PROGRAM_ID } from "@orca-so/whirlpools-sdk";

export const fetchOrcaPrices = async (connection: Connection, tokenMintStr: string) => {
  try {
    const tokenMint = new PublicKey(tokenMintStr);
    const ctx = new WhirlpoolContext(
      connection,
      new PublicKey(ORCA_WHIRLPOOL_PROGRAM_ID),
      undefined,
      undefined
    );
    
    const client = buildWhirlpoolClient(ctx);
    const whirlpools = await client.getWhirlpools(); // Using correct method name
    
    // Find pools containing our token
    const relevantPools = whirlpools.filter(pool => 
      pool.tokenMintA.equals(tokenMint) || 
      pool.tokenMintB.equals(tokenMint)
    );

    if (relevantPools.length > 0) {
      // Use the most liquid pool for price
      const pool = relevantPools[0];
      const price = await pool.getData();
      return price.sqrtPrice.toNumber();
    }
    return null;
  } catch (error) {
    console.error("Error fetching Orca price:", error);
    return null;
  }
};

export const fetchRaydiumPrices = async (connection: Connection, tokenMintStr: string) => {
  try {
    const marketAddress = new PublicKey(tokenMintStr);
    const market = await Market.load(connection, marketAddress, {}, "mainnet-beta");
    const price = await market.loadBids(connection);
    return price.getL2(1)[0]?.[0] || null;
  } catch (error) {
    console.error("Error fetching Raydium price:", error);
    return null;
  }
};