
export type FilingStatus = "single" | "marriedFilingJointly" | "marriedFilingSeparately" | "headOfHousehold";

// 2024 Tax Brackets
const TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191675, rate: 0.24 },
    { min: 191675, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  marriedFilingJointly: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383350, rate: 0.24 },
    { min: 383350, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  marriedFilingSeparately: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191675, rate: 0.24 },
    { min: 191675, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191650, rate: 0.24 },
    { min: 191650, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

// 2024 Standard Deductions
const STANDARD_DEDUCTIONS_2024 = {
  single: 14600,
  marriedFilingJointly: 29200,
  marriedFilingSeparately: 14600,
  headOfHousehold: 21900,
};

export interface TaxResult {
  grossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: string;
  marginalRate: string;
  afterTaxIncome: number;
  taxBreakdown: Array<{
    bracket: string;
    rate: number;
    taxableAmount: number;
    tax: number;
  }>;
}

export const calculateTax = (income: number, filingStatus: FilingStatus): TaxResult => {
  const standardDeduction = STANDARD_DEDUCTIONS_2024[filingStatus];
  const taxableIncome = Math.max(0, income - standardDeduction);
  const brackets = TAX_BRACKETS_2024[filingStatus];
  
  let totalTax = 0;
  let marginalRate = 0;
  const taxBreakdown: TaxResult['taxBreakdown'] = [];
  
  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      const taxForBracket = taxableInBracket * bracket.rate;
      totalTax += taxForBracket;
      marginalRate = bracket.rate;
      
      if (taxableInBracket > 0) {
        taxBreakdown.push({
          bracket: bracket.max === Infinity 
            ? `$${bracket.min.toLocaleString()}+` 
            : `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`,
          rate: bracket.rate,
          taxableAmount: taxableInBracket,
          tax: taxForBracket,
        });
      }
    }
  }
  
  const effectiveRate = income > 0 ? ((totalTax / income) * 100).toFixed(2) : "0.00";
  const afterTaxIncome = income - totalTax;
  
  return {
    grossIncome: income,
    standardDeduction,
    taxableIncome,
    totalTax,
    effectiveRate,
    marginalRate: (marginalRate * 100).toFixed(0),
    afterTaxIncome,
    taxBreakdown,
  };
};
