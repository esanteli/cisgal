# Instalación y Configuración del Proyecto

## Requisitos Previos
- Node.js instalado (versión 14 o superior)
- npm o yarn

## Pasos de Instalación

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
El archivo `.env` ya está creado con las claves de reCAPTCHA configuradas. 

**Nota importante**: Si deseas habilitar el envío real de emails, necesitas configurar `EMAIL_PASSWORD` en el archivo `.env` con una contraseña de aplicación de Gmail.

Para obtener una contraseña de aplicación de Gmail:
1. Ve a tu cuenta de Google
2. Activa la verificación en dos pasos
3. Genera una contraseña de aplicación
4. Coloca esa contraseña en el archivo `.env` como `EMAIL_PASSWORD`

### 3. Ejecutar el Proyecto

#### Desarrollo (Cliente + Servidor)
```bash
npm run dev
```

Esto iniciará:
- **Cliente React**: http://localhost:3000
- **Servidor Express**: http://localhost:3001

#### Solo Cliente
```bash
npm run dev:client
```

#### Solo Servidor
```bash
npm run dev:server
```

### 4. Construir para Producción
```bash
npm run build
```

## Funcionalidades Implementadas

### Componente ContactModal
- ✅ Selección de tipo de interés (Mantención, Servicios, Solo comunicarnos)
- ✅ Despliegue condicional de productos según el interés seleccionado
- ✅ Validación de formularios
- ✅ Integración con reCAPTCHA v2 Invisible
- ✅ Integración con backend Express
- ✅ Feedback visual durante el envío
- ✅ Manejo de errores

### Backend Express
- ✅ Endpoint `/api/contact` para recibir formularios
- ✅ Verificación de reCAPTCHA
- ✅ Validación de datos
- ✅ Simulación de envío de email (modo desarrollo)
- ✅ Envío real de email (modo producción con EMAIL_PASSWORD configurado)

## Estructura del Proyecto

```
cisgal_web/
├── src/
│   ├── components/
│   │   └── ContactModal.jsx      # Componente principal del modal
│   ├── hooks/
│   │   └── useContactModal.js    # Hook personalizado para manejar el modal
│   └── main.jsx                   # Punto de entrada de React
├── server/
│   └── index.js                   # Servidor Express y API
├── assets/                        # Recursos estáticos (CSS, imágenes, etc.)
├── *.html                         # Páginas HTML del sitio
├── .env                           # Variables de entorno (no versionado)
└── package.json                   # Dependencias del proyecto
```

## Uso del Modal

El modal de contacto se inicializa automáticamente en todas las páginas HTML. Todos los elementos con los atributos `data-bs-toggle="modal"` y `data-bs-target="#contactModal"` abrirán automáticamente el nuevo componente React.

## Modo de Simulación vs Producción

### Modo Desarrollo (NODE_ENV=development)
- Los emails se muestran en la consola del servidor
- No se requiere EMAIL_PASSWORD
- Ideal para pruebas

### Modo Producción (NODE_ENV=production)
- Los emails se envían realmente a `Cisgal.spci@gmail.com`
- Requiere EMAIL_PASSWORD configurado
- reCAPTCHA se verifica en el servidor

## Solución de Problemas

### El modal no aparece
- Verifica que el script `/src/main.jsx` esté incluido en las páginas HTML
- Verifica que React esté instalado correctamente (`npm install`)
- Abre la consola del navegador para ver errores

### Error de conexión con la API
- Verifica que el servidor Express esté corriendo (puerto 3001)
- Verifica el proxy en `vite.config.js`
- Verifica que CORS esté habilitado en el servidor

### reCAPTCHA no funciona
- Verifica que las claves en `.env` sean correctas
- Verifica que el dominio esté registrado en Google reCAPTCHA Console
- Verifica que el script de reCAPTCHA se cargue correctamente



