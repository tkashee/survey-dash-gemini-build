import PlanUpgrade from "@/components/PlanUpgrade";
import Sidebar from "@/components/Sidebar";

const PlansPage = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        <PlanUpgrade />
      </main>
    </div>
  );
};

export default PlansPage;