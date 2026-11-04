# Lista del Súper 🛒 — Guía de instalación

App para que Daniel y Mari compartan la lista de compras del supermercado,
guardada en OneDrive. Se usa en el celular como una app instalada (PWA).

Esto solo se hace **una vez**. Después, usar la app es simplemente abrirla,
tildar y agregar productos.

Hay 2 pasos:
1. Registrar la app gratis en Microsoft (para que pueda conectarse a OneDrive).
2. Subir estos archivos a un hosting gratuito (GitHub Pages) para tener una
   dirección web fija e instalarla en el celular.

---

## Paso 1 — Registrar la app en Microsoft (~5 min)

Esto lo hace **Daniel** (o quien vaya a ser el "dueño" de la lista), con su
cuenta de Microsoft (la del plan familiar).

1. Andá a **https://portal.azure.com** e iniciá sesión con tu cuenta Microsoft.
2. Buscá **"Registros de aplicaciones"** (App registrations) y hacé clic en
   **"Nuevo registro"** (New registration).
3. Completá:
   - **Nombre**: `Lista del Super` (o lo que quieras)
   - **Tipos de cuenta admitidos**: elegí **"Cuentas en cualquier directorio
     organizativo y cuentas Microsoft personales"** (esta opción es
     imprescindible para que funcione con cuentas personales/familiares).
   - **URI de redirección**: elegí tipo **SPA (Single-page application)** y
     dejalo vacío por ahora (lo completamos en el Paso 2, cuando ya tengamos
     la dirección web final).
4. Hacé clic en **Registrar**.
5. En la pantalla del resumen de la app, copiá el valor **"Id. de
   aplicación (cliente)"** (Application (client) ID). Es un código con
   guiones, algo así como `a1b2c3d4-....`. **Guardalo**, lo vas a necesitar
   en el Paso 2.
6. En el menú de la izquierda, andá a **"Autenticación"** (Authentication):
   - Abajo, en **"Configuración avanzada"**, activá la opción
     **"Flujos de cliente público"** (Allow public client flows) → **Sí**.
   - Guardá los cambios.
7. No hace falta crear ningún secreto ni pedir permisos de administrador:
   la app pide permiso a cada usuario (vos y Mari) la primera vez que
   inician sesión.

Eso es todo en Microsoft por ahora. Vamos a terminar de configurar la
URL de redirección en el paso siguiente, una vez que sepamos la dirección
final de la app.

---

## Paso 2 — Publicar la app (GitHub Pages, gratis)

