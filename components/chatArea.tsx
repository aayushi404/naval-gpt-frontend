"use client"

import { navalTalk } from "@/actions/talk"
import { Button } from "./ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { Input } from "./ui/input"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

type inpType = {
    question:string
}
export default function ChatArea() {
    const [answer, setAnswer] = useState("")
    const [llm_error, setLlm_error] = useState("")
    const { register, handleSubmit, formState: { errors }, watch } = useForm<inpType>({defaultValues:{question:""}})
    const onSubmit: SubmitHandler<inpType> = async (data, event) => {
        event?.preventDefault()
        try {
            const response = await navalTalk(data.question)
            if (response && !(response instanceof Error)) {
                setAnswer(response.llm_answer)
            }
        } catch (err) {
            if (err instanceof Error) {
                setLlm_error(err.message)
            }
        }
        
    }
    return (
        <div className="text-gray-200 sm:w-[50%] w-[80%] mx-auto flex-col">
            <ScrollArea className="h-120 sm:h-140">{ answer }</ScrollArea>
            {llm_error}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input  {...register("question", { required: true })} />
                {errors.question && <span>This field is required</span>}
                <Button type="submit" variant={"outline"} className="dark">Submit</Button>
            </form>
        </div>
    )
}