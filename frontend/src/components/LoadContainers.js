import React, {useEffect, useState} from "react";

import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import axios from "axios";
import {AlertTitle} from "@material-ui/lab";


const Conatiners = ()=>{
    const [value,setValue]=useState([])
    const [error,setError]=useState("")

    async function getData(){
        await axios.get('http://127.0.0.1:8080/containers').then((res) => {
            setValue(res.data||[])
        }).catch((err)=>setError(err.response.data))
    }

    useEffect(()=>{

        const interval = setInterval(() => {
            getData()}, 3000)

        return () =>clearInterval(interval)
    })
    console.log("container",value)

    return (

        <>
            {error !=="" && <Alert style={{margin:"10px"}} severity="error"><AlertTitle>Error</AlertTitle>Ooops.....! 😞 😞— <strong>{error}</strong></Alert>}

            <List style={{maxHeight: '100%', overflow: 'auto',display: 'flex',
                flexDirection: 'row'}}>
                {value.length < 0 && <Alert style={{margin:"10px"}} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Ooops.....! 😞 😞— <strong>No Containers Found!!</strong>
                </Alert> }
                {value.length > 0 && value.map((val,i)=><ListItem key={i}>
                    {val["Status"]!=="Created" && <Card>
                        <CardContent className="cardListCont">
                            <Typography variant="h5" component="h2">
                               <u>Container Name </u><br/> <strong>{ val['Names']}</strong>
                            </Typography>
                            <Typography  color="textSecondary">
                               State:  {val['State']}
                            </Typography>
                            <Typography variant="body2" component="p"> Status : {val['Status']}</Typography>
                        </CardContent>
                    </Card>}


                </ListItem>)}

            </List>

        </>
    )
}
export default Conatiners