Necesitás una cuenta de GitHub (gratis, en https://github.com si no tenés).

### 2.1 Crear el repositorio
1. Entrá a GitHub → **New repository**.
2. Nombre: `lista-super` (puede ser otro nombre).
3. Dejalo **público** (necesario para GitHub Pages gratis) y creálo.

### 2.2 Subir los archivos
Subí **todos** los archivos de esta carpeta (`index.html`, `manifest.json`,
`sw.js`, la carpeta `icons/`) manteniendo la misma estructura. La forma más
fácil sin usar la terminal:
- En la página del repositorio, hacé clic en **"Add file" → "Upload
  files"**, arrastrá todos los archivos y carpetas, y confirmá el commit.

### 2.3 Activar GitHub Pages
1. En el repositorio, andá a **Settings → Pages**.
2. En "Branch", elegí `main` y la carpeta `/ (root)`. Guardá.
3. Esperá 1-2 minutos. Te va a mostrar una dirección como:
   `https://TU-USUARIO.github.io/lista-super/`
   Esa es la URL final de tu app. **Copiala**.

### 2.4 Completar el CLIENT_ID y la URL de redirección
1. Volvé a **portal.azure.com** → tu app → **Autenticación**.
2. En "Redirección URI" de tipo SPA, agregá exactamente:
   `https://TU-USUARIO.github.io/lista-super/index.html`
   (con tu URL real) y guardá.
3. En GitHub, editá el archivo `index.html` (lápiz de edición) y buscá esta
   línea cerca del principio:
   ```js
   CLIENT_ID: "PEGA_AQUI_TU_CLIENT_ID",
   ```
   Reemplazá el texto entre comillas por el **Application (client) ID** que
   copiaste en el Paso 1. Guardá los cambios (commit).

---

## Paso 3 — Primer uso

**Daniel (dueño de la lista):**
1. Abrí `https://TU-USUARIO.github.io/lista-super/` en el celular.
2. Iniciá sesión con tu cuenta Microsoft.
3. Elegí **"Soy quien creó la lista"**.
4. La app va a crear una carpeta `ListaSuperFamiliar` en tu OneDrive con el
   archivo de la lista.
5. Te va a pedir el **mail de Mari** (la cuenta Microsoft que ella usa) para
   compartirle acceso de edición automáticamente. Escribilo y tocá
   "Compartir acceso".
6. ¡Listo! Ya podés agregar productos.

**Mari (invitada):**
1. Abrí la misma dirección en su celular.
2. Iniciá sesión con **su propia cuenta Microsoft**.
3. Elegí **"Me compartieron la lista"**.
4. La app va a encontrar automáticamente el archivo compartido por Daniel.
   (Si Daniel acaba de compartirlo, puede tardar uno o dos minutos en
   aparecer — hay un botón "Reintentar".)

### Instalar como app (ícono en el celular)
- **Android (Chrome)**: al abrir la página aparece un cartel "Agregar a
  pantalla de inicio", o desde el menú ⋮ → "Instalar app".
- **iPhone (Safari)**: botón Compartir (□↑) → "Agregar a pantalla de
  inicio".

Desde ahí queda como cualquier otra app, con ícono propio.

---

## Cómo se usa día a día (v3)

La app tiene **un solo cuadro arriba para buscar y agregar**, y tres listas:
**Para comprar**, **Últ. compra** (lo que ya pusiste en el carrito) y
**Lista Gral** (todo el catálogo de productos de la casa).

- **¿Está o no está?** Escribí en el cuadro de arriba. Busca en *todo* el
  catálogo, sin importar la lista, y muestra en cuál está cada producto.
- **Pedir algo**: si aparece, tocá **+ Pedir**. Si no existe, elegí la
  categoría y tocá **Agregar y pedir**. Enter hace lo mismo.
  No se pueden crear repetidos ("Leche", "leche " y "léche" son el mismo).
- **Cantidades**: en *Para comprar* cada producto tiene − 1 +.
  El total estimado multiplica cantidad × último precio.
- **En el súper**: tocá el cuadrado ✓ cuando lo ponés en el carrito: pasa a
  *Últ. compra* y queda guardada la fecha y la cantidad comprada.
- **Al llegar a casa**: en *Últ. compra* tocá "Ya guardé todo" para devolver
  todo a *Lista Gral*.
- **Editar / borrar / precio a mano**: tocá ✎ en cualquier producto.
- **Actualizar precios con el ticket**: menú ⋮ → *Actualizar precios con un
  ticket*. Subí el PDF (por ejemplo de Adobe Scan) o pegá el texto. La app
  asocia cada línea a un producto y **recuerda la asociación** para la
  próxima vez. Guarda precio unitario, cantidad y fecha del ticket. No cambia
  en qué lista está cada producto.
- **Colores**: claro de día y oscuro de noche, según la configuración del
  celular.
- **Sincronización**: al abrir la app, al volver a ella desde otra app y al
  tocar ⟳.

## Probar una versión nueva antes de publicarla

1. **Demo (sin login):** abrí la app con `?demo` al final de la dirección.
   Usa datos de ejemplo guardados solo en ese navegador.
2. **Prueba con OneDrive:** la versión nueva va en la carpeta `beta/` del
   repo y se abre en `https://danielcernotto-star.github.io/lista-super/beta/`.
   Usa otra lista (`ListaSuperFamiliar-Prueba`), así que la real queda intacta.
   Antes, una sola vez: en portal.azure.com → la app → *Autenticación* →
   agregá la URI de redirección SPA
   `https://danielcernotto-star.github.io/lista-super/beta/`.
3. Cuando todo funciona bien, se copian los archivos de `beta/` a la raíz
   (con la ruta del ícono sin `../`) y se publica.

## Versiones

El historial de cambios está en [CHANGELOG.md](CHANGELOG.md). La versión en
uso se ve debajo del título de la app. Para actualizar, subí los archivos
nuevos a GitHub. Los celulares toman la versión nueva la próxima vez que
abren la app con conexión.

## Preguntas frecuentes

**¿Los datos quedan en algún servidor mío o de un tercero?**
No. Todo se guarda directamente en tu OneDrive personal (el archivo
`ListaSuperFamiliar/lista.json`), usando tu cuenta de Microsoft. GitHub
Pages solo aloja el código de la app (que es público, como el código, pero
sin ningún dato de tu lista).

**¿Qué pasa si los dos tildan cosas al mismo tiempo?**
La app compara versiones antes de guardar: si hay cambios de ambos lados,
los combina en vez de pisar uno con otro.

**¿Puedo agregar más categorías o cambiar los colores?**
Sí — están en `index.html`: la lista `CATEGORIES` cerca del principio del
`<script>`, y los colores en `:root{...}` (tema claro) y en `@media (prefers-color-scheme: dark)` (tema oscuro) del `<style>`. Si
querés, pedime que te ayude a modificarlas.

**¿Puede sumarse un tercer integrante?**
Sí: Daniel repite el paso de compartir con otro mail, y esa persona elige
"Me compartieron la lista" igual que Mari.
