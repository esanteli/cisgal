# Changelog - Mejoras en el Sistema de Contacto

## [1.1.0] - Correcciones y Mejoras

### Corregido
- ❌ **Error de modal Bootstrap**: Eliminado código obsoleto en `assets/js/main.js` que intentaba acceder al modal Bootstrap que ya no existe (reemplazado por React)
- ❌ **Error 500 en servidor**: Mejorado manejo de errores con logging detallado para facilitar depuración
- ❌ **Mensajes de error genéricos**: Mejorados mensajes de error en frontend y backend para ser más informativos

### Mejorado
- ✅ **Logging en servidor**: Agregado logging detallado de requests y errores para facilitar debugging
- ✅ **Validación de email**: Agregada validación de formato de email en el servidor
- ✅ **Manejo de errores de email**: El servidor no falla completamente si hay problemas enviando emails, solo lo reporta
- ✅ **Mensajes de error específicos**: El frontend ahora muestra mensajes de error más descriptivos
- ✅ **Verificación de reCAPTCHA**: Mejor logging cuando la verificación de reCAPTCHA falla

### Archivos modificados
- `assets/js/main.js`: Removido código del modal Bootstrap obsoleto
- `server/index.js`: Mejorado manejo de errores y logging
- `src/components/ContactModal.jsx`: Mejorado manejo de errores y mensajes al usuario

## [1.0.0] - Implementación Inicial

### Características
- ✅ Componente React ContactModal con selección condicional de productos
- ✅ Backend Express con verificación reCAPTCHA
- ✅ Integración en todas las páginas HTML
- ✅ Sistema de simulación de emails para desarrollo



