const electron = require('electron')
const {ipcRenderer} = require('electron')


// const btnSubmit = document.querySelector('#btnSubmit')
// const searchType = document.querySelector('#search')
// let imagenes =  document.querySelector('#contenido')

document.addEventListener('DOMContentLoaded',(e)=>{
    
    btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault()
        console.log('hola')
        
        if(search.value !== ''){
            
            fetch(`https://pixabay.com/api/?key=14906587-973d8c93741cbcc837d6738da&q=${search.value}`)
            .then(response => response.json())
            .then(data=>{
                ipcRenderer.send('imagenes', data)
                search.style.border =""
            
            })
        }else{
            search.style.border ="2px solid #E66E53"
          search.placeholder = 'Please type something'
        }
            
        })       
    
})

        
ipcRenderer.on('listaImagenes',(e,imagenes)=>{

        // imagenes.hits.map(imagen=>{
        //     return console.log(imagen)
        // })

        imagenes.hits.map(imagen =>{

            const images = ''
             return( 
                contenido.innerHTML = images
             )
        })
        imagenes.hits.map(imagen =>{

            const images =  `<div class="card m-2" style="width: 15rem;" >
                                <img  class="card-img-top" src="${imagen.previewURL}"/>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Downloads: ${imagen.downloads} </li>
                                    <li class="list-group-item">Views: ${imagen.views} </li>
                                    <li class="list-group-item">Likes: ${imagen.likes}</li>
                                </ul>
                            </div>`
             return( 
                contenido.innerHTML += images
           
             )
        })
        
        search.value = ''

    })

    