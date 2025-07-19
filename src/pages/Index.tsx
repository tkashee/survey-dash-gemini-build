import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: DollarSign,
      title: "High Paying Surveys",
      description: "Earn up to KSh 300 per survey with our premium partners"
    },
    {
      icon: TrendingUp,
      title: "Fast Processing",
      description: "Get payments within 24-48 hours of withdrawal request"
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join 10,000+ active users earning money daily"
    },
    {
      icon: CheckCircle,
      title: "Easy Navigation",
      description: "User-friendly interface makes it simple to complete surveys"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Surveys Done", value: "50K+" },
    { label: "Paid Out", value: "2M+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SurveyEarn
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:opacity-90">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-primary text-white">
            <Star className="h-3 w-3 mr-1" />
            Trusted by 10,000+ users
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Earn From Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Valuable Opinions
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get up to Ksh 300 per survey. Free and easy to join, earn and have fun with quick payouts via M-Pesa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-6">
                Start Earning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-gradient-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How to earn money with surveys?</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to start earning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  1
                </div>
                <CardTitle>Sign up for free</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Registration takes less than 2 minutes and you can start taking surveys right away.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  2
                </div>
                <CardTitle>Answer surveys</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete surveys from our partners and earn money for each completed survey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  3
                </div>
                <CardTitle>Withdraw money</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cash out your earnings through M-Pesa or bank transfer when you reach the threshold.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Start Earning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What makes SurveyEarn stand out</h2>
            <p className="text-xl text-muted-foreground">Features that set us apart from the competition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already earning money from surveys
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SurveyEarn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;








