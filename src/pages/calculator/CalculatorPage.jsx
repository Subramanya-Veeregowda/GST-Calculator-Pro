import React from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AmountInput } from '../../components/calculator/AmountInput';
import { GSTRateSelector } from '../../components/calculator/GSTRateSelector';
import { CalculationTypeToggle } from '../../components/calculator/CalculationTypeToggle';
import { TaxTypeSelector } from '../../components/calculator/TaxTypeSelector';
import { ResultCard } from '../../components/calculator/ResultCard';
import { useGSTCalculator } from '../../hooks/useGSTCalculator';

export default function CalculatorPage() {
  const {
    amount, setAmount,
    rate, setRate,
    mode, setMode,
    taxType, setTaxType,
    result,
    error,
    reset
  } = useGSTCalculator();

  return (
    <div className="max-w-[1024px] mx-auto space-y-6 md:space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-4">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-3">
          Calculate GST in seconds
        </h1>
        <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
          Add or extract GST on any amount. Switch between exclusive and inclusive modes for accurate results every time.
        </p>
      </motion.div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Panel: Inputs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5 space-y-6"
        >
          <Card className="space-y-6">
            <AmountInput 
              value={amount} 
              onChange={setAmount} 
              error={error}
            />
            
            <GSTRateSelector 
              value={rate} 
              onChange={setRate} 
            />
            
            <CalculationTypeToggle 
              value={mode} 
              onChange={setMode} 
            />
            
            <TaxTypeSelector 
              value={taxType} 
              onChange={setTaxType} 
            />

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {/* Note: Calculation is real-time, so Calculate button is just for show/focus on mobile, but we can make it a "Reset" or just visual CTA */}
              <Button 
                variant="primary" 
                className="w-full sm:flex-1 md:hidden"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                <Calculator /> View Result
              </Button>
              <Button 
                variant="ghost" 
                className="w-full sm:w-auto"
                onClick={reset}
              >
                <RotateCcw /> Reset
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Right Panel: Result */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 h-full"
        >
          <ResultCard result={result} />
        </motion.div>
        
      </div>
    </div>
  );
}
