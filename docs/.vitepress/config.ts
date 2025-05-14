import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ca-ES',
  title: 'Fonaments de Programació',
  description: 'Unitat Formativa 01 - Fonaments de Programació',
  base: '/vitepress-template/',
  outDir: './dist',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/img/logo.png' }]
  ],
  themeConfig: {
    siteTitle: 'Fonaments de Programació',
    logo: '/img/logo.png',
    nav: [
      { text: '🏠 Inici', link: '/' },
      { text: '📋 Objectius', link: '/objectius' },
      { text: '📚 Continguts', items: [
        { text: '1. Introducció', link: '/introduccio' },
        { text: '2. Algoritme', link: '/algoritme' },
        { text: '3. Cicle de Vida', link: '/cicle-vida' },
        { text: "4. Representació d'Algoritmes", link: '/algoritmes' },
        { text: "5. Elements d'un Programa", link: '/elements' }
      ]}
    ],
    sidebar: [
      {
        text: '📚 Continguts',
        items: [
          { text: '📋 Objectius', link: '/objectius' },
          { text: '📚 1. Introducció', link: '/introduccio' },
          { text: '🔄 2. Algoritme', link: '/algoritme' },
          { text: '⚡ 3. Cicle de Vida', link: '/cicle-vida' },
          { text: "📊 4. Representació d'Algoritmes", link: '/algoritmes' },
          { text: "🔧 5. Elements d'un Programa", link: '/elements' },
          { text: '<img src="/vitepress-template/img/logo-gva.png" class="logo-anim" style="vertical-align:middle; height:150px; margin-top:100px;">', link: '' },
          { text: '<img src="/vitepress-template/img/logo-centro.png" class="logo-anim" style="vertical-align:middle; height:150px;">', link: '' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: '' }
    ],
    footer: {
      message: "CEEDCV - Centre Específic d'Educació a Distància de la Comunitat Valenciana",
      copyright: 'Copyright © 2024-2025'
    },
    outline: {
      label: 'En aquesta pàgina'
    },
    docFooter: {
      prev: 'Anterior',
      next: 'Següent'
    }
  }
})
