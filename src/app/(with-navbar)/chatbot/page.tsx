"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scrollarea"
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai"
import { useEffect, useState } from "react"
import { Chat } from "@/type/chat"
import ReactMarkdown from "react-markdown"

export default function Chatbot() {

    const apiKey = "AIzaSyCNXzq5P3ly4yFX1IDo4qqfgmtSO7K9Xfc"
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "TumbuhKuy adalah platform berbasis web yang menggunakan Artificial Intelligence (AI) untuk membantu pencegahan stunting dan optimasi gizi anak di Indonesia. Dengan memanfaatkan Natural Language Processing (NLP) dan Binary Integer Programming, platform ini mampu merekomendasikan bahan makanan yang sesuai kebutuhan gizi pengguna, menghasilkan resep makanan yang mudah diikuti, dan memberikan panduan gizi yang sesuai dengan anggaran serta kondisi kesehatan pengguna.\n\nTujuan Utama: Tujuan utama TumbuhKuy adalah menyediakan solusi praktis dan personal bagi keluarga dalam memenuhi kebutuhan gizi harian anak-anak. Platform ini juga bertujuan untuk mendukung pihak layanan kesehatan dalam melacak perkembangan kesehatan anak melalui data historis yang tersimpan, sehingga intervensi dapat dilakukan dengan lebih tepat waktu.\n\nPermasalahan yang Diselesaikan: TumbuhKuy dirancang untuk mengatasi permasalahan gizi buruk dan stunting yang masih tinggi di Indonesia. Dengan menggabungkan AI berbasis NLP untuk menyajikan resep yang relevan serta Binary Integer Programming untuk optimasi bahan makanan sesuai anggaran, platform ini menawarkan solusi yang mampu menjawab kendala gizi keluarga, baik di wilayah terpencil maupun perkotaan, dengan rekomendasi gizi yang terjangkau dan terstruktur.",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    let chatSession: ChatSession

    async function run() {
        chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "Hai" }
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "Hai, selamat datang di platform TumbuhKuy! Ada yang bisa saya bantu terkait dengan stunting dan juga kecukupan gizi? Kamu bisa tanyakan apapun." },
                    ],
                },
            ],
        });
    }

    useEffect(() => {
        run()
    })

    const [chat, setChat] = useState<Chat[]>([
        {
            role: "model",
            message: "Hai, selamat datang di platform TumbuhKuy! Ada yang bisa saya bantu terkait dengan stunting dan juga kecukupan gizi? Kamu bisa tanyakan apapun.",
        },
    ])
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (message !== "") {
            setIsLoading(true)
            setChat(prevChat => [...prevChat, { role: "user", message }])
            const result = await chatSession.sendMessage(message)
            setChat(prevChat => [...prevChat, { role: "model", message: result.response.text() }])
            setIsLoading(false)
            setMessage("")
        }
    }

    return (
        <main className="w-full h-screen">
            <div className="max-w-[1100px] mx-auto px-4 flex flex-col justify-between w-full h-full" >
                <ScrollArea className="h-full py-2">
                    <div className="h-full space-y-3 px-4">
                        {chat.map((content, index) => {
                            if (content.role === "user") {
                                return <Badge key={index} className="block w-fit max-w-[600px] place-self-end text-base font-normal leading-tight rounded-3xl rounded-tr-none px-5 pt-3 pb-4 ms-14">
                                    {content.message}
                                </Badge>
                            } else {
                                return <Badge key={index} variant="secondary" className="block w-fit max-w-[600px] text-base font-normal leading-tight rounded-3xl rounded-tl-none px-5 pt-3 pb-4 me-14">
                                    <ReactMarkdown>{content.message}</ReactMarkdown>
                                </Badge>
                            }
                        })}
                    </div>
                </ScrollArea>
                <form onSubmit={onSubmit} className="flex mb-20">
                    <Input placeholder="Ketik pesan" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <Button type="submit" disabled={isLoading} className="ms-1">
                        <SendHorizonal />
                    </Button>
                </form>
            </div>
        </main>
    )
}