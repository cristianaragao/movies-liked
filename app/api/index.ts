export const api = async (url: string) => {
    return await fetch("https://api.themoviedb.org/3" + url + "?language=pt-BR&region=BR", {
        headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
            "Content-Type": "application/json"
        },
        
    }).then((res) => res.json())
}

export const apiGeneric = async (url: string) => {
    return await fetch("https://api.themoviedb.org/3" + url + "", {
        headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
            "Content-Type": "application/json"
        },
        
    }).then((res) => res.json())
}