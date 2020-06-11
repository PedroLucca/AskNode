const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const AskModel = require("./database/Ask");
const AnswerModel = require("./database/Answer");

//Conectando banco
connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//Usando ejs como view engine.
app.set("view engine","ejs");
app.use(express.static("public"));
//BodyParser(Pegar dados de entrada)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Rotas
app.get("/",function(req,res){
    //Olha automaticamente dentro da pasta views
    AskModel.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(asks => {
        res.render("index",{
            asks: asks
        });
    });
    
});
app.get("/ask",function(req,res){
    //Olha automaticamente dentro da pasta views
    res.render("ask");
});
app.post("/savequestion",function(req,res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    AskModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/ask/:id",(req,res) => {
    var id = req.params.id;
    AskModel.findOne({
        where: {id:id}
    }).then(ask => {
        if(ask != undefined){
            AnswerModel.findAll().then(answers => {
                if(answers != undefined){
                    res.render("asksearch", {
                        ask: ask,
                        answers: answers
                    });
                }else{
                    res.redirect("/");
                }  
            });
        }else{
            res.redirect("/");
        }
    });
});

app.post("/answerquestion",function(req,res){
    var corpo = req.body.corpo;
    var askid = req.body.ask;
    
    AnswerModel.create({
        corpo: corpo,
        askID: askid
    }).then(() => {
        res.redirect("/ask/"+ askid);
    });
});

app.listen(8080, () => { console.log("App rodando!")});