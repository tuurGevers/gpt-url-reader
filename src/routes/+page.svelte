<script>
    import {TextField, Button, P, Fly, Box, Typography, Link} from "sx-utils-dnit"
    import axios from "axios"
    import {api, threads} from "../stores";

    const inputSx = {
        width: "70%",
        padding: 1,
        m: 3,
        ml:10,
        rounding: 2,
        border: "1px solid lightgray"
    }
    let prompt
    let answer
    let waiting = false
    function getSummary() {
        waiting= true
        $threads.push({"role": "user", "content": `${prompt} urls:${urls}`})
        $threads = $threads
        axios.post(`${$api}/getsummary`, {url: urls, prompt: prompt, history: $threads}).then(
            (data) => {
                answer = data.data
                $threads.push({"role": "assistant", "content": `${data.data}`})
                $threads = $threads
                waiting= false

            }
        )
    }

    let urls = [""]
</script>

<Box sx={{flex:"col", flexAlign:"center",}}>
    <Typography variant={1} align="center" sx={{width:"100%"}}>
        ai url reader
    </Typography>
    <TextField sx={{
        width: "100%",
        padding: 1,
        m: 3,
        rounding: 2,
        border: "1px solid lightgray"
    }} type="text" value="prompt:" on:change={(e)=>prompt = e.detail.value}/>

    {#each urls as url,i}
        <Box sx={{flex:"row", flexAlign: "center", m:"0 auto"}}>
            <TextField sx={inputSx} type="text" value="url" on:change={(e)=>urls[i] = e.detail.value}/>
            <Button sx={{ml:"6"}} click={()=>{urls.length<5?urls.push(""):""; urls=urls}}>+</Button>
        </Box>
    {/each}
    <Button sx={{rounding:2, p:2,m:"0 0 0 5%", width:"24%"}} hover={{backgroundColor:"#752f2f", color:"white"}} click={()=>{getSummary()}}>get summary</Button>
    <Link to="trends">Trends</Link>
</Box>
{#if waiting && !$threads}
    <Fly dir="y" amount={200} duration={2000}>
        <P>
            waiting
        </P>
    </Fly>
    {/if}
{#if answer}
    {#each $threads as thread, i}
        <Fly dir="y" amount={200} duration={2000+ i*200}>
            <P>
                {thread.content}
            </P>
        </Fly>
        {/each}

{/if}

