import TrendCard from "@/components/analytics/trend-card";
import UnitsDatatable from "./_components/units-datatable";

export default function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <TrendCard
                            description="Soon to expire"
                            trend="up"
                            value="12"
                            trendDescription="Units expiring in the next 7 days"
                        />
                        <TrendCard
                            description="Popular Unit"
                            trend="neutral"
                            value="g"
                            trendDescription="Most popular unit this month"
                        />
                        <TrendCard
                            description="Least Popular Unit"
                            trend="neutral"
                            value="L"
                            trendDescription="Least used unit"
                        />
                        <TrendCard
                            description="Growth"
                            trend="up"
                            value="4.5%"
                            trendDescription="Meets growth projections"
                        />
                    </div>
                    <div className="px-4 lg:px-6">
                        <UnitsDatatable />
                    </div>
                </div>
            </div>
        </div>
    );
}
