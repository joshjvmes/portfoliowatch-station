export const handleProgramError = (error: any) => {
  try {
    // Handle specific program error codes
    if (error?.code === 6000) {
      return "Transaction failed: Insufficient funds";
    } else if (error?.code === 6001) {
      return "Transaction failed: Invalid token account";
    } else if (error?.message?.includes('u64')) {
      return "Transaction failed: Number format error";
    } else if (error?.message?.includes('TokenAccountNotFoundError')) {
      return "Transaction failed: Token account not found";
    }
    
    // Log the full error for debugging
    console.error('Detailed error:', {
      code: error?.code,
      message: error?.message,
      stack: error?.stack
    });

    return error?.message || "An unknown error occurred";
  } catch (e) {
    console.error('Error in handleProgramError:', e);
    return "An unexpected error occurred";
  }
};