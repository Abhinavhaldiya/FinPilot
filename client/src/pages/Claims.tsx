import { useState } from "react";
import { Plus, Filter, Search, Download } from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/custom/Select";
import ClaimCard, { Claim } from "@/components/claims/ClaimCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Mock data for claims
const mockClaims: Claim[] = [
  {
    id: '1',
    title: 'Business Lunch Meeting',
    amount: 185.50,
    description: 'Client meeting at The Capital Grille to discuss Q4 contracts',
    date: '2024-01-15',
    status: 'pending',
    category: 'Meals & Entertainment'
  },
  {
    id: '2',
    title: 'Office Supplies',
    amount: 89.99,
    description: 'Ergonomic keyboard and mouse for development workstation',
    date: '2024-01-14',
    status: 'approved',
    category: 'Office Equipment'
  },
  {
    id: '3',
    title: 'Conference Travel',
    amount: 1250.00,
    description: 'Flight and accommodation for TechConf 2024 in San Francisco',
    date: '2024-01-12',
    status: 'paid',
    category: 'Travel'
  },
  {
    id: '4',
    title: 'Client Dinner',
    amount: 320.75,
    description: 'Dinner with potential enterprise client team',
    date: '2024-01-10',
    status: 'rejected',
    category: 'Meals & Entertainment'
  },
  {
    id: '5',
    title: 'Software License',
    amount: 599.00,
    description: 'Annual Figma professional license for design team',
    date: '2024-01-08',
    status: 'approved',
    category: 'Software'
  }
];

const Claims = () => {
  const {t} = useTranslation("claims");

  const [claims] = useState<Claim[]>(mockClaims);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter claims based on search and filters
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || claim.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(claims.map(claim => claim.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button> */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              const csvContent = [
                ["ID", "Title", "Amount", "Description", "Date", "Status", "Category"],
                ...filteredClaims.map(claim => [
                  claim.id,
                  claim.title,
                  claim.amount,
                  claim.description,
                  claim.date,
                  claim.status,
                  claim.category
                ])
              ]
                .map(row => row.join(","))
                .join("\n");

              const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "claims.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download className="w-4 h-4" />
            {t("export")}
          </Button>

          <Button variant="enterprise" className="gap-2">
            <Plus className="w-4 h-4" />
            <Link to="/addclaims">{t("newClaim")}</Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t("filter.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.allStatuses")}</SelectItem>
            <SelectItem value="pending">{t("filter.pending")}</SelectItem>
            <SelectItem value="approved">{t("filter.approved")}</SelectItem>
            <SelectItem value="rejected">{t("filter.rejected")}</SelectItem>
            <SelectItem value="paid">{t("filter.paid")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t("filter.category")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.allCategories")}</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Claims Grid */}
      <div className="grid gap-4">
        {filteredClaims.length > 0 ? (
          filteredClaims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("noClaims")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("emptyMessage")}
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }}>
              {t("clearFilters")}
            </Button>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredClaims.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {filteredClaims.length}
            </div>
            <div className="text-sm text-muted-foreground">{t("totalClaims")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {filteredClaims.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">{t("pending")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {filteredClaims.filter(c => c.status === 'approved' || c.status === 'paid').length}
            </div>
            <div className="text-sm text-muted-foreground">{t("approved")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              ${filteredClaims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{t("totalValue")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Claims;