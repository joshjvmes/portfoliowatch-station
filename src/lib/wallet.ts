import { AppKit } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';

// Initialize AppKit with minimal configuration
export const appKit = new AppKit({
  projectId: '3bc71515e830445a56ca773f191fe27e',
  metadata: {
    name: 'Solana Wallet Demo',
    description: 'Simple Solana wallet integration',
    url: window.location.origin,
    icons: [`${window.location.origin}/favicon.ico`]
  },
  adapters: [new SolanaAdapter()],
  networks: [{
    id: 'solana:devnet',
    name: 'Solana Devnet',
    rpcUrls: ['https://api.devnet.solana.com']
  }]
}) as any;