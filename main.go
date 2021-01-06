package main

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
	"github.com/go-git/go-git/v5"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/mitchellh/go-homedir"
	"io"
	"log"
	"os"
)
func allImages(c *fiber.Ctx)error{

	ctx:=context.Background()
	cli,err :=client.NewClientWithOpts(client.FromEnv,client.WithAPIVersionNegotiation())
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	images,err:=cli.ImageList(ctx,types.ImageListOptions{})
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	return c.JSON(images)
}


func allContainers(c *fiber.Ctx)error{



	ctx:=context.Background()
	cli,err :=client.NewClientWithOpts(client.FromEnv,client.WithAPIVersionNegotiation())
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	containers,err:=cli.ContainerList(ctx,types.ContainerListOptions{All: true})
	if err != nil {
		return c.Status(500).SendString(err.Error())
		fmt.Println(err.Error())
	}
	return c.JSON(containers)
}

func GetContext(filePath string) io.Reader {
	fpath, _ := homedir.Expand(filePath)
	ctx, _ := archive.TarWithOptions(fpath, &archive.TarOptions{})
	return ctx
}
func getGitRepo(gitRepo string){
	ctx :=context.Background()
	_, err := git.PlainCloneContext(ctx,"./tmp/foo", false, &git.CloneOptions{
		URL:      gitRepo,
		Progress: os.Stdout,
	})
	if err!=nil{
		fmt.Println(err)
	}

}
func CreateDockerImage(c *fiber.Ctx)error{
	ctx:=context.Background()
	cli,err := client.NewClientWithOpts(client.FromEnv,client.WithAPIVersionNegotiation())
	if err != nil {
		return c.Status(500).SendString(err.Error())

	}
	type gitRepoName struct{
		Name string `json:"name"`
	}
	var gitName gitRepoName
	_ = c.BodyParser(&gitName)

	fmt.Println(gitName.Name)
	if gitName.Name!=""{
		getGitRepo(gitName.Name)
		_,err =cli.ImageBuild(ctx,GetContext("~/desktop/golang-projects/bohoman/tmp/foo/"),types.ImageBuildOptions{})
		if err!=nil{
			return c.Status(500).SendString(err.Error())

		}
		err = os.RemoveAll("~/desktop/golang-projects/bohoman/tmp")
		if err != nil {
			log.Fatal(err)
		}

	}

	return c.SendString("done")

}
func main(){
	app := fiber.New()

	if err :=godotenv.Load(".env");err!=nil{
		log.Fatal(err)
	}
	port :=os.Getenv("PORT")
	app.Use(cors.New())
	app.Get("/images",allImages)
	app.Get("/containers",allContainers)
	app.Post("/create-image",CreateDockerImage)
	app.Static("/static","./frontend/build/static")
	app.Static("/","./frontend/build/")
	app.Static("/","./frontend/build/index.html")
	app.Listen(port)

}