import { CircleUserRound } from "lucide-react";
import { users } from "@/data/user-seeder"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { data } from "@/data/stunt-seeder"
import ChartLine from "@/components/chart-line";
import { ChartConfig } from "@/components/ui/chart"

export default async function UserProfile({ params }: { params: { userId: string } }) {

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

    const { userId } = await params
    const user = users.find(user => user.id === userId)

    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto p-6 flex gap-8 w-full h-full">
                <div className="space-y-4 h-full">
                    <Card>
                        <CardHeader className="flex-row space-x-4">
                            <CircleUserRound size={60} strokeWidth={1.25} className="text-gray-300 mb-2" />
                            <div>
                                <h3 className="text-xl font-medium leading-none">{user?.name}</h3>
                                <p className="">{user?.email}</p>
                                <p className="text-muted-foreground text-sm">ID: {user?.id}</p>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                <p className="font-medium">{user?.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                                <p className="font-medium">{user?.dob}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Riwayat Kesehatan</p>
                                <p className="font-medium capitalize">{user?.healthHistory}</p>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="w-80">
                        <CardHeader>
                            <CardTitle className="text-xl">Tinggi & Berat Badan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartLine chartConfig={chartConfig} chartData={chartData} />
                        </CardContent>
                    </Card>
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
                                    <Button variant="secondary">
                                        Lihat detail
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}