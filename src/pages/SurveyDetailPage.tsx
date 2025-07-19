import React, { useState } from "react";
import { useSurveyData } from "@/hooks/useSurveyData";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SurveyDetailPage = () => {
  const { surveyData, completeSurvey, getCurrentPlan } = useSurveyData();
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [answers, setAnswers] = useState<{ [questionIndex: number]: string }>({});

  if (!surveyData || !surveyId) return null;

  const survey = surveyData.surveys.find((s) => s.surveyId === surveyId);
  if (!survey) {
    return <div>Survey not found</div>;
  }

  const currentPlan = getCurrentPlan();
  if (!currentPlan) {
    toast({
      title: "No Plan Selected",
      description: "Please upgrade your plan to access surveys.",
      variant: "destructive",
    });
    navigate("/plans");
    return null;
  }

  const userProgress = surveyData.userProgress;

  const handleChoiceSelect = (questionIndex: number, choice: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  };

  const handleSubmit = () => {
    // Check if user has reached daily survey limit
    if (userProgress.surveysCompletedToday >= currentPlan.dailySurvey) {
      toast({
        title: "Daily Limit Reached",
        description: `You've completed your daily limit of ${currentPlan.dailySurvey} surveys. Please upgrade your plan to continue.`,
        variant: "destructive",
      });
      navigate("/plans");
      return;
    }

    // Check if all questions are answered
    if (
      survey.surveyQuestions &&
      survey.surveyQuestions.length > 0 &&
      Object.keys(answers).length !== survey.surveyQuestions.length
    ) {
      toast({
        title: "Incomplete",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Mark survey as complete and reward user
    completeSurvey(survey.surveyId);
    toast({
      title: "Survey Completed! 🎉",
      description: `You earned KSh ${survey.surveyAmount}! Keep it up!`,
    });
    navigate("/surveys");
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">{survey.surveyCategory}</h1>
      <p className="mb-4">Reward: KSh {survey.surveyAmount}</p>
      {survey.surveyQuestions && survey.surveyQuestions.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {survey.surveyQuestions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold mb-2">{q.surveyQuestion}</p>
              {q.surveyType === 1 && q.surveyAnswers.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {q.surveyAnswers.map((choice) => (
                    <label key={choice} className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={choice}
                        checked={answers[index] === choice}
                        onChange={() => handleChoiceSelect(index, choice)}
                        className="mr-2"
                      />
                      {choice}
                    </label>
                  ))}
                </div>
              ) : q.surveyType === 2 ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={answers[index] || ""}
                  onChange={(e) => handleChoiceSelect(index, e.target.value)}
                  placeholder="Your answer"
                />
              ) : (
                <p>No answers available for this question type.</p>
              )}
            </div>
          ))}
          <Button type="submit" className="bg-gradient-primary hover:opacity-90">
            Submit Answers
          </Button>
        </form>
      ) : (
        <p>No questions available for this survey.</p>
      )}
    </div>
  );
};

export default SurveyDetailPage;
