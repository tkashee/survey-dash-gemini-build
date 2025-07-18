import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  FileText, 
  Settings, 
  Star,
  TrendingUp,
  Award,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Earnings",
      value: "KSh 4,250",
      change: "+12%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Surveys Completed",
      value: "47",
      change: "+8",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Success Rate",
      value: "89%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      title: "Next Payout",
      value: "3 days",
      change: "KSh 1,200",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const availableSurveys = [
    {
      title: "Consumer Shopping Habits",
      reward: "KSh 120",
      duration: "8 minutes",
      category: "Shopping",
      difficulty: "Easy"
    },
    {
      title: "Technology Usage Survey",
      reward: "KSh 200",
      duration: "12 minutes", 
      category: "Technology",
      difficulty: "Medium"
    },
    {
      title: "Food Preferences Study",
      reward: "KSh 90",
      duration: "5 minutes",
      category: "Food & Drinks",
      difficulty: "Easy"
    }
  ];

  const recentActivity = [
    {
      survey: "Brand Awareness Survey",
      amount: "KSh 150",
      status: "Completed",
      time: "2 hours ago"
    },
    {
      survey: "Mobile App Usage",
      amount: "KSh 100",
      status: "Completed", 
      time: "5 hours ago"
    },
    {
      survey: "Market Research Survey",
      amount: "KSh 250",
      status: "Pending Review",
      time: "1 day ago"
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome back, Sarah!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's your survey dashboard overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-success mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Surveys */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  Available Surveys
                </CardTitle>
                <CardDescription>
                  Complete surveys to earn money
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableSurveys.map((survey, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">{survey.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>⏱️ {survey.duration}</span>
                        <Badge variant="secondary">{survey.category}</Badge>
                        <Badge variant={survey.difficulty === "Easy" ? "default" : "secondary"}>
                          {survey.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-primary">{survey.reward}</div>
                      </div>
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                        Start Survey
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest surveys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.survey}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={activity.status === "Completed" ? "default" : "secondary"} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-success">{activity.amount}</span>
                    </div>
                    {index < recentActivity.length - 1 && <hr className="border-border" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress to next payout */}
            <Card className="shadow-soft mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Next Payout Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>KSh 1,200 / KSh 1,500</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Complete 2 more surveys to reach minimum payout
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;