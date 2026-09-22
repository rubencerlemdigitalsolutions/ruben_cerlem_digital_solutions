RUBÉN CERLEM DIGITAL SOLUTIONS · eFirma GO

Contenido listo para sustituir/subir al repositorio:
- index.html
- css/styles.css
- js/app.js
- assets/logo-light.png
- assets/logo-dark.png

La web muestra eFirma GO como producto principal.
El catálogo anterior (Gesco3, Conta3 y Terven3) permanece en el propio index.html dentro del bloque #catalogo-anterior con la clase .legacy-hidden, por lo que no ocupa espacio ni aparece al visitante.

Para volver a mostrarlo en el futuro:
1. Editar index.html.
2. En <section id="catalogo-anterior" class="legacy-hidden"> retirar legacy-hidden.

La comparativa se despliega pulsando sobre "Comparativa de soluciones de firma electrónica".
El modo claro/oscuro conserva la preferencia del usuario mediante localStorage.


ACTUALIZACIÓN FIRMA:
- Se ha sustituido el texto 'Rubén' del teléfono por la firma manuscrita facilitada.
- La firma usa fondo transparente: tinta oscura en modo claro y blanca en modo oscuro.
- No se han modificado el resto del diseño ni el comportamiento claro/oscuro.


ACTUALIZACIÓN COMPARATIVA DIRECTA:
- Navegación simplificada: Inicio, eFirma GO, Comparativa y Precios.
- La pestaña Comparativa abre una ventana funcional.
- El cliente selecciona únicamente la solución que utiliza actualmente.
- eFirma GO queda fija en la columna derecha.
- La comparación usa exactamente los datos de la tabla facilitada.
- La tabla completa sigue disponible en la página.
- El catálogo anterior Cegid Informática 3 permanece oculto y sin ocupar espacio.


ACTUALIZACIÓN NAVEGACIÓN:
- Barra superior simplificada a: Inicio, Comparativa, Precios y Contratar.
- Se oculta la pestaña eFirma GO de la navegación, sin eliminar el contenido principal de la página.
- Contratar enlaza directamente a la sección de contacto/contratación.
- La futura navegación por catálogo (eFirma GO, Gesco3, Conta3, Terven3) queda pendiente para cuando esos productos se hagan visibles.


ACTUALIZACIÓN CONTACTO:
- Se elimina el enfoque de orientación entre planes/productos.
- El bloque de contacto se centra ahora en resolver dudas previas a la contratación de eFirma GO.


ACTUALIZACIÓN FORMULARIO DE CONTACTO:
- Se ha sustituido el botón mailto por un formulario integrado en la propia web.
- Campos: nombre, correo electrónico y consulta.
- Los mensajes se envían a rubencerlemdigitalsolutions@gmail.com mediante FormSubmit.
- La primera vez hay que enviar una prueba desde la web y confirmar el correo de activación que llegará a Gmail.
- Después de esa confirmación, los siguientes mensajes se reenvían automáticamente al correo configurado.
- El formulario mantiene al usuario dentro de la página y muestra confirmación de envío.


AJUSTE FORMULARIO VERTICAL:
- Nombre, correo electrónico y consulta aparecen en vertical.
- Los tres campos ocupan el mismo ancho.
- El campo de consulta tiene mayor altura para escribir mensajes largos.
- El botón final se llama Contactar.


AJUSTE COMPARATIVA SIN PRESELECCIÓN:
- El desplegable ya no muestra una solución seleccionada por defecto.
- Al abrir la comparativa aparece 'Selecciona tu solución'.
- La comparativa solo se genera cuando el usuario elige una solución del listado.
- Cada vez que se abre la ventana de comparativa vuelve a empezar sin selección.
