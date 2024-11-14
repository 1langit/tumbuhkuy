"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Cover from "@/assets/cover1.png"
import Welcome from "@/assets/1.png"
import Logo from "@/assets/logo.png"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Login() {

    const router = useRouter()

    const FormSchema = z.object({
        email: z.string().email({ message: "Email tidak valid." }),
        password: z.string().min(8, { message: "Minimal 8 karakter." })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        router.push("/dashboard")
    }

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <main className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <Image src={Cover} alt="cover" loading="lazy" className="absolute inset-0 h-screen object-cover" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Image src={Logo} alt="tumbuhkuy" height={60} />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;
                            Anak-anak adalah titipan masa depan, harapan bangsa yang harus dijaga dan dilindungi. Saat kita memberi mereka gizi yang cukup, kita menumbuhkan bukan hanya tubuh mereka, tetapi juga impian, potensi, dan kekuatan untuk menghadapi dunia.
                            &rdquo;
                        </p>
                        <footer className="text-sm">TumbuhKuy</footer>
                    </blockquote>
                </div>
            </div>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Image src={Welcome} alt="" width={720} className="absolute -translate-y-40 -translate-x-48 -z-10" />
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Selamat datang<br/>kembali di TumbuhKuy!
                        </p>
                    </div>
                    <br />
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="emailanda@mail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="flex">
                                                    <Input
                                                        placeholder="Min. 8 karakter"
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="ms-1"
                                                    >
                                                        {showPassword ? <Eye /> : <EyeOff />}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <br />
                                <Button className="ml-auto w-full" type="submit">
                                    Masuk
                                </Button>
                            </form>
                        </Form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Belum punya akun?
                                    <Link
                                        href="/register"
                                        className={cn(
                                            buttonVariants({ variant: 'link' }),
                                            "text-xs px-1"
                                        )}
                                    >
                                        Register
                                    </Link>
                                </span>
                            </div>
                        </div>
                </div>
            </div>
        </main>
    )
}
