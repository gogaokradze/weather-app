const request=require('request')

const forecast=(latitude,longitude,callback)=>{
  const url=`http://api.weatherstack.com/current?access_key=f0dfd8dd73b5199d99006f8dc6876189&query=${longitude},${latitude}`
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to weather services!',undefined)
    } else if(body.error){
      callback('Unable to find location!',undefined)
    }else{
      callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} degrees out.humidity is ${body.current.humidity}%`)
    }

  })
}
module.exports={
  forecast:forecast
}