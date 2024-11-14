import { Ingredient } from "@/type/ingredient";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { MinusCircle, PlusCircle } from "lucide-react";
import { ScrollArea } from "./ui/scrollarea";
import { SelectedIngredient } from "@/type/selected-ingredient";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useState } from "react";

interface IngredientPickerProps {
    name: string,
    ingredients: Ingredient[],
    selectedIngredients: SelectedIngredient[],
    onIngredientAdd: (ingridient: Ingredient) => void,
    onIngredientRemove: (ingridient: Ingredient) => void,
}

export default function IngredientPicker({
    name,
    ingredients,
    selectedIngredients,
    onIngredientAdd,
    onIngredientRemove
}: IngredientPickerProps) {

    const [showDetail, setShowDetail] = useState(false)

    const getSelectedAmount = (ingredient: Ingredient) => {
        const selected = selectedIngredients.find(
            (item) => item.ingredient.name === ingredient.name
        );
        return selected ? selected.amount : 0;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>+ Pilih</Button>
            </DialogTrigger>
            <DialogContent className={showDetail ? "max-w-4xl" : ""}>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>
                        Pilih bahan makanan yang anda inginkan
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[480px] py-4">
                    {!showDetail && ingredients.map((ingredient, index) =>
                        <div key={index} className="px-4">
                            <div className="flex justify-between">
                                <p className="text-base">{ingredient.name}</p>
                                <div className="flex justify-end items-center py-0">
                                    <Button
                                        type="button"
                                        onClick={() => onIngredientRemove(ingredient)}
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-400"
                                    >
                                        <MinusCircle />
                                    </Button>
                                    <p className="min-w-6 text-center text-primary">{getSelectedAmount(ingredient)}</p>
                                    <Button
                                        type="button"
                                        onClick={() => onIngredientAdd(ingredient)}
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-400"
                                    >
                                        <PlusCircle />
                                    </Button>
                                </div>
                            </div>
                            <hr className="pb-4" />
                        </div>
                    )}
                    {showDetail &&
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2}>Nama Bahan</TableHead>
                                    <TableHead className="text-center">Air (ml)</TableHead>
                                    <TableHead className="text-center">Energi (Kal)</TableHead>
                                    <TableHead className="text-center">Protein (g)</TableHead>
                                    <TableHead className="text-center">Lemak (g)</TableHead>
                                    <TableHead className="text-center">Karbohidrat (g)</TableHead>
                                    <TableHead className="text-center">Serat (g)</TableHead>
                                    <TableHead className="text-center">Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ingredients.map((ingredient, index) =>
                                    <TableRow key={index}>
                                        <TableCell colSpan={2} className="font-medium">{ingredient.name}</TableCell>
                                        <TableCell className="text-center">{ingredient.water}</TableCell>
                                        <TableCell className="text-center">{ingredient.energy}</TableCell>
                                        <TableCell className="text-center">{ingredient.protein}</TableCell>
                                        <TableCell className="text-center">{ingredient.fat}</TableCell>
                                        <TableCell className="text-center">{ingredient.carbohydrate}</TableCell>
                                        <TableCell className="text-center">{ingredient.fiber}</TableCell>
                                        <TableCell className="h-full flex items-center">
                                            <Button
                                                type="button"
                                                onClick={() => onIngredientRemove(ingredient)}
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400"
                                            >
                                                <MinusCircle />
                                            </Button>
                                            <p className="min-w-6 text-center text-primary">{getSelectedAmount(ingredient)}</p>
                                            <Button
                                                type="button"
                                                onClick={() => onIngredientAdd(ingredient)}
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400"
                                            >
                                                <PlusCircle />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    }
                </ScrollArea>
                <DialogFooter>
                    <DialogFooter className="w-full items-center justify-between">
                        <div className="flex items-center">
                            <Switch id="show-detail" checked={showDetail} onCheckedChange={setShowDetail} className="me-3" />
                            <label
                                htmlFor="show-detail"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Tampilkan gizi
                            </label>
                        </div>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Kembali
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}