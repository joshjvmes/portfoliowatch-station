import { SecurityInfo } from "./SecurityInfo";

export const WireDeposit = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
        <h3 className="font-medium text-[#00E5BE] mb-4">Wire Transfer Details</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Bank Name</p>
            <p className="text-white">Global Trading Bank</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Account Number</p>
            <p className="text-white">8529674103</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">SWIFT Code</p>
            <p className="text-white">GTBKUS44</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Reference</p>
            <p className="text-white">Include your User ID: 85296</p>
          </div>
        </div>
      </div>

      <SecurityInfo
        title="Important Information"
        items={[
          "Processing time: 1-3 business days",
          "Include reference number",
          "Minimum deposit: $1,000",
        ]}
      />
    </div>
  );
};