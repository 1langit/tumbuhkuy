"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, Check } from "lucide-react";

export default function SaveButton() {
    const [save, setSave] = useState(false)
    return (
        <Button onClick={() => setSave(true)} disabled={save}>
            {!save && <><Bookmark />Simpan Resep</>}
            {save && <><Check />Resep Tersimpan</>}
        </Button>
    )
}