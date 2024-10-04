export const getTest = async () => {
    try {
        const res = await fetch('http://localhost:8000/test', { method: "GET" })
        return await res.json()
    } catch (ERR) {}
}
