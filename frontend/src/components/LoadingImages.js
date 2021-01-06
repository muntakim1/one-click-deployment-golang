import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
const Images = ()=>{
    const [value,setValue]=useState([])
    const [error,setError]=useState("")

    useEffect(()=>{

        const interval = setInterval(() => {
                axios.get('http://127.0.0.1:8080/images').then((res) => {
                    setValue(res.data||[])

                }).catch((err)=>setError(err.response.data))
                }, 10000)

         return () =>clearInterval(interval)
    },)
    console.log(value)

    return (

        <>
            {error !=="" && <Alert style={{margin:"10px"}} severity="error"><AlertTitle>Error</AlertTitle>Ooops.....! 😞 😞— <strong>{error}</strong></Alert>}

            <List style={{maxHeight: '100%', overflow: 'auto',display: 'flex',
                flexDirection: 'row'}}>
                {value.length < 0 && <Alert style={{margin:"10px"}} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Ooops.....! 😞 😞— <strong>No Images Found!!</strong>
                </Alert> }
                {value.length > 0 && value.map((val,i)=><ListItem  display="inline" key={i}>
                    <Card className="cardListImage">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                               <strong>{ val['RepoTags']}</strong>
                            </Typography>
                        </CardContent>
                    </Card>


                </ListItem>)}

            </List>

        </>
    )
}
export default Images