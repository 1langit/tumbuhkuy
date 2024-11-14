"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { data } from "@/data/stunt-seeder"

export default function Dashboard() {

    const chartData = data.map((item) => ({
        date: item.date,
        weight: item.weight,
        height: item.height,
    }));

    const chartConfig = {
        weight: {
            label: "Berat",
            color: "hsl(var(--chart-1))",
        },
        height: {
            label: "Tinggi",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    return (
        <main className="w-full">
            <div className="max-w-[1200px] mx-auto p-4 flex w-full h-full gap-8">
                <div className="w-full">
                    <div className="flex justify-between pt-4 pb-12">
                        <h1 className="text-3xl">Halo, Annisa Rahma!</h1>
                        <Button>
                            <Link href="/cek">Cek Stunting</Link>
                        </Button>
                    </div>
                    <Table className="text-center">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] text-center">#</TableHead>
                                <TableHead className="text-center">Pengecekan</TableHead>
                                <TableHead className="text-center">Tanggal</TableHead>
                                <TableHead className="text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((entry, index) =>
                                <TableRow key={index}>
                                    <TableCell className="p-2">{index + 1}</TableCell>
                                    <TableCell className={`p-2 font-medium ${entry.status.includes("Stunting") ? "text-red-500" : "text-green-500"}`}>
                                        {entry.status}
                                    </TableCell>
                                    <TableCell className="p-2">{entry.date}</TableCell>
                                    <TableCell className="p-2">
                                        <Link href="/hasil">
                                            <Button variant="secondary">
                                                Lihat detail
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="w-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Tinggi & Berat Badan</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}