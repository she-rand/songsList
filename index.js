const express=require('express');
const fs=require('fs');
const app=express();

app.listen(3000,()=>{console.log("Server is switched on!")});

app.use(express.json());

app.get("/",(req,res) => {
res.sendFile(__dirname + "/index.html");
}); 

app.get("/canciones",(req,res) => {
    const songs=JSON.parse(fs.readFileSync("./songs.json"));
    res.json(songs);
});

app.post("/canciones", (req,res) => {
  const song =  req.body;
  console.log(song);
  const songs=JSON.parse(fs.readFileSync("./songs.json"));
  songs.push(song);
  fs.writeFileSync("songs.json",JSON.stringify(songs));
  res.send("Song succesfully added!");

}); 

app.put("/canciones/:id",(req,res) => {
  const {id}=req.params;
  const song=req.body;
  const songs=JSON.parse(fs.readFileSync("./songs.json"));
  const index= songs.findIndex(s => s.id==id)
  songs[index]=song
  fs.writeFileSync("./songs.json",JSON.stringify(songs));
  res.send("Cancion modificada con exito")
  

});

app.delete("/canciones/:id",(req,res)=>{
  const {id}=req.params;
  const songs=JSON.parse(fs.readFileSync("./songs.json"));
  const index= songs.findIndex(s => s.id==id)
  songs.splice(index, 1)
  fs.writeFileSync("./songs.json", JSON.stringify(songs))
  res.send("Cancion eliminada con éxito")


})
