"use client";
import React, { useState } from 'react';
import { FaChartBar, FaCoins, FaShieldAlt, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Earn,
    EarnDeposit,
    EarnWithdraw,
    EarnDetails,
    DepositBalance,
    DepositAmountInput,
    DepositButton,
    WithdrawBalance,
    WithdrawAmountInput,
    WithdrawButton } from '@coinbase/onchainkit/earn';

const Morpho = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
  <div className="min-h-screen max-w-4xl mx-auto px-4 py-5 pb-32 md:pb-6 md:py-10 bg-background">
    {/* Header Section */}
    <div className="text-center mb-8">
        <h1 className="flex items-center justify-center text-3xl md:text-4xl font-bold mb-4 py-5 text-foreground gap-3">
            <FaChartBar className="text-4xl text-[#0b55e9]" /> 
            <span className="font-orbitron">Morpho</span>
        </h1>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Earn yield on your assets with Decentral Bros Morpho Vault - 
            <span className="text-[#0b55e9] font-semibold"> Network fees paid by $DBRO Team</span>
        </p>
    </div>

    {/* Main Content */}
    <div className="flex items-center justify-center">
        <Earn vaultAddress="0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A" className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-background" isSponsored>
            <div className="w-full max-w-md">
                {/* Vault Title */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-foreground mb-2 font-orbitron mt-2">
                        Decentral Bros Morpho Vault
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-sm text-[#0b55e9]">
                        <div className="flex items-center gap-1">
                            <FaCoins className="text-[#0b55e9]" />
                            <span>High Yield</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaShieldAlt className="text-[#0b55e9]" />
                            <span>Secure</span>
                        </div>
                    </div>
                </div>

                {/* Main Card with Toggle */}
                <div className="bg-background p-2">
                    {/* Toggle Buttons */}
                    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setActiveTab('deposit')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200 font-orbitron font-semibold ${
                                activeTab === 'deposit'
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-transparent text-[#0b55e9] hover:bg-black/10'
                            }`}
                        >
                            <FaArrowDown className={activeTab === 'deposit' ? 'text-white' : 'text-[#0b55e9]'} />
                            <span>Deposit</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('withdraw')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200 font-orbitron font-semibold ${
                                activeTab === 'withdraw'
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-transparent text-[#0b55e9] hover:bg-black/10'
                            }`}
                        >
                            <FaArrowUp className={activeTab === 'withdraw' ? 'text-white' : 'text-[#0b55e9]'} />
                            <span>Withdraw</span>
                        </button>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'deposit' ? (
                        <EarnDeposit className="bg-transparent border-none p-0">
                            <EarnDetails />
                            <DepositBalance />
                            <DepositAmountInput />
                            <DepositButton />
                        </EarnDeposit>
                    ) : (
                        <EarnWithdraw className="bg-transparent border-none p-0">
                            <EarnDetails />
                            <WithdrawBalance />
                            <WithdrawAmountInput />
                            <WithdrawButton />
                        </EarnWithdraw>
                    )}
                </div>

                {/* Footer Info */}
                <div className="text-center mt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b55e9]/10 border border-[#0b55e9]/30 dark:border-[#0b55e9]/20 rounded-lg text-[#0b55e9] text-sm font-semibold">
                        <FaShieldAlt />
                        <span>Gas fees sponsored by Coinbase</span>
                    </div>
                </div>
            </div>
        </Earn>
    </div>
  </div>
  );
};

export default Morpho;