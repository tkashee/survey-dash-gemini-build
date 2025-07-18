import { useSurveyData } from "@/hooks/useSurveyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SurveysPage = () => {
  const { surveyData, getCurrentPlan, getAvailableSurveys, completeSurvey } = useSurveyData();
  const { toast } = useToast();

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
      return;
    }

    if (userProgress.surveysCompletedToday >= currentPlan.dailySurvey) {
      toast({
        title: "Daily Limit Reached",
        description: `You've completed your daily limit of ${currentPlan.dailySurvey} surveys.`,
        variant: "destructive"
      });
      return;
    }

    // Simulate survey completion with random time
    const timeToComplete = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    
    toast({
      title: "Survey Started",
      description: "Survey is now loading...",
    });

    setTimeout(() => {
      completeSurvey(surveyId);
      toast({
        title: "Survey Completed! 🎉",
        description: `You earned KSh ${surveyData.surveys.find(s => s.id === surveyId)?.reward}! Keep it up!`,
      });
    }, timeToComplete);
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
                  {userProgress.surveysCompletedToday >= (currentPlan?.dailySurvey || 0) ? 'Limit Reached' : 'Start Survey'}
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
