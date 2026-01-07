export default function Chat({chat}:{chat:{type:"llm"|"user", chat:string}}){
    const isUser = chat.type === "user"
    return(
        <div className={`flex w-full mb-4 border" ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`${isUser ? "max-w-[60%] bg-neutral-800 rounded-none px-3 py-4": "max-w-[80%]"}`}>{chat.chat}</div>
        </div>
    )
}