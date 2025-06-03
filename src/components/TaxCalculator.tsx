
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import TaxBreakdown from "./TaxBreakdown";
import { calculateTax, FilingStatus } from "@/utils/taxCalculations";

const TaxCalculator = () => {
  const [income, setIncome] = useState<string>("");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [taxResult, setTaxResult] = useState<any>(null);

  useEffect(() => {
    const numericIncome = parseFloat(income) || 0;
    if (numericIncome > 0) {
      const result = calculateTax(numericIncome, filingStatus);
      setTaxResult(result);
    } else {
      setTaxResult(null);
    }
  }, [income, filingStatus]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setIncome(value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-yellow-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Calculator className="w-8 h-8" />
            Tax Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="income" className="text-lg font-semibold text-gray-700">
                  Annual Income
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <Input
                    id="income"
                    type="text"
                    placeholder="75,000"
                    value={income}
                    onChange={handleIncomeChange}
                    className="pl-8 text-lg h-12 border-2 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filing-status" className="text-lg font-semibold text-gray-700">
                  Filing Status
                </Label>
                <Select value={filingStatus} onValueChange={(value: FilingStatus) => setFilingStatus(value)}>
                  <SelectTrigger className="h-12 text-lg border-2 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="marriedFilingJointly">Married Filing Jointly</SelectItem>
                    <SelectItem value="marriedFilingSeparately">Married Filing Separately</SelectItem>
                    <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {taxResult && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2">
                  Tax Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Gross Income:</span>
                    <span className="text-lg font-bold text-blue-700">
                      {formatCurrency(taxResult.grossIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Standard Deduction:</span>
                    <span className="text-lg font-bold text-green-700">
                      {formatCurrency(taxResult.standardDeduction)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Taxable Income:</span>
                    <span className="text-lg font-bold text-gray-700">
                      {formatCurrency(taxResult.taxableIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-100 to-red-50 rounded-lg border-l-4 border-red-400">
                    <span className="font-bold text-gray-800 text-lg">Federal Tax Owed:</span>
                    <span className="text-2xl font-bold text-red-700">
                      {formatCurrency(taxResult.totalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
                    <span className="font-semibold text-gray-700">Effective Tax Rate:</span>
                    <span className="text-lg font-bold text-blue-700">
                      {taxResult.effectiveRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg">
                    <span className="font-semibold text-gray-700">After-Tax Income:</span>
                    <span className="text-lg font-bold text-green-700">
                      {formatCurrency(taxResult.afterTaxIncome)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {taxResult && <TaxBreakdown taxResult={taxResult} />}
    </div>
  );
};

export default TaxCalculator;
