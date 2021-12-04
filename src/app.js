const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const {geocode}=require('./utils/geocode')
const {forecast}=require('./utils/forecast')

//define path for express config
const viewsPath= path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebats engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'weather app',
    name:'Goga Okradze'
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Goga Okradze'

  })
})
app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    name:'Goga Okradze',
    helpMessage:'haha no help for ya'
  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.address){
     return res.send({
       error:'You must provide address'
     })
  }
  geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
    if(error){
      return res.send({
        error
      })
    } 
    forecast(longitude,latitude, (error, forecastData) => {
      if(error){
        return res.send({
          error
        })
      }
      res.send({
        location:location,
        forecast:forecastData,
        address:req.query.address
      })
 
    })
  })



})

app.get('/products',(req,res)=>{
  if(!req.query.search){
     return res.send({
       error:'you must provide a search term'
     })
  }
  res.send({
    products:[]
  })
})






app.get('/help/*',(req,res)=>{
   res.render('error',{
      title:404,
      text:'Help page not found.'
   })
})
app.get('*',(req,res)=>{
   res.render('error',{
     title:404,
     text:'Page not found.'
   })
})


app.listen(3000,()=>{
  console.log('Server is up on 3000')
})