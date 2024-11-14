import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Admim() {
    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                <div className="flex justify-between pt-4 pb-12">
                    <h1 className="text-3xl">Halo, Admin!</h1>
                </div>
                <Table className="text-center">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">#</TableHead>
                            <TableHead className="text-center">Nama</TableHead>
                            <TableHead className="text-center">Jenis Kelamin</TableHead>
                            <TableHead className="text-center">Tanggal Lahir</TableHead>
                            <TableHead className="w-12 text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="p-2">1</TableCell>
                            <TableCell className="p-2 font-medium">Fufufafa</TableCell>
                            <TableCell className="p-2">Laki-laki</TableCell>
                            <TableCell className="p-2">1 Nov 2004</TableCell>
                            <TableCell className="p-2">
                                <Button variant="secondary">
                                    <Link href="/hasil">Detail Pasien</Link></Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}