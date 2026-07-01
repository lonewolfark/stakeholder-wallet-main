import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function TreasuryPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-gold-400" />
          <h1 className="text-3xl font-bold text-white">Community Treasury</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-gold-900/30 bg-card/50">
            <CardHeader>
              <CardTitle className="text-white">Treasury Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed treasury management coming soon.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
