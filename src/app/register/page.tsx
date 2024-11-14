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
import Cover from "@/assets/cover2.png"
import Logo from "@/assets/logo.png"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, ChevronUp, Eye, EyeOff } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { MultiSelect } from "@/components/multi-select"
import { medicalHistory } from "@/data/medical-history";
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function Register() {

    const router = useRouter()
    const [page, setPage] = useState(1)
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const FormSchema = z.object({
        email: z.string().email({ message: "Email tidak valid." }),
        password: z.string().min(8, { message: "Minimal 8 karakter." }),
        name: z.string().min(0, { message: "Tidak boleh kosong" }),
        dob: z.date({ required_error: "Tidak boleh kosong" }),
        gender: z.string(),
        medicalHistory: z.string().array(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            medicalHistory: [],
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        router.push("/dashboard")
    }

    return (
        <main className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                {/* <div className="absolute inset-0 bg-zinc-900" /> */}
                <Image src={Cover} alt="cover" loading="lazy" className="absolute inset-0 h-screen object-cover" />
                <div className="relative z-20 flex items-center text-lg font-medium">
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
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Buat Akun
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Cegah dan atasi stunting berama TumbuhKuy
                        </p>
                    </div>
                    <br />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-2"
                        >
                            {page === 1 &&
                                <>
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
                                </>
                            }
                            {page === 1 &&
                                <>
                                    <br />
                                    <Button className="ml-auto w-full" type="button" onClick={() => setPage(2)}>
                                        Lanjutkan
                                    </Button>
                                </>
                            }
                            {page === 2 &&
                                <>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="bg-background px-2 text-muted-foreground">
                                                <Button
                                                    onClick={() => setPage(1)}
                                                    variant="link"
                                                    className="text-xs px-1 flex flex-col leading-3"
                                                >
                                                    <ChevronUp className="absolute -translate-y-4" />
                                                    Kembali
                                                </Button>
                                            </span>
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nama Lengkap Anda"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Tanggal Lahir</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "d MMMM yyyy")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            captionLayout="dropdown-buttons"
                                                            fromYear={1950}
                                                            toYear={2024}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jenis Kelamin</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="L">Laki-laki</SelectItem>
                                                        <SelectItem value="P">Perempuan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="medicalHistory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Riwayat Kesehatan (jika ada)</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={medicalHistory}
                                                        onValueChange={field.onChange}
                                                        placeholder="Pilih jika ada"
                                                        variant="inverted"
                                                        animation={0}
                                                        maxCount={5}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    <Button className="ml-auto w-full" type="submit">
                                        Daftar
                                    </Button>
                                </>
                            }
                        </form>
                    </Form>
                    {page === 1 &&
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Sudah punya akun?
                                    <Link
                                        href="/login"
                                        className={cn(
                                            buttonVariants({ variant: 'link' }),
                                            "text-xs px-1"
                                        )}
                                    >
                                        Login
                                    </Link>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </main>
    )
}
