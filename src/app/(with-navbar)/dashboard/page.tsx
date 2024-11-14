import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Dashboard() {
    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                <div className="flex justify-between pt-4 pb-12">
                    <h1 className="text-3xl">Halo, User!</h1>
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
                        <TableRow>
                            <TableCell className="p-2">1</TableCell>
                            <TableCell className="p-2 font-medium text-red-500">Stunting / Kurang gizi</TableCell>
                            <TableCell className="p-2">1 Nov 2024</TableCell>
                            <TableCell className="p-2">
                                <Button variant="secondary">
                                    <Link href="/hasil">Lihat detail</Link></Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="p-2">2</TableCell>
                            <TableCell className="p-2 font-medium text-green-500">Tidak stunting / Gizi cukup</TableCell>
                            <TableCell className="p-2">2 Nov 2024</TableCell>
                            <TableCell className="p-2">
                                <Button variant="secondary">
                                    <Link href="/hasil">Lihat detail</Link></Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="p-2">3</TableCell>
                            <TableCell className="p-2 font-medium text-green-500">Tidak stunting / Gizi cukup</TableCell>
                            <TableCell className="p-2">3 Nov 2024</TableCell>
                            <TableCell className="p-2">
                                <Button variant="secondary">
                                    <Link href="/hasil">Lihat detail</Link></Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}