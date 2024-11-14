import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { BotMessageSquare, CircleUserRound, ScrollText, Table2 } from "lucide-react";

export default function Navbar() {
    return (
        <nav className='flex justify-center'>
            <div className='fixeddddddddddddd w-full max-w-[1200px] flex justify-between items-center z-10 px-4 py-1 bg-white'>
                <div>
                    <Link href="/dashboard" className='flex items-center hover:cursor-pointer'>
                        <Image src={Logo} alt="tumbuhkuy" height={60} />
                    </Link>
                </div>

                {/* menu */}
                <ul className="flex gap-1">
                    <li>
                        <Button variant="ghost">
                            <Link href="/chatbot" className="flex items-center">
                                <BotMessageSquare className="me-2 text-primary"/>
                                Chatbot
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost">
                            <Link href="/akg" className="flex items-center">
                                <Table2 className="me-2 text-primary" />
                                Informasi AKG
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost">
                            <Link href="/resep" className="flex items-center">
                                <ScrollText className="me-2 text-primary" />
                                Resep Tersimpan
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="flex items-center">
                                    <CircleUserRound className=" text-primary" />
                                    Akun
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col items-center max-w-[280px]">
                                <CircleUserRound size={60} strokeWidth={1.25} className="text-gray-300 mb-2" />
                                <p className="text-sm text-muted-foreground max-w-[240px] break-words">
                                    TK35522
                                </p>
                                <h4 className="font-medium">Annisa Rahma</h4>
                                <p className="text-sm text-muted-foreground max-w-[240px] break-words">
                                    annisarahma@gmail.com
                                </p>
                                <Separator className="mt-3" />
                                <div className="flex items-center">
                                    <Button variant="ghost" className="rounded-none rounded-bl">
                                        <Link href="/profil">
                                            Edit Akun
                                        </Link>
                                    </Button>
                                    <Separator orientation="vertical" className="h-6" />
                                    <Button variant="ghost" className="rounded-none rounded-br text-destructive hover:text-destructive">
                                        <Link href="/">
                                            Logout
                                        </Link>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </li>
                </ul>
            </div>
        </nav>
    )
}