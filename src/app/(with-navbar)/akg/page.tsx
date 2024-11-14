import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { akgChild, akgMale, akgFemale } from "@/data/akg-table";

export default function Akg() {
    const akgName = ["AKG Bayi/Anak", "AKG Laki-laki", "AKG Perempuan"]
    const akgTable = [akgChild, akgMale, akgFemale]
    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto px-4 py-12 flex flex-col justify-center w-full h-full">
                <h1 className="text-3xl pb-2">Informasi Angka Kecukupan Gizi</h1>
                <p>Menurut Peraturan Menteri kesehatan RI No. 28 Tahun 2019 tentang Angka Kecukupan Gizi yang<br />dianjurkan untuk masyarakat Indonesia</p>
                {akgTable.map((akg, index) => (
                    <div key={index}>
                        <h3 className="text-xl text-primary mt-12 mb-4 ms-2">{akgName[index]}</h3>
                        <hr/>
                        <Table className="text-center">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Kelompok Umur</TableHead>
                                    <TableHead className="text-center">Berat Badan (kg)</TableHead>
                                    <TableHead className="text-center">Tinggi Badan (cm)</TableHead>
                                    <TableHead className="text-center">Energi (kkal)</TableHead>
                                    <TableHead className="text-center">Lemak Total (g)</TableHead>
                                    <TableHead className="text-center">Karbohidrat (g)</TableHead>
                                    <TableHead className="text-center">Natrium (mg)</TableHead>
                                    <TableHead className="text-center">Serat (g)</TableHead>
                                    <TableHead className="text-center">Air (ml)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {akg.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.ageGroup}</TableCell>
                                        <TableCell>{row.weight}</TableCell>
                                        <TableCell>{row.height}</TableCell>
                                        <TableCell>{row.energy}</TableCell>
                                        <TableCell>{row.totalFat}</TableCell>
                                        <TableCell>{row.carbohydrate}</TableCell>
                                        <TableCell>{row.natrium}</TableCell>
                                        <TableCell>{row.fiber}</TableCell>
                                        <TableCell>{row.water}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ))}
            </div>
        </main>
    )
}