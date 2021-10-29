const express = require('express');
const userRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const commentsRouter = require('./routes/comments')
const postsRouter = require('./routes/posts')
const ordersRouter = require('./routes/orders')
const couponsRouter = require('./routes/coupons')

const cors = require('cors')

const app = express();
app.use((req,res,next)=>{
res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
res.setHeader('Content-Range', 'bytes : 0-9/*')
next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/comments', commentsRouter)
app.use('/posts', postsRouter)
app.use('/coupons', couponsRouter)





app.listen(7888);

