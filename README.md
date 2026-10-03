# 🪝 El Perchero Sublimados — Landing Page & Apify Integration

> **Landing page comercial, moderna y de alta conversión** desarrollada para el taller de personalización textil y productos creativos **"El Perchero Sublimados"**, construida con **React 19**, **Tailwind CSS**, **TypeScript**, **Vite** e integración nativa con la API de **Apify**.

---

## 📋 Características Principales

1. **Header Responsivo & Navegación:**
   - Logotipo de marca con diseño vectorial y degradado neón.
   - Acceso directo a secciones: *Productos*, *Catálogo*, *¿Cómo Trabajamos?*, *Diferenciales*, *Preguntas* y *Contacto*.
   - Botón interactivo de **Apify API** para inspección y prueba en vivo.
   - Botón CTA **"Cotiza tu diseño"** con animación de brillo.

2. **Hero Section de Alto Impacto:**
   - Propuesta de valor clara para streetwear, marcas independientes y empresas.
   - Indicadores de confianza: 4.9/5 estrellas, +15,000 prendas y 100% garantía.
   - Showcase fotográfico en alta resolución con iluminación neón de estudio y badges flotantes.

3. **Catálogo Destacado (Grid de 4 Líneas):**
   - **Gorras Personalizadas:** Trucker, snapback y dad hats con parches de sublimación HD.
   - **Camisetas & Joggers (Streetwear y Alta Pinta):** Cortes *oversize*, gramaje 220g+ y sublimación tacto cero.
   - **Tazas Creativas & Termos Metálicos:** Cerámica AAA, tazas mágicas y termos insulados en acero inoxidable.
   - **Artículos de Sublimación Corporativa:** Mousepads gamer XXL, lanyards, libretas y welcome packs.
   - **Modal de Vista Rápida:** Especificaciones técnicas, colores disponibles y selección directa para cotizar.

4. **Sección "¿Cómo Trabajamos?" (Proceso de 3 Pasos):**
   - Flujo secuencial: 1. Envío de idea/logo ➔ 2. Vista previa digital (mockup) ➔ 3. Producción y entrega.
   - Garantía *"Cero Sorpresas"* (aprobación previa antes de prensar).

5. **Propuesta de Valor & Diferenciales:**
   - 6 pilares de servicio y tecnología de prensa térmica industrial.
   - Tabla comparativa técnica: *Sublimación HD vs. Estampados Tradicionales / Vinilos*.

6. **Formulario de Cotización Rápida (CTA Final):**
   - Validación y estándares de accesibilidad (labels, autocomplete, tap targets).
   - Selector dinámico de producto y rangos de cantidad.
   - Carga de archivos o logotipos (PNG, JPG, PDF, AI, SVG).
   - **Doble canal de conversión:** Envío con confeti + Botón directo a WhatsApp prellenado.

7. **Integración con Apify (REST API v2):**
   - Envío de leads / cotizaciones directamente a un Dataset o Actor de Apify.
   - Modal interactivo para verificar tokens y estado de conexión en tiempo real (`/users/me`).
   - Botón para enviar una cotización de prueba y verificar el `runId` o `datasetId`.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Empaquetador:** [Vite](https://vitejs.dev/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Efectos:** Canvas Confetti
- **API Cloud & Scraping:** [Apify API v2](https://docs.apify.com/api/v2)

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone <URL_DE_TU_REPOSITORIO_GITHUB>
cd "Landing Page"
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno (Opcional para Apify)
Copia el archivo de ejemplo `.env.example` a `.env`:
```bash
cp .env.example .env
```
Edita `.env` y coloca tu token personal de Apify:
```env
VITE_APIFY_API_TOKEN=tu_token_de_apify_aqui
VITE_APIFY_ACTOR_ID=tu_actor_o_tarea_opcional
```

> **Nota:** La aplicación también permite ingresar y probar tu token de Apify directamente desde la interfaz web haciendo clic en el botón **"Apify API"** en la barra superior.

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:5173/](http://localhost:5173/)

### 5. Compilar para producción
```bash
npm run build
```

---

## 🤖 Cómo Probar la Conexión con Apify

1. Abre la landing page en tu navegador.
2. En la barra de navegación superior, haz clic en el botón **"Apify API"**.
3. Se abrirá la ventana modal de integración.
4. Ingresa tu **Personal API Token** de Apify (puedes obtenerlo gratis en [Apify Console](https://console.apify.com/account/integrations)).
5. Haz clic en **"Guardar y Probar Conexión"**:
   - Si el token es válido, se mostrará el badge verde con el nombre de usuario de tu cuenta de Apify.
   - Puedes hacer clic en **"Enviar Cotización de Prueba a Apify Dataset"** para verificar cómo se crea y registra el lead en tu almacenamiento de Apify.

---

## 📦 Enlazar a un Repositorio en GitHub

Para subir este proyecto a tu cuenta de GitHub y entregarlo al tutor:

1. Crea un nuevo repositorio vacío en [GitHub](https://github.com/new) (ejemplo: `el-perchero-sublimados-landing`).
2. En la terminal de este proyecto, ejecuta:
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

---

© 2026 **El Perchero Sublimados**. Todos los derechos reservados.
