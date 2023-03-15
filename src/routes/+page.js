import {api} from "../stores";
let url;
api.subscribe(value => url =value)
export const load = async ({fetch, params}) => {
    const res = await fetch(`${url}/`)
    const content = await res.json()
    return {content}
}
