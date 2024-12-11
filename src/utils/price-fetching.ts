import { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
import { 
  WhirlpoolContext, 
  buildWhirlpoolClient, 
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil
} from "@orca-so/whirlpools-sdk";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";

// Create a dummy wallet for read-only operations
class DummyWallet implements Wallet {
  constructor() {}
  async signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T> {
    return Promise.reject("Not implemented");
  }
  async signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]> {
    return Promise.reject("Not implemented");
  }
  get publicKey(): PublicKey {
    return PublicKey.default;
  }
}

export const fetchOrcaPrices = async (connection: Connection, tokenMintStr: string) => {
  try {
    // Create a provider with a dummy wallet for read-only operations
    const wallet = new DummyWallet();
    const provider = new AnchorProvider(
      connection,
      wallet,
      AnchorProvider.defaultOptions()
    );

    // Convert string to PublicKey
    const tokenMint = new PublicKey(tokenMintStr);
    
    // Initialize WhirlpoolContext
    const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
    const client = buildWhirlpoolClient(ctx);

    // Find whirlpools containing our token
    const whirlpoolPda = PDAUtil.getWhirlpool(
      ctx.program.programId,
      tokenMint,
      tokenMint, // Using same token as both tokens for simplicity
      128 // Standard tick spacing
    );

    const whirlpool = await client.getPool(whirlpoolPda.publicKey);
    if (!whirlpool) return null;

    const price = await whirlpool.getData();
    return price.sqrtPrice.toNumber();
  } catch (error) {
    console.error("Error fetching Orca price:", error);
    return null;
  }
};

export const fetchRaydiumPrices = async (connection: Connection, tokenMintStr: string) => {
  try {
    // Convert string to PublicKey before using it
    const marketAddress = new PublicKey(tokenMintStr);
    const market = await Market.load(connection, marketAddress, {}, "mainnet-beta");
    const price = await market.loadBids(connection);
    return price.getL2(1)[0]?.[0] || null;
  } catch (error) {
    console.error("Error fetching Raydium price:", error);
    return null;
  }
};