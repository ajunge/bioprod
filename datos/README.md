# Datos BioProd

Este directorio contiene los datos de productores y productos biodinámicos de Chile.

## Estructura de Datos

### 📁 `operadores/` (31 archivos)

Cada archivo JSON representa un operador (productor/procesador) con toda su información y productos.

**Estructura de archivos:**
- Nombre de archivo: slug del nombre del operador (ej: `santa-ana.json`)
- Cada archivo contiene los datos completos del operador y sus productos

**Tipos de operadores:**
- **SPG (Sistema Participativo de Garantía)**: 10 operadores
- **Certificación Demeter**: 21 operadores

#### Ejemplo SPG:
```json
{
  "nombre": "SANTA ANA",
  "ciudad": "La Serena",
  "pais": "Chile",
  "contacto": "Eduardo Galvez",
  "whatsapp": "56968579120",
  "email": "egalvezy@hotmail.com",
  "certificacion": "En transicion",
  "fuente": "SPG",
  "tipo_fuente": "Sistema Participativo de Garantía",
  "total_productos": 10,
  "productos": [
    {
      "producto": "Chirimoyos",
      "variedad": null,
      "superficie_ha": 3.0,
      "destino": "Local",
      "observaciones": null
    }
  ]
}
```

#### Ejemplo Demeter:
```json
{
  "nombre": "Emiliana Casablanca y Cordillera",
  "certificacion": "Demeter",
  "fecha_certificacion": "2021-10-27",
  "estado_adicional": "",
  "fuente": "Demeter.net (2021)",
  "tipo_fuente": "Certificación Demeter",
  "total_productos": 2,
  "total_hectareas": 273.47,
  "productos": [
    {
      "producto": "Viñedo",
      "hectareas": 271.47
    }
  ]
}
```

### 📄 `indice_operadores.json`

Índice maestro con información resumida de todos los operadores.

```json
[
  {
    "id": "santa-ana",
    "nombre": "SANTA ANA",
    "tipo": "Sistema Participativo de Garantía",
    "certificacion": "En transicion",
    "ciudad": "La Serena",
    "total_productos": 10,
    "email": "egalvezy@hotmail.com",
    "whatsapp": "56968579120"
  }
]
```

**Campos del índice:**
- `id`: Slug único del operador
- `nombre`: Nombre completo
- `tipo`: Tipo de certificación (SPG o Demeter)
- `certificacion`: Estado de certificación
- `ciudad`: Ciudad (solo SPG)
- `total_productos`: Cantidad de productos
- `total_hectareas`: Hectáreas totales (solo Demeter)
- `email`: Email de contacto (solo SPG)
- `whatsapp`: WhatsApp de contacto (solo SPG)

## Archivos Fuente

### 📊 `Listado Comercilizacion-ABDChile-2024.12.10.xlsx`

Archivo Excel original con 3 hojas:
- **2019**: Datos históricos
- **Cert Demeter**: Operadores con certificación Demeter (2021)
- **SPG**: Sistema Participativo de Garantía (actual)

### 📝 `demeter_db.md`

Documentación de la estructura de la base de datos Demeter online.

### 📦 Archivos procesados (legacy)

- `productos.json`: Lista plana de 291 productos SPG (deprecated, usar `operadores/`)
- `operadores_demeter.json`: Lista de 21 operadores Demeter (deprecated, usar `operadores/`)

## Uso en React

Para cargar los datos en tu aplicación React:

```javascript
// Cargar el índice
import indice from './datos/indice_operadores.json'

// Cargar un operador específico
import operador from './datos/operadores/santa-ana.json'

// O dinámicamente
const cargarOperador = async (id) => {
  const data = await import(`./datos/operadores/${id}.json`)
  return data.default
}
```

## Estadísticas

- **Total operadores**: 31
- **Total productos (registros)**: 341
- **Certificación Demeter**: 21 operadores, 1,447.55 hectáreas
- **SPG en transición**: 9 operadores
- **SPG certificados**: 1 operador
- **Ciudades**: 10 diferentes
- **Productos únicos**: ~250

## Actualización de Datos

Para actualizar los datos:

1. Obtener nuevo Excel de ABD Chile
2. Ejecutar script de procesamiento Python
3. Regenerar archivos en `operadores/` e `indice_operadores.json`
