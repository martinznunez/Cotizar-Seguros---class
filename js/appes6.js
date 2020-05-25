//construtor

 class Seguro {
    constructor(marca,anio,tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    
    cotizarSeguro (){
    

        let cantidad;
        const base = 2000;
    
        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        
        }
        //leer el anio
        const diferencia = new Date().getFullYear()-this.anio;
        
        //cada anio de diferencia reduce un 3% el valor
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        
    
        if(this.tipo === 'basico'){
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        return cantidad;
    
    }

}


//todo lo que se muestra en el html

class Interfaz {

    //mensaje que se imprime en el html
    mostrarMensaje (mensaje, tipo){

        const div = document.createElement('div');

        if(tipo === 'Error'){
            div.classList.add ('mensaje','Error');
        } else {
            div.classList.add ('mensaje','Correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div,document.querySelector('form-group'));

        setTimeout(function(){

            document.querySelector('.mensaje').remove();

        },3000);
    }
    mostrarResultado (seguro, total){

        const resultado = document.getElementById('resultado');
        let marca;
        
        switch (seguro.marca){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        
        const div = document.createElement('div');
        div.innerHTML = `
        
            <p class="header">Tu Resumen:</p>
            <p>Marca : ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: ${total}</p>
        `;
        const spiner = document.querySelector('#cargando img');
        spiner.style.display = 'block';
        setTimeout(function(){
            spiner.style.display = 'none';
            resultado.appendChild(div);
        },3000);
    
        
    }
    
}


//EventListener


const formulario =document.getElementById('cotizar-seguro');

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    //leer la marca seleccionada del selec
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    
    //leer el anio seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia interfaz

    const interfaz = new Interfaz();
    
    //revisamos que los campos esten completos

    if( marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        //interfaz imprimiento error
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo', 'Error');
    } else{

        //limpiar resultado anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();

        }
        const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);
        
       const cantidad = seguro.cotizarSeguro(seguro);

       //mostrar resultado
       interfaz.mostrarResultado(seguro,cantidad);
       interfaz.mostrarMensaje('cotizando...', 'exito');
    }



});



const max = new Date().getFullYear();
min = max -20;




const selectAnios = document.getElementById('anio');

for(let i = max; i > min; i--){

    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);

}
