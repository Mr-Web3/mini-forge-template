"use client";
import { useEffect, useState, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseAbi, encodeFunctionData } from "viem";

// Paymaster address for Base (from CDP)
// This is the paymaster address that accepts USDC for gas payments
// You can override this with NEXT_PUBLIC_PAYMASTER_ADDRESS env variable
const PAYMASTER_ADDRESS = (process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS) as `0x${string}`;

// USDC on Base
const USDC_ADDRESS = (process.env.NEXT_PUBLIC_USDC_ADDRESS) as `0x${string}`;
const USDC_DECIMALS = 6;

// Minimum threshold: $1 USDC
const MIN_TOKEN_THRESHOLD = 1 * 10 ** USDC_DECIMALS; // 1 USDC

// Top-up amount: $20 USDC
const TOKEN_APPROVAL_TOP_UP = 20 * 10 ** USDC_DECIMALS; // 20 USDC

/**
 * Hook to manage ERC20 token (USDC) allowance for gas payments
 * Checks allowance and approves if needed
 */
export function useERC20GasPayment() {
  const { address, isConnected } = useAccount();
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Read current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: parseAbi(["function allowance(address owner, address spender) returns (uint256)"]),
    functionName: "allowance",
    args: address && isConnected ? [address, PAYMASTER_ADDRESS] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Write approval
  const { 
    data: hash, 
    writeContract, 
    isPending: isApproving,
    error: approveError 
  } = useWriteContract();

  // Wait for approval transaction
  const { isLoading: isConfirming, isSuccess: isApproved } = useWaitForTransactionReceipt({
    hash,
  });

  // Check if approval is needed
  useEffect(() => {
    if (!isConnected || !address || allowance === undefined || allowance === null) {
      setNeedsApproval(false);
      return;
    }

    setIsChecking(true);
    // Handle different allowance types from useReadContract
    let allowanceBigInt: bigint;
    try {
      if (typeof allowance === 'bigint') {
        allowanceBigInt = allowance;
      } else if (allowance !== null && allowance !== undefined) {
        // Convert to string first, then to bigint
        allowanceBigInt = BigInt(String(allowance));
      } else {
        setNeedsApproval(false);
        setIsChecking(false);
        return;
      }
    } catch {
      setNeedsApproval(false);
      setIsChecking(false);
      return;
    }
    
    const thresholdBigInt = BigInt(MIN_TOKEN_THRESHOLD.toString());
    
    setNeedsApproval(allowanceBigInt < thresholdBigInt);
    setIsChecking(false);
  }, [allowance, isConnected, address]);

  // Refetch allowance after successful approval
  useEffect(() => {
    if (isApproved) {
      refetchAllowance();
    }
  }, [isApproved, refetchAllowance]);

  /**
   * Approve USDC for paymaster to use for gas payments
   */
  const approveUSDC = () => {
    if (!address || !isConnected) {
      console.error("Wallet not connected");
      return;
    }

    writeContract({
      address: USDC_ADDRESS,
      abi: parseAbi(["function approve(address spender, uint256 amount) returns (bool)"]),
      functionName: "approve",
      args: [PAYMASTER_ADDRESS, BigInt(TOKEN_APPROVAL_TOP_UP.toString())],
    });
  };

  /**
   * Get the approval call data to be bundled with the main transaction
   * Returns the encoded approval transaction data
   */
  const getApprovalCall = useMemo(() => {
    if (!needsApproval || !address) {
      return null;
    }

    try {
      const approvalData = encodeFunctionData({
        abi: parseAbi(["function approve(address spender, uint256 amount) returns (bool)"]),
        functionName: "approve",
        args: [PAYMASTER_ADDRESS, BigInt(TOKEN_APPROVAL_TOP_UP.toString())],
      });

      return {
        to: USDC_ADDRESS,
        data: approvalData as `0x${string}`,
        value: BigInt(0),
      };
    } catch (error) {
      console.error("Error encoding approval call:", error);
      return null;
    }
  }, [needsApproval, address]);

  return {
    needsApproval,
    isChecking,
    isApproving: isApproving || isConfirming,
    isApproved,
    approveUSDC,
    error: approveError,
    allowance,
    paymasterAddress: PAYMASTER_ADDRESS,
    usdcAddress: USDC_ADDRESS,
    approvalCall: getApprovalCall, // Call data to bundle with main transaction
    approvalAmount: TOKEN_APPROVAL_TOP_UP,
  };
}

