import { Receipt, Calendar, DollarSign, MoreVertical } from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Card, CardContent, CardHeader } from "@/components/custom/Card";
import { Badge } from "@/components/custom/Badge";

export interface Claim {
  id: string;
  title: string;
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  category: string;
  submittedBy?: string;
}

interface ClaimCardProps {
  claim: Claim;
  onApprove?: (claimId: string) => void;
  onReject?: (claimId: string) => void;
  onPay?: (claimId: string) => void;
  showActions?: boolean;
  role?: string;
}

const statusConfig = {
  pending: { label: 'Pending', className: 'status-pending' },
  approved: { label: 'Approved', className: 'status-approved' },
  rejected: { label: 'Rejected', className: 'status-rejected' },
  paid: { label: 'Paid', className: 'status-paid' },
};

const ClaimCard = ({ 
  claim, 
  onApprove, 
  onReject, 
  onPay, 
  showActions = false, 
  role = 'employee' 
}: ClaimCardProps) => {
  const statusInfo = statusConfig[claim.status];

  const renderActions = () => {
    if (!showActions) return null;

    if (role === 'manager' && claim.status === 'pending') {
      return (
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="success"
            onClick={() => onApprove?.(claim.id)}
          >
            Approve
          </Button>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => onReject?.(claim.id)}
          >
            Reject
          </Button>
        </div>
      );
    }

    if (role === 'finance' && claim.status === 'approved') {
      return (
        <Button 
          size="sm" 
          variant="enterprise"
          onClick={() => onPay?.(claim.id)}
        >
          Process Payment
        </Button>
      );
    }

    return null;
  };

  return (
    <Card className="transition-smooth hover:shadow-elegant">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Receipt className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-base">{claim.title}</h3>
              <p className="text-sm text-muted-foreground">{claim.category}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={statusInfo.className}
            >
              {statusInfo.label}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{claim.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(claim.date).toLocaleDateString()}</span>
              </div>
              {claim.submittedBy && (
                <span>by {claim.submittedBy}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-lg font-semibold">
                ${claim.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {renderActions() && (
            <div className="pt-3 border-t border-border flex justify-end">
              {renderActions()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimCard;