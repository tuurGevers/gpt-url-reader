import {readable, writable} from "svelte/store";


export const api = readable("http://localhost:3000")
export const threads = writable([])
