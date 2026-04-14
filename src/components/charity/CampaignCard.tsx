import Link from "next/link";
import { Campaign } from "@/types/charity";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getPercentage, formatCurrency } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const percent = getPercentage(campaign.totalRaisedUSD, campaign.totalGoalUSD);

  return (
    <Link href={`/charity/campaign/${campaign.id}`}>
      <Card padding="none" className="overflow-hidden hover:shadow-card-dark transition-shadow duration-300 h-full">
        {/* Cover Image */}
        <div className="relative h-48 bg-surface-sage">
          {campaign.coverImage && (
            <img
              src={campaign.coverImage}
              alt={campaign.name}
              className="w-full h-full object-cover"
            />
          )}
          {campaign.featured && (
            <Badge variant="warning" className="absolute top-3 left-3">
              Featured
            </Badge>
          )}
          <Badge className="absolute top-3 right-3">{campaign.category}</Badge>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-card-title text-fg-primary line-clamp-2">{campaign.name}</h3>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-caption text-fg-muted">{campaign.charity.name}</span>
            {campaign.charity.kycVerified && (
              <span className="text-accent-primary text-micro">&#x2713;</span>
            )}
          </div>

          {/* Location */}
          {campaign.location && (
            <div className="flex items-center gap-1 mt-2 text-caption text-fg-muted">
              <MapPin className="h-3 w-3" />
              <span>{campaign.location}</span>
            </div>
          )}

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-semibold text-fg-primary">{formatCurrency(campaign.totalRaisedUSD)}</span>
              <span className="text-fg-muted">/ {formatCurrency(campaign.totalGoalUSD)}</span>
            </div>
            <ProgressBar value={percent} />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-3 text-caption text-fg-muted">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{campaign.donorCount} donors</span>
            </div>
            <span className="font-semibold text-accent-primary">{percent}%</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
