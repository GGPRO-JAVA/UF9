# vitepress-template

Este proyecto utiliza [VitePress](https://vitepress.dev/) para documentación estática y está preparado para desplegarse automáticamente en GitHub Pages.

## Scripts principales

```bash
# Desarrollo local
yarn dev # o npm run dev

# Construcción para producción
yarn build # o npm run build

# Previsualización de la build
yarn serve # o npm run serve
```

## Estructura recomendada

- `docs/` — Contiene la configuración y el contenido de VitePress.
  - `docs/index.md` — Página principal de la documentación.
  - `docs/.vitepress/config.ts` — Configuración de VitePress.

## Despliegue en GitHub Pages

El flujo de trabajo de GitHub Actions (`.github/workflows/deploy.yml`) construye y publica automáticamente la documentación en GitHub Pages al hacer push a la rama `main`.

Asegúrate de que GitHub Pages esté configurado para servir desde la carpeta `/docs/docs/.vitepress/dist` del branch `gh-pages`.