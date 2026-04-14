import { Donation } from "@/types/charity";
import { formatAddress, formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface DonationFeedProps {
  donations: Donation[];
}

export function DonationFeed({ donations }: DonationFeedProps) {
  return (
    <div className="space-y-3">
      {donations.map((donation) => (
        <div
          key={donation.id}
          className="flex items-center justify-between py-3 px-4 bg-surface-secondary rounded-xl border border-black/[0.04]"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-accent-light flex items-center justify-center">
              <span className="text-accent-primary text-micro font-bold">
                {donation.tokenSymbol[0]}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-fg-primary font-mono">
                {formatAddress(donation.donorAddress)}
              </span>
              <Badge size="sm" className="ml-2">{donation.tokenSymbol}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-fg-primary">
              {parseFloat(donation.amount) > 1e15
                ? `${(parseFloat(donation.amount) / 1e18).toFixed(1)} ${donation.tokenSymbol}`
                : `${(parseFloat(donation.amount) / 1e9).toLocaleString()} ${donation.tokenSymbol}`}
            </p>
            <p className="text-caption text-fg-muted">{formatRelativeTime(donation.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
