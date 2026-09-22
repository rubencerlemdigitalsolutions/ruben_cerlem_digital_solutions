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
