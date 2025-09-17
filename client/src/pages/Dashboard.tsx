import { useState } from "react";
import { Plus, TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/custom/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/custom/Card";
import ClaimCard, { Claim } from "@/components/claims/ClaimCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

// Mock data for claims
const mockClaims: Claim[] = [
  {
    id: "1",
    title: "Business Lunch Meeting",
    amount: 185.5,
    description: "Client meeting at The Capital Grille to discuss Q4 contracts",
    date: "2024-01-15",
    status: "pending",
    category: "Meals & Entertainment",
    submittedBy: "Alex Johnson",
  },
  {
    id: "2",
    title: "Office Supplies",
    amount: 89.99,
    description: "Ergonomic keyboard and mouse for development workstation",
    date: "2024-01-14",
    status: "approved",
    category: "Office Equipment",
    submittedBy: "Sarah Chen",
  },
  {
    id: "3",
    title: "Conference Travel",
    amount: 1250.0,
    description: "Flight and accommodation for TechConf 2024 in San Francisco",
    date: "2024-01-12",
    status: "paid",
    category: "Travel",
    submittedBy: "Mike Rodriguez",
  },
];

const Dashboard = () => {
  const [claims] = useState<Claim[]>(mockClaims);
  const { t } = useTranslation("dashboard");
  // Calculate stats
  const totalPending = claims.filter((c) => c.status === "pending").length;
  const totalApproved = claims.filter((c) => c.status === "approved").length;
  const totalAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const recentClaims = claims.slice(0, 3);

  const stats = [
    {
      title: t("stats.totalClaims"),
      value: claims.length.toString(),
      change: "+12%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: t("stats.pendingReview"),
      value: totalPending.toString(),
      change: "+3 today",
      icon: Clock,
      color: "text-warning",
    },
    {
      title: t("stats.approved"),
      value: totalApproved.toString(),
      change: "+5 this week",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: t("stats.totalAmount"),
      value: `$${totalAmount.toLocaleString()}`,
      change: "+8.2%",
      icon: DollarSign,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button variant="enterprise" size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          <Link to="/addclaims">{t("newClaim")}</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="card-glow transform transition-all duration-300 
             hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:z-10 
             hover:bg-primary/10 hover:border-primary cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} {t("changeFromLastMonth")}
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
              <CardTitle>{t("recentClaims")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentClaims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
              <Button variant="ghost" className="w-full">
                {t("viewAllClaims")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="primary" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4" />
                {t("submitNewClaim")}
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="w-4 h-4" />
                {t("reviewPending")}
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <TrendingUp className="w-4 h-4" />
                {t("viewReports")}
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("notifications")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Claim #1234</strong>
                  {t("claimApproved")}
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <Trans
                  i18nKey="paymentProcessed"
                  className="text-sm"
                  values={{ amount: "$89.99" }}
                  components={[<></>, <strong />]} 
                />
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
