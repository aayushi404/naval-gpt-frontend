export default function rateLimit(limitingW:number, limit:number){
    console.log("ratelimit func hit")
    const key = "rateLimit"
    if (!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify([]))
    }
    const now = Date.now()
    const allRequests:number[] = JSON.parse(localStorage.getItem(key) || "[]")
    const recentRequests = allRequests.filter((t) => (now - t) <= limitingW )

    if (recentRequests.length > limit){
        console.log(`Rate limit Exceeded, Please try after ${limitingW/86400000} days`)
        throw new Error(`Rate limit Exceeded, Please try after ${limitingW/86400000} days`)
    }else{
        allRequests.push(now)
        localStorage.setItem(key, JSON.stringify(allRequests))
        return
    }
}