import React from "react";
import { TrendingUp, TrendingDown, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function TrendCard({
    description,
    trend,
    value,
    trendDescription,
}: {
    description: string;
    trend: "up" | "down" | "neutral";
    value: string;
    trendDescription: string;
}) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
                <CardAction>
                    <Badge variant="outline">
                        {trend === "up" ? (
                            <TrendingUp />
                        ) : trend === "down" ? (
                            <TrendingDown />
                        ) : (
                            <MoveRight />
                        )}
                        +12.5%
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {trend === "up" && "Trending up this month " && (
                        <TrendingUp className="size-4" />
                    )}
                    {trend === "down" && "Trending down this month" && (
                        <TrendingDown className="size-4" />
                    )}
                    {trend === "neutral" && "Trending neutral this month" && (
                        <MoveRight className="size-4" />
                    )}
                </div>
                <div className="text-muted-foreground">{trendDescription}</div>
            </CardFooter>
        </Card>
    );
}
