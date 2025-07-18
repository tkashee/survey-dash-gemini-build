import { useSurveyData } from "@/hooks/useSurveyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const EarningsPage = () => {
  const { surveyData } = useSurveyData();

  if (!surveyData) return null;

  const userProgress = surveyData.userProgress;

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">My Earnings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
          <CardDescription>Your total earnings from surveys</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">KSh {userProgress.totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Pending Earnings: KSh {userProgress.pendingEarnings.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsPage;
