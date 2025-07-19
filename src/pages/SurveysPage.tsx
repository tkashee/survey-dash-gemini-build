import { useSurveyData } from "@/hooks/useSurveyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SurveysPage = () => {
  const { surveyData, getCurrentPlan, getAvailableSurveys, completeSurvey } = useSurveyData();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!surveyData) return null;

  const currentPlan = getCurrentPlan();
  const availableSurveys = getAvailableSurveys();
  const userProgress = surveyData.userProgress;

  const handleStartSurvey = (surveyId: string) => {
    if (!currentPlan) {
      toast({
        title: "No Plan Selected",
        description: "Please upgrade your plan to access surveys.",
        variant: "destructive"
      });
      navigate("/plans");
      return;
    }

    if (userProgress.surveysCompletedToday >= currentPlan.dailySurvey) {
      toast({
        title: "Daily Limit Reached",
        description: `You've completed your daily limit of ${currentPlan.dailySurvey} surveys. Please upgrade your plan to continue.`,
        variant: "destructive"
      });
      navigate("/plans");
      return;
    }

    navigate(`/survey/${surveyId}`);
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Available Surveys</h1>
      {availableSurveys.length === 0 ? (
        <p className="text-muted-foreground">
          {userProgress.surveysCompletedToday >= (currentPlan?.dailySurvey || 0) 
            ? "You've completed all surveys for today! Come back tomorrow." 
            : "No surveys available for your current plan. Consider upgrading!"}
        </p>
      ) : (
        availableSurveys.map((survey) => (
          <Card key={survey.id} className="mb-4">
            <CardHeader>
              <CardTitle>{survey.title}</CardTitle>
              <CardDescription>{survey.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p>Duration: {survey.duration}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{survey.category}</Badge>
                  <Badge variant={survey.difficulty === "Easy" ? "default" : "secondary"}>
                    {survey.difficulty}
                  </Badge>
                  <Badge variant="outline">Requires {survey.requiredPlan}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">KSh {survey.reward}</p>
                <Button 
                  size="sm" 
                  className="bg-gradient-primary hover:opacity-90 mt-2"
                  onClick={() => handleStartSurvey(survey.id)}
                  disabled={userProgress.surveysCompletedToday >= (currentPlan?.dailySurvey || 0)}
                >
                  {userProgress.surveysCompletedToday >= (currentPlan?.dailySurvey || 0) ? 'Limit Reached - Upgrade Plan' : 'Start Survey'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SurveysPage;
