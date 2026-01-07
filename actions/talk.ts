import axios from "axios"
import { ApiError } from "next/dist/server/api-utils"
const navalTalk = async (question: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
    console.log(baseUrl)
    try {
        const response = await axios.get(`${baseUrl!}/api/agent/talk/?input=${question}`)
        const data = response.data
        if (data.status === 200){
            return {llm_answer:data.message.messages[0]}
        }
        throw new ApiError(data.status, data.error)
        
    } catch (e) {
        if (e instanceof ApiError) {
            throw new ApiError(e.statusCode, e.message)
        }else if (e instanceof Error){
            throw new Error("Server could not respond")
        }
    }
}   
export { navalTalk }