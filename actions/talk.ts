import axios from "axios"
const navalTalk = async (question: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
    console.log(baseUrl)
    try {
        const response = await axios.get(`${baseUrl!}/api/naval/talk?input=${question}`)
        if (response.status === 200) {
            const data = response.data
            return {llm_answer:data.message}
        }
        throw new Error(response.data)
    } catch (e) {
        if (e instanceof Error) {
            return e
        }
    }
}   
export { navalTalk }