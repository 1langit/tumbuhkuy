"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResponse } from "@/contexts/ResponseContext";
import { Apple, Beef, CookingPot, Donut, Droplet, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Hasil() {

    const { responseData } = useResponse();
    const [isLoading, setIsLoading] = useState(false)

    const listGizi = [
        {
            name: "Air",
            ammount: responseData.threshold.threshold["Air (ml)"],
            metric: "ml",
            icon: <Droplet />,
        },
        {
            name: "Energi",
            ammount: responseData.threshold.threshold["Energi (kal)"],
            metric: "kal",
            icon: <Zap />,
        },
        {
            name: "Karbohidrat",
            ammount: responseData.threshold.threshold["Karbohidrat (gram)"],
            metric: "gram",
            icon: <CookingPot />,
        },
        {
            name: "Lemak",
            ammount: responseData.threshold.threshold["Lemak (gram)"],
            metric: "gram",
            icon: <Donut />,
        },
        {
            name: "Protein",
            ammount: responseData.threshold.threshold["Protein (gram)"],
            metric: "gram",
            icon: <Beef />,
        },
        {
            name: "Serat",
            ammount: responseData.threshold.threshold["Serat (gram)"],
            metric: "gram",
            icon: <Apple />,
        },
    ]

    let icon: string = ""

    switch (responseData.classify.classification) {
        case "Sangat kurus":
        case "Sangat Stunting":
            icon = "poisoned-svgrepo-com.svg";
            break;
        case "Kurus":
        case "Stunting":
            icon = "poker-face-svgrepo-com.svg";
            break;
        case "Normal":
            icon = "happy-2-svgrepo-com.svg";
            break;
        case "Gemuk":
        case "Tinggi":
            icon = "sad-svgrepo-com.svg";
            break;
        case "Sangat gemuk":
            icon = "cry-svgrepo-com.svg";
            break;
    }

    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto p-4 w-full h-full">
                <div className="flex space-x-6 pt-4">
                    <Image src={icon} width={60} height={60} alt="" />
                    <div>
                        <h1 className="text-3xl mb-2">{responseData.classify.classification}</h1>
                        <p>Berikut Angka Kecukupan Gizi (AKG) harianmu</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 max-w-[600] my-10">
                    {listGizi.map((gizi, i) =>
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle className="flex">
                                    <p className="text-primary">{gizi.icon}</p>
                                    <p className="ps-2">{gizi.name}</p></CardTitle>
                            </CardHeader>
                            <CardContent className="text-xl">
                                {gizi.ammount} {gizi.metric}
                            </CardContent>
                        </Card>
                    )}
                </div>
                <Button onClick={() => setIsLoading(true)} disabled={isLoading}>
                    <Link href="/bahan">Lihat Rekomendasi Makanan</Link>
                </Button>
            </div>
        </main>
    )
}