import { useState, useEffect } from 'react';

export interface SurveyPlan {
  planName: string;
  dailySurvey: number;
  monthlyIncome: number;
  dailyIncome: number;
  minimumWithdrawal: number;
  earningPerSurvey: string;
  price: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string | null;
}

export interface Survey {
  id: string;
  title: string;
  reward: number;
  duration: string;
  category: string;
  difficulty: string;
  status: string;
  description: string;
  requiredPlan: string;
  questions?: SurveyQuestion[];
}

export interface UserProgress {
  currentPlan: string;
  surveysCompletedToday: number;
  totalEarnings: number;
  pendingEarnings: number;
  completedSurveys: string[];
  referrals: {
    totalReferrals: number;
    referralEarnings: number;
    referralCode: string;
  };
}

export interface PlanData {
  visibility: boolean;
  surveyPlans: SurveyPlan[];
  mpesaPaymentDetails: {
    tillName: string;
    tillNumber: number;
  };
  moneyMaking: any[];
}

export interface SurveyData {
  surveys: Survey[];
  userProgress: UserProgress;
}

export const useSurveyData = () => {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planResponse, surveyResponse] = await Promise.all([
          fetch('/data/plan.json'),
          fetch('/data/survey.json')
        ]);
        
        const planData = await planResponse.json();

        // Load surveyData from localStorage if available
        const storedSurveyData = localStorage.getItem('surveyData');
        let surveyData;
        if (storedSurveyData) {
          surveyData = JSON.parse(storedSurveyData);
        } else {
          surveyData = await surveyResponse.json();
        }
        
        setPlanData(planData);
        setSurveyData(surveyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const getCurrentPlan = () => {
    if (!planData || !surveyData) return null;
    return planData.surveyPlans.find(
      plan => plan.planName === surveyData.userProgress.currentPlan
    );
  };


  const getAvailableSurveys = () => {
    if (!surveyData || !planData) return [];
    
    const currentPlan = getCurrentPlan();
    if (!currentPlan) return [];

    const planHierarchy = ['Starter', 'Silver', 'Gold', 'Platinum'];
    const currentPlanIndex = planHierarchy.indexOf(currentPlan.planName);
    
    // Return all surveys that user is eligible for regardless of daily limit
    return surveyData.surveys.filter(survey => {
      const requiredPlanIndex = planHierarchy.indexOf(survey.requiredPlan);
      return requiredPlanIndex <= currentPlanIndex;
    });
  };


  const completeSurvey = (surveyId: string) => {
    if (!surveyData) return;
    
    const survey = surveyData.surveys.find(s => s.id === surveyId);
    if (!survey) return;

    setSurveyData(prev => {
      if (!prev) return null;
      
      const updatedSurveyData = {
        ...prev,
        userProgress: {
          ...prev.userProgress,
          surveysCompletedToday: prev.userProgress.surveysCompletedToday + 1,
          totalEarnings: prev.userProgress.totalEarnings + survey.reward,
          pendingEarnings: prev.userProgress.pendingEarnings + survey.reward,
          completedSurveys: [...prev.userProgress.completedSurveys, surveyId]
        }
      };

      // Save updated surveyData to localStorage
      localStorage.setItem('surveyData', JSON.stringify(updatedSurveyData));

      return updatedSurveyData;
    });
  };

  return {
    planData,
    surveyData,
    loading,
    getCurrentPlan,
    getAvailableSurveys,
    completeSurvey
  };
};