"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { users } from "@/data/user-seeder"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Admin() {

    const [searchQuery, setSearchQuery] = useState("");
    const filteredUsers = users.filter((user) => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.id.toLowerCase().includes(searchQuery)
    );

    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                <div className="flex justify-between pt-4 pb-12">
                    <h1 className="text-3xl">Halo, Admin!</h1>
                    <div className="flex">
                        <Input placeholder="Cari pasien" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-fit me-1"/>
                        <Button size="icon"><Search/></Button>
                    </div>
                </div>
                <Table className="text-center">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">ID</TableHead>
                            <TableHead className="text-center">Nama</TableHead>
                            <TableHead className="text-center">Jenis Kelamin</TableHead>
                            <TableHead className="text-center">Tanggal Lahir</TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map(user =>
                            <TableRow key={user.id}>
                                <TableCell className="p-2">{user.id}</TableCell>
                                <TableCell className="p-2 font-medium">{user.name}</TableCell>
                                <TableCell className="p-2">{user.gender}</TableCell>
                                <TableCell className="p-2">{user.dob}</TableCell>
                                <TableCell className="p-2">
                                    <Button variant="secondary">
                                        <Link href={`/admin/${user.id}`}>Detail Pasien</Link></Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}