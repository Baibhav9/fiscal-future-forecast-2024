
import TaxCalculator from "@/components/TaxCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            2024 US Tax Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your estimated federal income tax for 2024 tax year. 
            Enter your income and filing status to get an instant estimate.
          </p>
        </div>
        <TaxCalculator />
      </div>
    </div>
  );
};

export default Index;
