const grid = new Muuri('.grid', {
	 layout: {
    
   		 rounding: false
  }

});

window.addEventListener('load', () => {
	grid.refreshItems().layout(); // acomoda el tamaño
	document.getElementById('grid').classList.add('imagenes-cargadas');

	

	// Agregamos los listener de los enlaces para filtrar por categoría.

	const enlaces = document.querySelectorAll('#categorias a'); // trae todos los enlaces del id categorias

	enlaces.forEach((elemento) => { // accedo al elemento de cada enlace
			elemento.addEventListener('click', (evento) => {
					evento.preventDefault(); // previene lo que viene por default el navegador
					enlaces.forEach((enlace) => {
						enlace.classList.remove('activo')
					});
					evento.target.classList.add('activo'); // Target: significa que me muestra cual fue dado el click.	
			
					const categoria = evento.target.innerHTML.toLowerCase();
					categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);// me filtra por categoria al hacerle el target // El if se puede reemplazar por ? : 
			});
	});


	// Agregamos el listener para la barra de busqueda

	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => 
			item.getElement().dataset.etiquetas.includes(busqueda) );  // Por cada item del html me va traer todas las etiquetas de los data de cada imagen.
		
	});

	//Agregamos el listener para las imagenes

	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {// accedo a todas las imagenes que se encuentran dentro de item y dentro de grid.
		
		
		elemento.addEventListener('click', () => {

				const ruta = elemento.getAttribute('src'); // obtengo la ruta de las imagenes
				const descripcion = elemento.parentNode.parentNode.dataset.descripcion; // accedo a la descripcion de las imagenes
				overlay.classList.add('activo');
				document.querySelector('#overlay img').src = ruta;
				document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	}); 


	// EventListenner del boton de cerrar

	document.querySelector('#btn-cerrar-popup').addEventListener('click',() => {
			overlay.classList.remove('activo');
	});


	// EventListenner del overlay

	overlay.addEventListener('click', (evento) => {
		
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : ''; // si yo identifique que el id es el overlay entonces quiero que me borre la clase activo
	});
});