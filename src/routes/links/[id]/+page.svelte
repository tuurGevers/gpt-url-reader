<script>
  import { TextField, Button, P, Fly, Box, Typography, Link,Image } from "sx-utils-dnit";
  import axios from "axios";
  import { api } from "../../../stores";
  import { onMount } from "svelte";

  let articles;
  let params
  onMount(()=>{
    params = data.id.split("-")

  })
  const explore = async()=> {
    params = data.id.split("-")

    await axios.post(`${$api}/explore`, {
      kw: params[0],
      geo: params[1],
    }).then((data) => {
      console.log(data.data.articles)
      articles = data.data.articles;
    });


  }



  export let data;



</script>

{#await explore() then _}
  <Box sx={{flex:"col", float:"1", width:"95%", m:"5 auto", backgroundColor:"#eeeeee", p:3}}>
    <Typography variant={1} align="center">{params[0]}</Typography>
    {#each articles as article}
      <Box sx={{flex:"col"}}>
        <Typography variant={3}>{article.title}</Typography>
        <P>{article.description} read more...</P>
        <Link to={article.url}>{article.url}</Link>
        <Image src={article.urlToImage} alt="picure" sx={{width:{sm:"100%", lg:"50%", height:"auto"}}}/>
      </Box>

    {/each}
  </Box>

{/await}
