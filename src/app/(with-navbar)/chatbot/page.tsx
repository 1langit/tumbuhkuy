"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar"
import { SendHorizonal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scrollarea"

export default function Chatbot() {

    const FormSchema = z.object({
        message: z.string().min(1)
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const generateRows = (numRows: number) => {
        return Array.from({ length: numRows }, (_, index) => ({
            participant: index % 2 === 0 ? "bot" : "user",
            message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae maxime delectus, reprehenderit, sint odit sed fuga necessitatibus neque placeat ut alias nulla quaerat atque, magnam deserunt quibusdam esse minus explicabo.",
        }))
    }
    const chat = generateRows(10)

    return (
        <main className="w-full h-screen">
            <div className="max-w-[1100px] mx-auto px-4 flex flex-col justify-between w-full h-full" >
                <ScrollArea className="h-full py-2">
                    <div className="h-full space-y-3 px-4">
                        {chat.map((content, index) => {
                            if (content.participant === "user") {
                                return <Badge key={index} className="block w-fit max-w-[600px] place-self-end text-base font-normal leading-tight rounded-3xl px-5 pt-3 pb-4 ms-14">{content.message}</Badge>
                            } else {
                                return <Badge key={index} variant="secondary" className="block w-fit max-w-[600px] text-base font-normal leading-tight rounded-3xl px-5 pt-3 pb-4 me-14">{content.message}</Badge>
                            }
                        })}
                        {/* <Badge className="block w-fit max-w-[600px] place-self-end text-base font-normal leading-tight rounded-3xl px-5 pt-3 pb-4 ms-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Badge>
                        <Badge variant="secondary" className="block w-fit max-w-[600px] text-base font-normal leading-tight rounded-3xl px-5 pt-3 pb-4 me-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Badge>
                        <Badge className="block w-fit max-w-[600px] place-self-end text-base font-normal leading-tight rounded-3xl px-5 pt-3 pb-4 ms-14">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi amet blanditiis mollitia. Quo nisi quae fuga at dolorem, natus distinctio molestias porro rem consequatur dolor cum odit delectus ab nemo.</Badge>
                        <Badge variant="secondary" className="block w-fit max-w-[600px] text-base font-normal leading-tight rounded-3xl px-5 pt-3 pb-4 me-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, facilis quibusdam mollitia eum eligendi fugit ad architecto consequatur ea quas ipsa earum voluptate itaque nesciunt enim eos. Officiis, ratione voluptatibus.</Badge> */}
                    </div>
                </ScrollArea>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex">
                                            <Input placeholder="Ketik pesan" {...field} />
                                            <Button type="submit" className="ms-1">
                                                <SendHorizonal />
                                            </Button>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </main>
    )
}