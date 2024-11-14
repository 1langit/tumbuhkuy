"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResponse } from "@/contexts/ResponseContext";
import { Recipe } from "@/type/recipe";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SaveButton from "@/components/save-button";
import Link from "next/link";

export default function Resep() {

    const { responseData } = useResponse();
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        const recipe = responseData.map((item: any) => mapToRecipe(item))
        setRecipes(recipe)
    }, [responseData])

    return (
        <main className='w-full'>
            <div className='max-w-[1100px] mx-auto px-4 flex flex-col justify-center w-full h-full' >
                <div className="py-12">
                    <h1 className="text-3xl">Resep Tersimpan</h1>
                    {/* <p>Berdasarkan lokasi anda di sekitar Pogung</p> */}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-12">
                    {recipes.map((recipe, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <Card className="hover:bg-accent hover:text-accent-foreground hover:cursor-pointer duration-200">
                                    <CardHeader>
                                        {/* <Image src={food.imageSrc} alt={food.title} className="h-60 pb-4 object-cover" /> */}
                                        <CardTitle>{recipe.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Badge className="capitalize">{recipe.category}</Badge>
                                        <p className="flex font-medium mt-8">Bahan Baku</p>
                                        {recipe.ingridients.map((ing, i) =>
                                            <span key={i}>{ing}{i !== recipe.ingridients.length - 1 && ";"} </span>
                                        )}
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl mb-1">{recipe.name}</DialogTitle>
                                    <Badge className="capitalize w-fit">{recipe.category}</Badge>
                                </DialogHeader>
                                <div>
                                    <p className="font-medium mt-4">Bahan Baku</p>
                                    <ul>
                                        {recipe.ingridients.map((ing, i) =>
                                            <li key={i}>- {ing}</li>
                                        )}
                                    </ul>
                                    <p className="font-medium mt-4">Alat Masak</p>
                                    <ul>
                                        {recipe.utensils.map((uts, i) =>
                                            <li key={i}>- {uts}</li>
                                        )}
                                    </ul>
                                    <p className="font-medium mt-4">Langkah Pembuatan</p>
                                    <ol className="list-decimal ps-4">
                                        {recipe.steps.map((st, i) =>
                                            <li key={i}>{st}</li>
                                        )}
                                    </ol>
                                </div>
                                <DialogFooter className="sm:justify-between pt-2">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Tutup
                                        </Button>
                                    </DialogClose>
                                    <SaveButton/>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
                {/* <Button variant="secondary" className="w-fit ms-auto">
                    <Link href="/dashboard">Kembali ke Beranda</Link>
                </Button> */}
            </div>
        </main>
    )
}

function mapToRecipe(apiData: any): Recipe {
    return {
        name: apiData.nama_resep,
        category: apiData.kategori,
        utensils: apiData.alat,
        ingridients: apiData.bahan_baku,
        steps: apiData.langkah_pembuatan,
    };
}