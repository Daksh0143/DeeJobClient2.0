export const setItem = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
    }
}

export const getItem = (key) => {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key)
        return item ? JSON.stringify(item) : null
    }
    return null
}

export const removeItem = (key) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key)
    }
}

export const clearStorage = () => {
    if (typeof window !== "undefined") {
        localStorage.clear();
    }
}

