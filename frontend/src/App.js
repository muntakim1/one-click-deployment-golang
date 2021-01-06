
import './App.css';
import CreateDockerImage from "./components/CreateDockerImage";
import LoadContainers from "./components/LoadContainers";
import LoadingImages from "./components/LoadingImages";
import LoadingSpinner from "./components/LoadingSpinner";
import {Container,Grid} from '@material-ui/core'
function App() {
    document.title="Docker Images Builder"
  return (
    <Container>

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >

                <CreateDockerImage/>
                <div className="paragraph1">
                    <p>Docker Images</p>
                </div>

                <LoadingImages/>
                <LoadingSpinner/>
                <p className="paragraph2">Docker Containers</p>
                <LoadContainers/>




        </Grid>
    </Container>
  );
}

export default App;
