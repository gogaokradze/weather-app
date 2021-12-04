const request=require('request')
const geocode=(address,callback)=>{
  const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVhdGhvZnN1cGVyIiwiYSI6ImNrd25kem04dDJrencydm1qeDhyM3MwN3kifQ.EkPsN8gtqKZtT0dUpFfKpA&limit=1`
  request({url,json:true},(error,{body})=>{
     if(error){
       callback('Unable to connect to location services!',undefined)
     } else if(body.features.length === 0){
       callback('Unable to find location.Try anohter time',undefined)
     } else{
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        const location = body.features[0].place_name
        const data={
          latitude:latitude,
          longitude:longitude,
          location:location
        }
        callback(undefined,data)
     }
  })
}

module.exports={
  geocode:geocode
}