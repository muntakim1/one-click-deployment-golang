import React,{useState} from 'react'
import { trackPromise} from 'react-promise-tracker';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }}))
const CreateDockerImage = ()=>{
    const [value,setValue]=useState("")
    const onChageHandler=(e)=>{
        e.preventDefault();
        setValue(e.target.value)
    }
    const OnSubmitHandler=(e)=>{
        e.preventDefault()
        trackPromise(
            axios.post("http://127.0.0.1:8080/create-image",{name:value},{headers:{"Content-type":"application/json"}}).then((res)=>console.log(res))
        )
    }
  const  classes =useStyles()
    return (

        <>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" onChange={onChageHandler} label="Git Repo" placeholder="github.com/user/repo.git" variant="outlined" />
                <Button className="btn" variant="contained" onClick={()=>OnSubmitHandler}>
                    Build Image
                </Button>
            </form>
        </>
    )
}
export default CreateDockerImage