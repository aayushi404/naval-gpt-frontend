export default function Chat({chat}:{chat:{type:"llm"|"user", chat:string}}){
    return(
        <div>
            <div>{chat.type}</div>
            <div>{chat.chat}</div>
        </div>
    )
}