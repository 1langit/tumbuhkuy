"use client"

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loasing() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 1);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex justify-center align-middle">
            <Progress value={progress} className="h-1" />
        </div>
    )
}