import { useState } from "react";
import { Plus, TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/custom/Card";
import ClaimCard, { Claim } from "@/components/claims/ClaimCard";

// Mock data for claims
const mockClaims: Claim[] = [
  {
    id: '1',
    title: 'Business Lunch Meeting',
    amount: 185.50,
    description: 'Client meeting at The Capital Grille to discuss Q4 contracts',
    date: '2024-01-15',
    status: 'pending',
    category: 'Meals & Entertainment',
    submittedBy: 'Alex Johnson'
  },
  {
    id: '2',
    title: 'Office Supplies',
    amount: 89.99,
    description: 'Ergonomic keyboard and mouse for development workstation',
    date: '2024-01-14',
    status: 'approved',
    category: 'Office Equipment',
    submittedBy: 'Sarah Chen'
  },
  {
    id: '3',
    title: 'Conference Travel',
    amount: 1250.00,
    description: 'Flight and accommodation for TechConf 2024 in San Francisco',
    date: '2024-01-12',
    status: 'paid',
    category: 'Travel',
    submittedBy: 'Mike Rodriguez'
  }
];

const Dashboard = () => {
  const [claims] = useState<Claim[]>(mockClaims);

  // Calculate stats
  const totalPending = claims.filter(c => c.status === 'pending').length;
  const totalApproved = claims.filter(c => c.status === 'approved').length;
  const totalAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const recentClaims = claims.slice(0, 3);

  const stats = [
    {
      title: "Total Claims",
      value: claims.length.toString(),
      change: "+12%",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "Pending Review",
      value: totalPending.toString(),
      change: "+3 today",
      icon: Clock,
      color: "text-warning"
    },
    {
      title: "Approved",
      value: totalApproved.toString(),
      change: "+5 this week",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Total Amount",
      value: `$${totalAmount.toLocaleString()}`,
      change: "+8.2%",
      icon: DollarSign,
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your expense claims and approvals
          </p>
        </div>
        <Button variant="enterprise" size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Claim
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Claims */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentClaims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
              <Button variant="ghost" className="w-full">
                View All Claims
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="primary" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4" />
                Submit New Claim
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="w-4 h-4" />
                Review Pending
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <TrendingUp className="w-4 h-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Claim #1234</strong> has been approved
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  Payment of <strong>$89.99</strong> processed
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;