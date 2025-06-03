
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { TaxResult } from "@/utils/taxCalculations";

interface TaxBreakdownProps {
  taxResult: TaxResult;
}

const TaxBreakdown = ({ taxResult }: TaxBreakdownProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(0)}%`;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Receipt className="w-8 h-8" />
          Tax Breakdown by Bracket
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Marginal Tax Rate</p>
              <p className="text-2xl font-bold text-blue-700">{taxResult.marginalRate}%</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-green-700">{taxResult.effectiveRate}%</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Total Tax Brackets</p>
              <p className="text-2xl font-bold text-purple-700">{taxResult.taxBreakdown.length}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-700 border-b">Tax Bracket</th>
                  <th className="text-center p-4 font-semibold text-gray-700 border-b">Rate</th>
                  <th className="text-right p-4 font-semibold text-gray-700 border-b">Taxable Amount</th>
                  <th className="text-right p-4 font-semibold text-gray-700 border-b">Tax Owed</th>
                </tr>
              </thead>
              <tbody>
                {taxResult.taxBreakdown.map((bracket, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b font-medium text-gray-800">
                      {bracket.bracket}
                    </td>
                    <td className="p-4 border-b text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPercentage(bracket.rate)}
                      </span>
                    </td>
                    <td className="p-4 border-b text-right font-medium text-gray-700">
                      {formatCurrency(bracket.taxableAmount)}
                    </td>
                    <td className="p-4 border-b text-right font-bold text-red-700">
                      {formatCurrency(bracket.tax)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-red-50 font-bold">
                  <td className="p-4 border-t-2 border-red-200 text-gray-800">Total</td>
                  <td className="p-4 border-t-2 border-red-200"></td>
                  <td className="p-4 border-t-2 border-red-200 text-right text-gray-800">
                    {formatCurrency(taxResult.taxableIncome)}
                  </td>
                  <td className="p-4 border-t-2 border-red-200 text-right text-red-700 text-lg">
                    {formatCurrency(taxResult.totalTax)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-2">Important Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• This calculator provides estimates for federal income tax only</li>
              <li>• State taxes, FICA taxes (Social Security/Medicare), and other deductions are not included</li>
              <li>• Based on 2024 tax brackets and standard deduction amounts</li>
              <li>• Consult a tax professional for comprehensive tax planning</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxBreakdown;
