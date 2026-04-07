const express = require("express")
const knex = require("knex")
const errors = require("http-errors")

const app = express()

app.use( express.json() )
app.use( express.urlencoded( {extended : true} ) )

const PORT = 8001
const HOSTNAME = "localhost"

const conn = knex( {
    client : "mysql" ,
    connection : {
        host : HOSTNAME ,
        user : "root" ,
        password : "" ,
        database : "loja_25_2"
    }
} )

app.get( "/"  , (req, res, next)=>{
    res.json( { resposta : "Seja bem-vindo(a) a nossa API" } )
}  )

app.get( "/product"  , (req, res, next)=>{
    conn( "produto" )
        .leftJoin("categoria" , "produto.codCategoria", "=" , "categoria.id" )
        .select( "produto.*" , "categoria.nome AS categoria")
        .then( dados => res.json( dados ) )
        .catch( next )
}  )

app.get( "/product/last"  , (req, res, next)=>{
    conn( "produto" )
        .leftJoin("categoria" , "produto.codCategoria", "=" , "categoria.id" )
        .select( "produto.*" , "categoria.nome AS categoria")
        .orderBy("produto.id" , "desc")
        .first()
        .then( dados => res.json( dados ) )
        .catch( next )
}  )


app.get( "/product/:idProd"  , (req, res, next)=>{
    const id = req.params.idProd
    conn( "produto" )
        .leftJoin("categoria" , "produto.codCategoria", "=" , "categoria.id" )
        .select( "produto.*" , "categoria.nome AS categoria")
        .where( "produto.id" , id )
        .first()
        .then( dados => res.json( dados ) )
        .catch( next )
}  )


app.post( "/product"  , (req, res, next)=>{
    conn( "produto" )
        .insert( req.body )
        .then( dados => {
            if( !dados ){
                return next(errors( 404 , "Erro ao inserir") )
            }
            res.status(201).json( {
                resposta : "Produto inserido" ,
                id : dados[0]
            } ) 
        })
        .catch( next )
}  )


app.put( "/product/:idProd"  , (req, res, next)=>{
    const idProd = req.params.idProd
    conn( "produto" )
        .where( "id" , idProd )
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next(errors( 404 , "Erro ao editar") )
            }
            res.status(200).json( {
                resposta : "Produto atualizado" 
            } ) 
        })
        .catch( next )
}  )


app.delete( "/product/:idProd"  , (req, res, next)=>{
    const id = req.params.idProd
    conn( "produto" )
        .where( "id" , id )
        .delete()
        .then( dados => {
            if( !dados ){
                return next(errors( 404 , "Erro ao tentar excluir") )
            }
            res.status(200).json( {
                resposta : "Produto excluido" 
            } ) 
        } )
        .catch( next )
}  )

app.get( "/category"  , (req, res, next)=>{
    conn( "categoria" )
        .then( dados => res.json( dados ) )
        .catch( next )
}  )

app.get( "/category/last"  , (req, res, next)=>{
    conn( "categoria" )
        .orderBy("id" , "desc")
        .first()
        .then( dados => res.json( dados ) )
        .catch( next )
}  )


app.get( "/category/:idCat"  , (req, res, next)=>{
    const id = req.params.idCat
    conn( "categoria" )
        .where( "id" , id )
        .first()
        .then( dados => res.json( dados ) )
        .catch( next )
}  )


app.post( "/category"  , (req, res, next)=>{
    conn( "categoria" )
        .insert( req.body )
        .then( dados => {
            if( !dados ){
                return next(errors( 404 , "Erro ao inserir") )
            }
            res.status(201).json( {
                resposta : "Categoria inserida" ,
                id : dados[0]
            } ) 
        })
        .catch( next )
}  )


app.put( "/category/:idCat"  , (req, res, next)=>{
    const id = req.params.idCat
    conn( "categoria" )
        .where( "id" , id )
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next(errors( 404 , "Erro ao editar") )
            }
            res.status(200).json( {
                resposta : "Categoria atualizada" 
            } ) 
        })
        .catch( next )
}  )


app.delete( "/category/:idCat"  , (req, res, next)=>{
    const id = req.params.idCat
    conn( "categoria" )
        .where( "id" , id )
        .delete()
        .then( dados => {
            if( !dados ){
                return next(errors( 404 , "Erro ao tentar excluir") )
            }
            res.status(200).json( {
                resposta : "Categoria excluida" 
            } ) 
        } )
        .catch( next )
}  )

app.listen( PORT , ()=>{
    console.log( `Loja executando em: http://${HOSTNAME}:${PORT}`)
} )
