export const getTest = async () => {
    try {
        const res = await fetch('/test', { method: "GET" })
        return await res.json()
    } catch (ERR) {}
}
