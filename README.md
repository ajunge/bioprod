# BioProd

Directorio de productos biodinámicos y productores en Chile - Progressive Web App (PWA)

## Descripción

BioProd es una aplicación web progresiva (PWA) diseñada para crear un directorio consultable de productos biodinámicos y sus productores en Chile, basado en datos de certificación Demeter de ABD Chile.

## Tecnologías

- **React** 19.x - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server
- **PWA** - Progressive Web App con vite-plugin-pwa
- **Workbox** - Service Worker para caché offline

## Estructura del Proyecto

```
bioprod/
├── datos/                    # Datos de productos y productores
├── src/
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos del componente
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/                   # Archivos estáticos y assets PWA
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite y PWA
└── package.json             # Dependencias del proyecto
```

## Comandos

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en `http://localhost:5173`

### Build

```bash
npm run build
```

Genera la versión de producción en la carpeta `dist/`

### Preview

```bash
npm run preview
```

Previsualiza la build de producción localmente

## Características PWA

- ✅ Instalable en dispositivos móviles y desktop
- ✅ Funciona offline con Service Worker
- ✅ Caché de recursos para carga rápida
- ✅ Manifest configurado con iconos y tema
- ✅ Actualizaciones automáticas

## Datos

Los datos de productos y productores se encuentran en la carpeta `datos/`:
- `demeter_db.md` - Esquema de la base de datos
- `Listado Comercilizacion-ABDChile-2024.12.10.xlsx` - Datos fuente

## Próximos Pasos

1. Implementar lectura de datos desde el archivo Excel
2. Crear componentes para listar productos y productores
3. Añadir funcionalidad de búsqueda y filtrado
4. Diseñar interfaz de usuario responsive
5. Implementar páginas de detalle

## Licencia

ISC
