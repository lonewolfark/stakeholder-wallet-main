import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <LineChart className="h-8 w-8 text-gold-400" />
          <h1 className="text-3xl font-bold text-white">Investments</h1>
        </div>
        <Card className="border-gold-900/30 bg-card/50">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Advanced investment tools coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
