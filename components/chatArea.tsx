"use client"

import { navalTalk } from "@/actions/talk"
import { Button } from "./ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import Chat from "./chat"
import rateLimit from "@/actions/rateLimit"
import { ApiError } from "next/dist/server/api-utils"
import { toast } from "sonner"
import { Toaster } from "./ui/sonner"

type inpType = {
    question:string
}
export default function ChatArea() {
    const [chat, setChat] = useState<{type:"llm"|"user", chat:string}[]>([])
    const { register, handleSubmit } = useForm<inpType>({defaultValues:{question:""}})
    const onSubmit: SubmitHandler<inpType> = async (data, event) => {
        event?.preventDefault()
        try {
            rateLimit(60 * 1000 * 60 * 24, 1)
            const response = await navalTalk(data.question)
            if (response && !(response instanceof Error)) {
                setChat([...chat, {type: "user", chat: data.question}, { type:"llm",chat:response.llm_answer }])
            }
        } catch (err) {
            if (err instanceof ApiError) {
                toast.error("Something went wrong on server side!")
            }else if (err instanceof Error){
                toast.error(err.message)
            }
        }
        
    }
    
    return (
        <div>
            <div className="text-gray-200 sm:w-[50%] w-[80%] mx-auto flex-col gap-5">
                <ScrollArea className="h-[70vh] sm:h-[80vh] mb-3">{chat.map((c, idx) => (
                    <Chat chat={c} key={idx}/>
                ))}</ScrollArea>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                    <Input  {...register("question", { required: true })} className="h-12 rounded-none py-0"/>
                    <Button type="submit" variant={"outline"} className="dark h-12 rounded-none">Submit</Button>
                </form>
                <Toaster />
            </div>
        </div>
    )
}