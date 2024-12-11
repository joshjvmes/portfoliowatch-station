import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
import { 
  WhirlpoolContext, 
  buildWhirlpoolClient, 
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  WhirlpoolClient
} from "@orca-so/whirlpools-sdk";
import { Provider } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";

// Create a dummy wallet for read-only operations
class DummyWallet implements Wallet {
  constructor() {}
  async signTransaction(): Promise<any> {
    return Promise.reject("Not implemented");
  }
  async signAllTransactions(): Promise<any> {
    return Promise.reject("Not implemented");
  }
  get publicKey(): PublicKey {
    return PublicKey.default;
  }
}

export const fetchOrcaPrices = async (connection: Connection, tokenMintStr: string) => {
  try {
    // Create a provider with a dummy wallet for read-only operations
    const provider = new Provider(
      connection,
      new DummyWallet(),
      Provider.defaultOptions()
    );

    // Convert string to PublicKey
    const tokenMint = new PublicKey(tokenMintStr);
    
    // Initialize WhirlpoolContext with the provider
    const ctx = WhirlpoolContext.from(
      provider,
      new PublicKey(ORCA_WHIRLPOOL_PROGRAM_ID),
      undefined
    );
    
    const client = buildWhirlpoolClient(ctx);

    // Get whirlpool configs
    const configs = await client.getConfig();
    if (!configs) return null;

    // Find a whirlpool that contains our token
    const whirlpoolPda = PDAUtil.getWhirlpool(
      ctx.program.programId,
      configs.configKeypair.publicKey,
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
    const marketAddress = new PublicKey(tokenMintStr);
    const market = await Market.load(connection, marketAddress, {}, "mainnet-beta");
    const price = await market.loadBids(connection);
    return price.getL2(1)[0]?.[0] || null;
  } catch (error) {
    console.error("Error fetching Raydium price:", error);
    return null;
  }
};