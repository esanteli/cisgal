# Cisgal - Sitio Web Corporativo

Sitio web corporativo para la empresa Cisgal, desarrollado con tecnologías modernas y diseño responsivo.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Bootstrap 5**: Framework CSS moderno y robusto
- **SCSS Modular**: Arquitectura CSS organizada y escalable
- **JavaScript Interactivo**: Funcionalidades dinámicas y animaciones
- **SEO Optimizado**: Estructura semántica y meta tags
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 📁 Estructura del Proyecto

```
cisgal_web/
├── index.html              # Página principal
├── servicios.html          # Página de servicios
├── mantencion.html         # Página de planes de mantención
├── nosotros.html           # Página sobre nosotros
├── assets/
│   ├── css/
│   │   └── main.css        # Estilos compilados
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── images/             # Imágenes del sitio
│   └── scss/               # Archivos SCSS fuente
│       ├── variables/      # Variables SCSS
│       ├── mixins/         # Mixins reutilizables
│       ├── components/     # Componentes específicos
│       ├── layouts/        # Layouts y estructura
│       └── main.scss       # Archivo principal SCSS
├── node_modules/           # Dependencias npm
├── package.json            # Configuración del proyecto
└── README.md              # Este archivo
```

## 🎨 Paleta de Colores

- **Color Principal**: #E91718 (Rojo Cisgal)
- **Color Secundario**: #F06001 (Naranja)
- **Color de Acento**: #D8C2AA (Beige)
- **Color Oscuro**: #000000 (Negro)

### Gradientes Utilizados
- **Gradiente Principal**: #000000 → #E91718 → #F06001
- **Gradiente de Acento**: #E91718 → #F06001 → #D8C2AA
- **Gradiente Oscuro**: #000000 → #343a40

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **SCSS**: Preprocesador CSS con arquitectura modular
- **Bootstrap 5.3.2**: Framework CSS responsivo
- **JavaScript ES6+**: Funcionalidades interactivas
- **Font Awesome 6.4.0**: Iconografía

### Herramientas de Desarrollo
- **Sass**: Compilador SCSS
- **npm**: Gestor de paquetes
- **Google Fonts**: Tipografías (Inter, Poppins)

## 📱 Páginas del Sitio

### 1. Inicio (`index.html`)
- Slider principal con 3 slides
- Sección de servicios destacados
- Call-to-action
- Footer completo

### 2. Servicios (`servicios.html`)
- Grid de 6 servicios principales
- Proceso de trabajo (4 pasos)
- Sección de beneficios
- Formulario de contacto

### 3. Mantención (`mantencion.html`)
- 3 planes de mantención (Básico, Profesional, Enterprise)
- Servicios incluidos
- Proceso de mantención
- Beneficios y estadísticas

### 4. Nosotros (`nosotros.html`)
- Historia de la empresa
- Misión, visión y valores
- Equipo de trabajo (6 miembros)
- Estadísticas y certificaciones

## 🎯 Funcionalidades

### Header
- Navegación fija que se minimiza al hacer scroll
- Menú colapsable para móviles
- Efectos hover en enlaces

### Slider Principal
- 3 slides con contenido dinámico
- Controles de navegación
- Indicadores de posición
- Autoplay con pausa en hover

### Formulario de Contacto
- Modal responsivo
- Validación de campos
- Simulación de envío
- Feedback visual

### Botón WhatsApp
- Botón flotante fijo
- Enlace directo a WhatsApp
- Animaciones hover

### Efectos y Animaciones
- Scroll suave
- Animaciones de entrada
- Efectos hover en tarjetas
- Transiciones fluidas

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd cisgal_web

# Instalar dependencias
npm install

# Compilar SCSS (opcional)
npx sass assets/scss/main.scss assets/css/main.css
```

### Desarrollo
```bash
# Compilar SCSS en modo watch
npx sass --watch assets/scss/main.scss:assets/css/main.css
```

## 🎨 Personalización

### Colores
Los colores se pueden modificar en `assets/scss/variables/_colors.scss`:

```scss
$primary-color: #E91718;
$secondary-color: #F06001;
$accent-color: #D8C2AA;
$dark-color: #000000;
```

### Tipografías
Las fuentes se configuran en `assets/scss/variables/_typography.scss`:

```scss
$font-family-primary: 'Inter', sans-serif;
$font-family-secondary: 'Poppins', sans-serif;
```

### Espaciado
Los espaciados se definen en `assets/scss/variables/_spacing.scss`:

```scss
$section-padding-y: 5rem; // 80px
$section-padding-y-sm: 3rem; // 48px
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: ≥ 1200px

### Características Responsivas
- Grid adaptativo
- Navegación colapsable
- Imágenes responsivas
- Tipografía escalable
- Espaciado adaptativo

## 🚀 Optimizaciones

### Performance
- CSS minificado
- JavaScript optimizado
- Imágenes optimizadas
- Lazy loading implementado

### SEO
- Meta tags optimizados
- Estructura semántica
- Alt text en imágenes
- Schema markup preparado

### Accesibilidad
- Navegación por teclado
- Contraste adecuado
- Textos alternativos
- ARIA labels

## 🔧 Mantenimiento

### Actualización de Contenido
1. Modificar archivos HTML directamente
2. Actualizar imágenes en `assets/images/`
3. Recompilar SCSS si se modifican estilos

### Actualización de Dependencias
```bash
# Verificar actualizaciones
npm outdated

# Actualizar dependencias
npm update
```

## 📞 Soporte

Para soporte técnico o consultas sobre el sitio web:

- **Email**: info@cisgal.cl
- **Teléfono**: +56 2 2345 6789
- **WhatsApp**: +56 9 1234 5678

## 📄 Licencia

© 2024 Cisgal. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Cisgal**



