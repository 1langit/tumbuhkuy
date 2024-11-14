"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Logo from "@/assets/logo.png"
import Cover from "@/assets/cover1.png"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { useResponse } from "@/contexts/ResponseContext"
import axios from "axios"
import { useState } from "react"

export default function CekStunting() {

    const router = useRouter()
    const { setResponseData } = useResponse()

    const [message, setMessage] = useState("Cek apakah kamu stunting atau kurang gizi")

    const FormSchema = z.object({
        mode: z.string(),
        is_female: z.boolean(),
        year_age: z.coerce.number().min(0, { message: "Input tidak valid." }),
        month_age: z.number(),
        tinggi_badan: z.coerce.number().min(0, { message: "Input tidak valid." }),
        massa_tubuh: z.coerce.number().min(0, { message: "Input tidak valid." }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            mode: 4 <= 5 ? "stunting" : "gizi",
            is_female: false,
            year_age: 4,
            month_age: 0,
            tinggi_badan: 0,
            massa_tubuh: 0,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        setMessage("Cek apakah kamu stunting atau kurang gizi")
        api.post("/classify_status", data)
            .then(res => {
                console.log(res.data)
                setResponseData(res.data)
                router.push("/hasil")
            })
            .catch(err => console.log(err.response))

        axios.all([
            api.post("/classify_status", data),
            api.post("/nutrition_threshold", data)
        ]).then(axios.spread((classifyResponse, thresholdResponse) => {
            const res = {
                classify: classifyResponse.data,
                threshold: thresholdResponse.data
            };
            console.log(res)
            setResponseData(res)
            router.push("/hasil")
        })).catch(err => {
            console.log(err.response)
            setMessage("Terjadi kesalahan jaringan. Silahkan coba lagi")
        })
    }

    return (
        // <main className="flex">
        //     <div className="w-[50vw] h-screen flex justify-center items-center">
        //         <Form {...form}>
        //             <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6">
        //                 <h1 className="text-3xl">Cek Stunting</h1>
        //                 <br />
        //                 <FormField
        //                     control={form.control}
        //                     name="year_age"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Umur</FormLabel>
        //                             <FormControl>
        //                                 <Input {...field} type="number" /*disabled*/ />
        //                             </FormControl>
        //                             <FormDescription>Berdasarkan tanggal lahir anda</FormDescription>
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name="tinggi_badan"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Tinggi Badan</FormLabel>
        //                             <FormControl>
        //                                 <div className="flex">
        //                                     <Input {...field} type="number" />
        //                                 </div>
        //                             </FormControl>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name="massa_tubuh"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Berat Badan</FormLabel>
        //                             <FormControl>
        //                                 <div className="flex">
        //                                     <Input {...field} type="number" />
        //                                 </div>
        //                             </FormControl>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <Button type="submit">Cek Sekarang</Button>
        //             </form>
        //         </Form>
        //     </div>
        //     <Image src={Cover} alt="cover" loading="lazy" className="w-[50vw] h-screen object-cover" />
        // </main>
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Cek Stunting
                        </h1>
                        <p className={`text-sm ${message.includes("kesalahan") ? "text-destructive" : "text-muted-foreground"}`}>
                            {message}
                        </p>
                    </div>
                    <br />
                    <>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="year_age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Umur</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" /*disabled*/ />
                                            </FormControl>
                                            <FormDescription>Berdasarkan tanggal lahir anda</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tinggi_badan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tinggi Badan</FormLabel>
                                            <FormControl>
                                                <div className="flex">
                                                    <Input {...field} type="number" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="massa_tubuh"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Berat Badan</FormLabel>
                                            <FormControl>
                                                <div className="flex">
                                                    <Input {...field} type="number" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <br />
                                <Button className="ml-auto w-full" type="submit">
                                    Cek Sekarang
                                </Button>
                            </form>
                        </Form>
                    </>
                </div>
            </div>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                {/* <div className="absolute inset-0 bg-zinc-900" /> */}
                <Image src={Cover} alt="cover" loading="lazy" className="absolute inset-0 h-screen object-cover" />
                <div className="relative z-20 flex items-center text-lg font-medium ms-auto">
                    <Image src={Logo} alt="tumbuhkuy" height={60} />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This library has saved me countless hours of work and
                            helped me deliver stunning designs to my clients faster than ever
                            before.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}
