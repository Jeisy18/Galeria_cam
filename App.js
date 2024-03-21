import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web'

const ImageScreen = () => {

const [image, setImage]= useState('https://via.placeholder.com/200')

const selectImage =() =>{

    const options={
    title: 'Selecionar una imagen',
    storageOptions:{
        skipBackup: true,
        path: 'images'
    }
}
    launchImagenLibrary(options, response => {
        if(response.errorCode){
            console.log(response.errorMensage)
        } else if (response.didCancel){
            console.log('El usuario canceló la selección')
        } else{
            const path = response.assets[0].uri
            setImage(path)
        }
    })
    }
     const takePicture = () => {
        const options={
            title: 'Tomar una imagen',
            storageOptions:{
                skipBackup: true,
                path: 'images'
            },
            incluideBade64: true,

     }
     launchCamera(options,response =>{

        if(response.errorCode){
            console.log(response.errorMensage)
        }else if(response.didCancel){
            console.log('el usario canceló la fotografía')
        }else{
            const uri = response.assets[0].uri
            setImage(uri)
        }
     })
    }


  return (
    <View style = {{flex: 1, justifyContent: 'center'}}>
      <Button
       title = "Seleccionar Imagen"
       onPress = {selectImage}

      />
      <Button
       title = "Tomar fotografía"
       onPress = {takePicture}
       />

      <Image
            style = {{
                alignSelf: 'center',
                height: 200,
                with: 200
            }}
            source = {{uri:image}}
      />
    </View>
  )
}

export default ImageScreen