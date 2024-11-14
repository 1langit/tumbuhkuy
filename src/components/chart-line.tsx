"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartLineProps {
    chartConfig: ChartConfig,
    chartData: any[],
}

export default function ChartLine({ chartConfig, chartData}: ChartLineProps) {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                    dataKey="weight"
                    type="monotone"
                    stroke="var(--color-weight)"
                    strokeWidth={2}
                    dot={{
                        fill: "var(--color-weight)",
                    }}
                />
                <Line
                    dataKey="height"
                    type="monotone"
                    stroke="var(--color-height)"
                    strokeWidth={2}
                    dot={{
                        fill: "var(--color-height)",
                    }}
                />
            </LineChart>
        </ChartContainer>
    )
}