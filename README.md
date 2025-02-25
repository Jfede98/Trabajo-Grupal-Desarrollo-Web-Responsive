# Trabajo-Grupal-Desarrollo-Web-Responsive
Trabajo en Grupo para la materia de Desarrollo Web Responsive Maestria UNIR. En este proyecto se desarrollo una web llamada Eterna, un lugar destinado a explorar y comprar productos de belleza y perfumes.

---
## Flujo de la Aplicación

1. **Login**: 
   - Los usuarios comienzan en la página de inicio de sesión, donde pueden ingresar su correo electrónico.
   - El correo se guarda en `sessionStorage` y se utiliza en otras partes de la aplicación.

2. **Home**:
   - Después del login, los usuarios son redirigidos a la página de inicio, tiene un slider para ver datos de los productos.
   - También puedes encontrar una sección en donde te dice beneficios de los productos que ofrece Eterna.
   - El usuario puede ver productos destacados, un mini form con el correo que se guardó en el `sessionStorage` para susbribirse a más productos.
   - Finalmente en la parte inferior tenemos una sección con un accordion con consejos.

3. **Catálogo**:
   - En la página de catálogo, los usuarios pueden explorar todos los productos disponibles.
   - Los productos se obtienen dinámicamente de la [DummyJSON API](https://dummyjson.com/products).
   - Los usuarios pueden agregar productos a un carrito de compras y van a ver un toast que les notifica si es que se subio el producto al carrito.

4. **Contacto**:
   - En la página se indica datos de contacto para comunicarte con nosotros.
   - Hay un form para que el usuario pueda enviarnos un mensaje, usando el mismo correo que uso para iniciar sesión en el Login.

4. **Carrito**:
   - En la página del carrito, los usuarios pueden ver los productos que han agregado con su precio, imagen, categoria y nombre del producto.
   - Los datos del carrito se guardan en `localStorage`.

5. **Formulario de Facturación**:
   - Al finalizar la compra, los usuarios deben completar un formulario de facturación. Estos datos son obligatorios tienen que ser llenados para finalizar la compra.
   - Los datos del formulario se guardan en `localStorage` para futuras compras.

6. **Finalizar compra**:
   - Al dar clic al botón de finalizar compra el usuario puede ver un modal que le indica que su compra ha sido exitosa.
   - Se redirige al usuario a la pagina de catálogo.
   - El botón se encuentra deshabilitado si es que no hay ningún item en el carrito o si los datos del formularios de facturación no han sido llenados.

7. **Logout**:
   - Al cerrar sesión, se limpian todos los datos de `localStorage` y `sessionStorage`. El usuario es redirigido al Login para poder volver hacer el flujo.
  
---
## Recursos usados

- **Herramientas que ayudaron en desarrollo de la página**:
  - Visual Studio Code
  - Git y GitHub para control de versiones.
  - Fetch API para consumir datos de [DummyJSON](https://dummyjson.com/products).
  - Bootstrap
  - Recursos adicionales como artes y diseño del logo de Eterna.

---

## Capturas de Pantalla

### Página de Login
![image](https://github.com/user-attachments/assets/84d74cee-be9a-4639-832a-1622ff5939ac)

### Página de Home
![image](https://github.com/user-attachments/assets/3ca41f5b-ee76-4999-857d-baa25cfd827e)

### Página de Catálogo
![image](https://github.com/user-attachments/assets/6b60609b-3778-4635-a4c1-bd416c70b513)

### Página del Contacto
![image](https://github.com/user-attachments/assets/e92f01e2-8102-4ee8-b2f8-0c0d0bcf2593)

### Página del Carrito
![image](https://github.com/user-attachments/assets/9d85428b-eeba-4c21-afea-423c92c6e6b7)

---
