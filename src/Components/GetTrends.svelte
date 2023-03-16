<script>
  import { TextField, Button, P, Fly, Box, Typography, Card, CardContent, CardActions, CardTitle,Link } from "sx-utils-dnit";
  import axios from "axios";
  import { api, articles } from "../stores";

  let kw, geo, lang;

  let res;
  const languages = ["ar","de",'en','es','fr','he',"it",'nl','no','pt','ru','sv','ud','zh']

  function getTrends() {
    if(languages.includes(lang)){
      axios.post(`${$api}/getTrends`, {
        kw: kw,
        geo: geo
      }).then(
        (data) => {
          res = data.data.default.rankedList[0].rankedKeyword;
          console.log(res);
        }
      );
    }else{
      alert("languages can only be 'ar','de','en','es','fr','he','it','nl','no','pt','ru','sv','ud','zh' ")
    }

  }

  async function explore(term) {
    window.location.href = window.origin + "/links/" + term.query + "-" +lang
  }

  const inputSx = {
    width: "100%",
    padding: 1,
    mt: 1,
    rounding: 2,
    border: "1px solid lightgray"
  };
</script>

<Box sx={{flex:"col", alignItems:"center"}}>
  <Typography variant={1} align="center" sx={{width:"100%"}}>
    ai trending tool
  </Typography>
  <TextField sx={inputSx} type="text" value="keyword" on:change={(e)=>kw = e.detail.value} />
  <TextField sx={inputSx} type="text" value="geo ex:'US','FR'" on:change={(e)=>geo = e.detail.value} />
  <TextField sx={inputSx} type="text" value="language" on:change={(e)=>lang = e.detail.value} />

  <P sx={{textAlign:"center", fontWeight:"bold", fontSize:"20px"}}>
    possible language codes:<br/>
    {#each languages as lang}
      {lang + " "}
    {/each}
  </P>


  <Button sx={{rounding:2, p:2,m:"2% 0%", width:"25%"}} hover={{backgroundColor:"#752f2f", color:"white"}}
          click={()=>{getTrends()}}>get summary
  </Button>
</Box>

{#if res}
  <Box sx={{flex:"row",flexWrap:"wrap", alignItems:"center"}}>
    {#each res as search}
      <Card sx={{flex:"col", alignItems:"center", width:"45%"}}>
        <CardTitle>
          {search.query}
        </CardTitle>
        <CardContent>
          <Link to={`https://trends.google.com${search.link}`}>
            https://trends.google.com/{search.link}
          </Link>
        </CardContent>
        <CardActions>
          <Button click={()=>explore(search)}>explore</Button>
        </CardActions>
      </Card>
    {/each}
  </Box>
{/if}
