import express, {type Request, type Response} from 'express';
//import PrismaClient = require('@prisma/client');
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use( express.json() )

app.get( '/categoria' , async ( req: Request, res: Response ) => {
    const categorias = await prisma.categoria.findMany()
    res.json( categorias )
} );

app.get( '/produto' , async ( req: Request, res: Response ) => {
    const produtos = await prisma.produto.findMany({
        include : {
            categoria : true
        }
    })
    res.json( produtos )
} );