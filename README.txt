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


AJUSTE DESPLEGABLE COMPARATIVA:
- Se sustituye el select nativo por un desplegable personalizado.
- El listado de soluciones se abre siempre hacia abajo.
- Funciona igual en interfaz clara y oscura mediante las variables de tema existentes.
- Al abrir la comparativa sigue sin haber ninguna solución preseleccionada.


ADMINISTRACIÓN Y PARTE DE VENTA:
- Usuario temporal: rubencerlem
- La contraseña temporal se facilita en el mensaje de entrega, no en texto claro dentro del código.
- El primer acceso obliga a cambiar la contraseña y guarda su hash en el navegador.
- En el pie de página aparece un enlace Admin muy discreto.
- Con sesión admin aparece una barra privada con 'Abrir parte de venta'.
- Se incluyen las 3 hojas del PDF como referencia dentro del área admin.
- Se ha creado un formulario digital para datos cliente, licencia/mantenimiento, implantación y modificaciones.
- El apartado de envío queda preparado pero desactivado hasta configurar correos/servicio seguro.
- IMPORTANTE: esta autenticación es local al navegador y NO sustituye una autenticación de servidor.
  Para datos reales de clientes, configurar Cloudflare Access/Worker antes de usarlo en producción.


AJUSTE ADMIN SOLICITADO:
- Se eliminan del pie los enlaces repetidos Inicio / Comparativa / Precios / Contratar.
- Solo queda Admin, muy discreto.
- No existe ya la barra inferior larga con Admin / Abrir parte de venta / Salir.
- Abrir parte de venta y Cerrar sesión solo aparecen dentro de Admin tras iniciar sesión.
- Para cerrar sesión se vuelve a pulsar Admin y se usa Cerrar sesión.
- Se mantienen exactamente las mismas credenciales temporales.


FLUJO PDF Y ENVÍOS:
- El formulario Admin puede traspasar los datos al PDF original de 3 páginas.
- Se asigna un número interno correlativo de cliente que NO se imprime en el PDF.
- El PDF completo o cada hoja se pueden descargar desde Extraer.
- Envío cliente: descarga el PDF y prepara un borrador de correo al cliente.
- Se puede cargar después el PDF firmado devuelto por el cliente y confirmarlo.
- Envío CEGID se habilita tras confirmar el documento firmado.
- El envío directo con adjuntos queda pendiente de configurar un servicio de correo seguro.
- Se usa pdf-lib en el navegador para escribir sobre el PDF original de Microdata.


ACTUALIZACIÓN CONTACTO + ADMIN PASSWORD V2:
- Formulario público: Nombre y apellidos, Empresa opcional, Correo electrónico y Consulta.
- Los mensajes siguen enviándose a rubencerlemdigitalsolutions@gmail.com mediante FormSubmit.
- Nueva contraseña temporal de primer acceso.
- Después del primer cambio, la contraseña elegida queda como contraseña válida para accesos posteriores.
- Ya no se vuelve a mostrar Nueva contraseña / Confirmar contraseña salvo al pulsar Restablecer contraseña.
- Se añade Restablecer contraseña dentro del panel Admin una vez iniciada la sesión.


LOGIN ADMIN V3 CORREGIDO:
- Usuario: rubencerlem
- Nueva contraseña temporal alfanumérica sin símbolos especiales.
- Primer acceso: usuario + contraseña temporal -> obliga a definir contraseña propia.
- Después de guardar la contraseña propia, se vuelve al login.
- Accesos posteriores: usuario + contraseña propia -> entra directamente al panel Admin.
- Nueva contraseña / Confirmación solo vuelven a aparecer al pulsar Restablecer contraseña.
- El parte de venta no se puede abrir sin sesión Admin iniciada.


MULTISOLUCIÓN V1:
- Se añaden Contasimple by Cegid y eJornada manteniendo eFirma GO.
- Se incorpora un hub de Soluciones.
- Contasimple: funcionalidades y planes Básico, Profesional y Ultimate.
- eJornada: funcionalidades y planes Solo fichajes / Fichajes + Ausencias.
- Se mantiene el área Admin existente.
- Demo no implementada todavía; esta versión corresponde a la estructura inicial solicitada.


DEMOS V2:
- Botón Solicitar demo para Contasimple y eJornada, más acceso general desde Soluciones.
- El cliente selecciona una solución y solo ve las fechas/horas publicadas como disponibles.
- La solicitud se envía a rubencerlemdigitalsolutions@gmail.com mediante el mismo sistema del formulario de contacto.
- En Admin se añade un gestor para publicar/eliminar disponibilidades de demo.
- No se inventan fechas: hasta que Admin publique disponibilidad, el cliente verá que no hay fechas publicadas.


MULTISOLUCIÓN V3 ORDENADA:
- eFirma GO, Contasimple y eJornada quedan en bloques totalmente independientes.
- Se conserva la paleta actual en tema claro y oscuro.
- eFirma GO muestra Personal, Professional, Business y Business Plus.
- La comparativa pública solo muestra eFirma GO, Signaturit y DocuSign.
- El comparador directo solo ofrece Signaturit, DocuSign y Otros.
- En Otros se puede escribir otra solución; si existe en la base interna se recuperan sus datos.
- Se ha mejorado la presentación visual del selector de soluciones y los bloques de producto.
