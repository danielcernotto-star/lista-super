# Historial de versiones

## v3.0 — 04/11/2026
**Lectura y diseño**
- Tema nuevo, más suave y con más contraste: claro de día y oscuro de noche,
  según la configuración del celular.
- Letra más grande (base de 18px) y tipografía Atkinson Hyperlegible, hecha
  para leer fácil.
- Botones y casillas más grandes para tocar con el pulgar. Se puede hacer zoom.

**Búsqueda sin duplicados**
- Un solo cuadro arriba busca en **todo** el catálogo y muestra en qué lista
  está cada producto.
- Si el producto no existe, se agrega desde ahí mismo («Agregar y pedir» o
  «Solo agregar a Lista Gral»), con la categoría sugerida automáticamente.
- No se pueden crear duplicados al agregar, al renombrar ni al importar un
  ticket.

**Cantidades y precios**
- Selector de cantidad (− 1 +) en «Para comprar». El total estimado es
  cantidad × precio.
- Al marcar algo como comprado se guarda la fecha y la cantidad.
- Nuevo «✎ Editar producto»: nombre, categoría, precio a mano, historial de
  precios y eliminar.

**Ticket**
- Se puede subir el PDF del ticket (con texto reconocido, por ejemplo de
  Adobe Scan) o un .txt, además de pegar el texto.
- Toma la cantidad de cada línea y la fecha del ticket.
- Recuerda qué línea del ticket corresponde a qué producto, para asociarla
  sola la próxima vez.
- Un ticket viejo no pisa un precio más nuevo (igual queda en el historial).

**Técnico**
- Cada cambio (categoría, precio, cantidad) marca `updatedAt`, así la mezcla
  entre los dos celulares no pierde cambios.
- La app se resincroniza al volver a ella desde otra app.
- El service worker pide primero a la red: las versiones nuevas aparecen sin
  reinstalar, y la app sigue abriendo sin conexión.
- Se mantienen el mismo archivo `lista.json` en OneDrive y la misma forma de
  compartir. No hay que migrar nada.

## v2.10 — 19/10/2026
- Versión anterior: tres listas, precios por ticket pegado y detección de
  duplicados.
