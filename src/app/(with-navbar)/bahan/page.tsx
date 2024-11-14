"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ingredientTypes } from "@/data/ingredient-type-list";
import { Info, Sparkles, Trash2 } from "lucide-react";
import IngredientPicker from "@/components/ingridient-picker";
import { useIngredientManager } from "@/hooks/use-ingridient-manager";
import { Ingredient } from "@/type/ingredient";
import { useResponse } from "@/contexts/ResponseContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OptimizedIngredient } from "@/type/optimized-ingredient";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export default function Bahan() {

    const router = useRouter()
    const { responseData, setResponseData } = useResponse();

    const { selectedIngredients, addIngredient, removeIngredient, calculateTotals, isNutritionSufficient } = useIngredientManager();

    const [treshold, setTreshold] = useState<Ingredient>({
        category: "",
        name: "Target",
        water: 0,
        // energy: 0,
        // protein: 0,
        // fat: 0,
        // carbohydrate: 0,
        // fiber: 0,
        energy: responseData?.threshold?.threshold?.["Energi (kal)"] ?? 0,
        protein: responseData?.threshold?.threshold?.["Karbohidrat (gram)"] ?? 0,
        fat: responseData?.threshold?.threshold?.["Lemak (gram)"] ?? 0,
        carbohydrate: responseData?.threshold?.threshold?.["Protein (gram)"] ?? 0,
        fiber: responseData?.threshold?.threshold?.["Serat (gram)"] ?? 0,
        price: 100000,
    })

    const totals = calculateTotals();
    const isSufficient = isNutritionSufficient(treshold);
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(true);
    const [recommendation, setRecommendation] = useState<OptimizedIngredient>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        api.get("/ingredients")
            .then(res => {
                const mappedIngredients = res.data.map((item: any) => mapToIngredient(item))
                setIngredients(mappedIngredients)
                console.log(res)
                console.log(mappedIngredients)
            })
            .catch(err => console.log(err))
    }, [])

    const getRecommendation = () => {
        api.post("/optimized_ingredients",
            {
                "is_female": true,
                "year_age": 4,
                "mode": "stunting",
                "massa_tubuh": 20,
                "max_price": treshold.price
            }
        ).then(res => {
            console.log(res.data.optimized)
            setRecommendation(res.data.optimized)
        })
            .catch(err => console.log(err))
    }

    const FormSchema = z.object({
        ingredients: z.string().array(),
        year_age: z.number(),
        month_age: z.number(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ingredients: [],
            year_age: 4,
            month_age: 0,
        },
    })

    const chartData = [
        { nutrition: "Air (ml)", minimum: recommendation?.user_threshold["Air (ml)"], optimum: recommendation?.optim_total_nutrition["Air (ml)"] },
        { nutrition: "Energi (kal)", minimum: recommendation?.user_threshold["Energi (kal)"], optimum: recommendation?.optim_total_nutrition["Energi (kal)"] },
        { nutrition: "Protein (gram)", minimum: recommendation?.user_threshold["Protein (gram)"], optimum: recommendation?.optim_total_nutrition["Protein (gram)"] },
        { nutrition: "Lemak (gram)", minimum: recommendation?.user_threshold["Lemak (gram)"], optimum: recommendation?.optim_total_nutrition["Lemak (gram)"] },
        { nutrition: "Karbohidrat (gram)", minimum: recommendation?.user_threshold["Karbohidrat (gram)"], optimum: recommendation?.optim_total_nutrition["Karbohidrat (gram)"] },
        { nutrition: "Serat (gram)", minimum: recommendation?.user_threshold["Serat (gram)"], optimum: recommendation?.optim_total_nutrition["Serat (gram)"] },
    ]

    const chartConfig = {
        minimum: {
            label: "Nutrisi makanan pokok",
            color: "hsl(var(--chart-2))",
        },
        optimum: {
            label: "Nutrisi jajanan",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    function onSubmitPick(data: z.infer<typeof FormSchema>) {
        setIsLoading(true)
        data.ingredients = selectedIngredients.map(item => item.ingredient.name)
        console.log(data)
        api.post("/recipes/ingredients", data)
            .then(res => {
                console.log(res.data)
                setResponseData(res.data)
                router.push("/resep")
            }).catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    
    function onSubmitRecommend(data: z.infer<typeof FormSchema>) {
        setIsLoading(true)
        data.ingredients = recommendation?.optimized_ingredients ?? []
        console.log(data)
        api.post("/recipes/ingredients", data)
            .then(res => {
                console.log(res.data)
                setResponseData(res.data)
                router.push("/resep")
            }).catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    return (
        <main className="w-full">
            <div className="max-w-[1100px] mx-auto px-4 flex flex-col justify-center w-full h-full">
                <div className="py-8">
                    <h1 className="text-3xl">Pilih Bahan Makanan</h1>
                    <p>Kamu dapat memilih bahan yang sudah dioptimasi oleh AI atau menentukan bahan sesuai keinginan</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Lihat Rekomendasi AI</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex">
                                        Rekomendasi AI <Sparkles className="ms-2 text-primary" />
                                    </CardTitle>
                                    <CardDescription>Berikut nilai gizi serta bahan makanan optimal yang direkomendasikan oleh AI</CardDescription>
                                </CardHeader>
                                <CardContent className="flex">
                                    <ChartContainer config={chartConfig} className="w-full">
                                        <BarChart accessibilityLayer data={chartData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="nutrition"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                            <ChartLegend content={<ChartLegendContent />} />
                                            <Bar
                                                dataKey="minimum"
                                                stackId="a"
                                                fill="var(--color-minimum)"
                                                radius={[0, 0, 4, 4]}
                                            />
                                            <Bar
                                                dataKey="optimum"
                                                stackId="a"
                                                fill="var(--color-optimum)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                    <Card className="hidden sm:inline text-sm bg-muted">
                                        <CardHeader className="space-y-4">
                                            <div className="text-muted-foreground">
                                                Bahan yang direkomendasikan:
                                            </div>
                                            <ol className="font-medium list-decimal ps-4">
                                                {recommendation?.optimized_ingredients.map((ing, i) =>
                                                    <li key={i}>{ing}</li>
                                                )}
                                            </ol>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmitRecommend)} className="w-full">
                                                    <Button type="submit" disabled={isLoading} className="w-full">Pilih Resep</Button>
                                                </form>
                                            </Form>
                                        </CardHeader>
                                    </Card>
                                </CardContent>
                                <CardFooter className="flex sm:hidden">
                                    <Card className="w-full">
                                        <CardHeader className="space-y-2 text-sm">
                                            <div className="leading-none text-muted-foreground">
                                                Bahan yang direkomendasikan:
                                            </div>
                                            <div className="font-medium">
                                                {recommendation?.optimized_ingredients.map((ing, i) =>
                                                    <span key={i}>{ing}{i !== recommendation?.optimized_ingredients.length - 1 && ";"} </span>
                                                )}
                                            </div>
                                            <br />
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmitRecommend)} className="w-full">
                                                    <Button type="submit" disabled={isLoading} className="w-full">Pilih Resep</Button>
                                                </form>
                                            </Form>
                                        </CardHeader>
                                    </Card>
                                </CardFooter>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Pilih Sesuai Keinginan</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Pilih Bahan Makananmu Sendiri</CardTitle>
                                        <p>Pilih beberapa bahan makanan hingga mencapai kadar gizi yang diperlukan</p>
                                    </CardHeader>
                                </Card>
                                {ingredientTypes.map(ingredientType => {

                                    const filteredSelectedIngredients = selectedIngredients.filter(
                                        (selected) => selected.ingredient.category === ingredientType.name
                                    )

                                    const filteredIngredients = ingredients.filter(
                                        (ingredient) => ingredient.category === ingredientType.name
                                    )

                                    return (
                                        <Card key={ingredientType.key}>
                                            <CardHeader className="flex flex-row justify-between items-center">
                                                {/* <Image src={food.imageSrc} alt={food.title} className="h-60 pb-4 object-cover" /> */}
                                                <CardTitle className="text-primary">{ingredientType.name}</CardTitle>
                                                <div className="flex items-center">
                                                    <p className="text-sm text-muted-foreground pe-4">
                                                        {filteredSelectedIngredients.length === 0 ? "Belum ada bahan terpilih" : `${filteredSelectedIngredients.length} Terpilih`}
                                                    </p>
                                                    <IngredientPicker
                                                        name={ingredientType.name}
                                                        ingredients={filteredIngredients}
                                                        selectedIngredients={selectedIngredients}
                                                        onIngredientAdd={addIngredient}
                                                        onIngredientRemove={removeIngredient}
                                                    />
                                                </div>
                                            </CardHeader>
                                            {filteredSelectedIngredients.length !== 0 &&
                                                <CardContent>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead colSpan={2}>Nama Bahan</TableHead>
                                                                <TableHead className="text-right">Air (ml)</TableHead>
                                                                <TableHead className="text-right">Energi (Kal)</TableHead>
                                                                <TableHead className="text-right">Protein (g)</TableHead>
                                                                <TableHead className="text-right">Lemak (g)</TableHead>
                                                                <TableHead className="text-right">Karbohidrat (g)</TableHead>
                                                                <TableHead className="text-right">Serat (g)</TableHead>
                                                                <TableHead className="text-right">Estimasi harga</TableHead>
                                                                <TableHead className="text-right">Jumlah</TableHead>
                                                                <TableHead></TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {filteredSelectedIngredients.map((selected, index) =>
                                                                <TableRow key={index}>
                                                                    <TableCell colSpan={2} className="font-medium">{selected.ingredient.name}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.water}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.energy}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.protein}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.fat}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.carbohydrate}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.fiber}</TableCell>
                                                                    <TableCell className="text-right">{selected.ingredient.price}</TableCell>
                                                                    <TableCell className="text-right">{selected.amount}</TableCell>
                                                                    <TableCell className="text-right">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="icon"
                                                                            onClick={() => removeIngredient(selected.ingredient)}
                                                                            className="text-destructive hover:bg-destructive hover:text-white"
                                                                        >
                                                                            <Trash2 />
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </CardContent>
                                            }
                                        </Card>
                                    )
                                })}
                            </div>
                            <Table className="my-4">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead></TableHead>
                                        <TableHead className="text-right">Air (ml)</TableHead>
                                        <TableHead className="text-right">Energi (Kal)</TableHead>
                                        <TableHead className="text-right">Protein (g)</TableHead>
                                        <TableHead className="text-right">Lemak (g)</TableHead>
                                        <TableHead className="text-right">Karhohidrat (g)</TableHead>
                                        <TableHead className="text-right">Serat (g)</TableHead>
                                        <TableHead className="text-right">Estimasi harga</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">AKG total</TableCell>
                                        <TableCell className="text-right">{totals.water}</TableCell>
                                        <TableCell className="text-right">{totals.energy}</TableCell>
                                        <TableCell className="text-right">{totals.protein}</TableCell>
                                        <TableCell className="text-right">{totals.fat}</TableCell>
                                        <TableCell className="text-right">{totals.carbohydrate}</TableCell>
                                        <TableCell className="text-right">{totals.fiber}</TableCell>
                                        <TableCell className="text-right">Rp{totals.price}</TableCell>
                                    </TableRow>
                                    <TableRow className="bg-secondary">
                                        <TableCell className="font-medium">AKG target</TableCell>
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger><Info size={14} className="text-muted-foreground" /></PopoverTrigger>
                                                <PopoverContent>Air bisa didapat dari minuman</PopoverContent>
                                            </Popover>
                                            &nbsp; 0
                                        </TableCell>
                                        <TableCell className="text-right">{treshold.energy}</TableCell>
                                        <TableCell className="text-right">{treshold.protein}</TableCell>
                                        <TableCell className="text-right">{treshold.fat}</TableCell>
                                        <TableCell className="text-right">{treshold.carbohydrate}</TableCell>
                                        <TableCell className="text-right">{treshold.fiber}</TableCell>
                                        <TableCell className="text-right">Rp{treshold.price}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={8} className={`text-right ${isSufficient ? "text-primary" : "text-destructive"}`}>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmitPick)}>
                                                    {isSufficient ? "Bahan yang dipilih sudah mencukupi kebutuhan gizi" : "Bahan yang dipilih belum mencukupi kebutuhan gizi"}
                                                    <Button type="submit" className="ms-4" disabled={!isSufficient || isLoading}>
                                                        Pilih Resep
                                                    </Button>
                                                </form>
                                            </Form>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <Dialog open={isPriceDialogOpen} onOpenChange={() => { setIsPriceDialogOpen(false); getRecommendation() }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Harga Maksimum</DialogTitle>
                        <DialogDescription>
                            Masukkan batas harga bahan makanan total maksimum yang anda inginkan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center">
                        <span className="me-2">Rp</span>
                        <Input defaultValue="100000" onChange={(e) => setTreshold((prev) => ({ ...prev, price: Number(e.target.value) }))} />
                    </div>
                    <DialogFooter className="justify-end">
                        <DialogClose asChild>
                            <Button type="button">Simpan</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
}

function mapToIngredient(apiData: any): Ingredient {
    return {
        category: apiData["Kategori"] || null,
        name: apiData["Nama Bahan"] || null,
        water: apiData["Air (gram)"] ?? 0,
        energy: apiData["Energi (kal)"] ?? 0,
        protein: apiData["Protein (gram)"] ?? 0,
        fat: apiData["Lemak (gram)"] ?? 0,
        carbohydrate: apiData["Karbohidrat (gram)"] ?? 0,
        fiber: apiData["Serat (gram)"] ?? 0,
        price: apiData["Harga (Rp.)"] || null,
    };
}