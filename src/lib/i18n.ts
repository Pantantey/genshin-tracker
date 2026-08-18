/**
 * Lightweight UI dictionary for the two supported languages.
 *
 * Default is English; Spanish is opt-in via the Header language dropdown.
 * Item names (characters/weapons) come from the import data and are never
 * translated, and "Pity" is intentionally kept as-is. No i18n library is
 * needed: the project only has two pages, and the keys below cover every
 * user-visible string.
 */
export type Language = "en" | "es";

interface Entry {
  en: string;
  es: string;
}

export const messages = {
  // Header
  "header.nav": { en: "Main navigation", es: "Navegación principal" },
  "header.language": { en: "Language", es: "Idioma" },
  "header.themeGroup": { en: "Color theme", es: "Tema de color" },
  "header.themeToDark": { en: "Switch to dark mode", es: "Cambiar a modo oscuro" },
  "header.themeToLight": { en: "Switch to light mode", es: "Cambiar a modo claro" },
  "header.import": { en: "Import", es: "Importar" },

  // Banners
  "banner.character": { en: "Character Banner", es: "Banner de personaje" },
  "banner.weapon": { en: "Weapon Banner", es: "Banner de armas" },
  "banner.standard": { en: "Standard Banner", es: "Banner estándar" },
  "banner.tabsLabel": { en: "Wish banner", es: "Banner de deseos" },

  // Summary (Pity is never translated)
  "summary.aria": { en: "Summary", es: "Resumen" },
  "summary.pity4": { en: "4★ Pity", es: "4★ Pity" },
  "summary.pity5": { en: "5★ Pity", es: "5★ Pity" },
  "summary.nextFive": { en: "Next 5★", es: "Próximo 5★" },
  "summary.totalWishes": { en: "Total Wishes", es: "Total de deseos" },
  "summary.uid": { en: "UID", es: "UID" },
  "summary.lastUpdate": { en: "Last update", es: "Última actualización" },
  "summary.guaranteed": { en: "Guaranteed featured", es: "Promo garantizado" },
  "summary.fiftyFifty": { en: "50/50", es: "50/50" },

  // Home / wish history
  "home.loading": { en: "Loading wish history…", es: "Cargando historial de deseos…" },
  "home.emptyTitle": { en: "No wish history yet", es: "Aún no hay historial de deseos" },
  "home.emptyBefore": { en: "Head to the", es: "Ve a la" },
  "home.emptyLink": { en: "Import page", es: "página de importación" },
  "home.emptyAfter": { en: "to add your Genshin wish history.", es: "para añadir tu historial de deseos de Genshin." },

  "history.title": { en: "Wish history", es: "Historial de deseos" },
  "history.empty": {
    en: "No 4★ or 5★ wishes recorded for this banner yet.",
    es: "Aún no hay deseos de 4★ o 5★ registrados para este banner.",
  },
  "history.rarity": { en: "Rarity", es: "Rareza" },
  "history.icon": { en: "Icon", es: "Icono" },
  "history.name": { en: "Name", es: "Nombre" },
  "history.pity": { en: "Pity", es: "Pity" },
  "history.date": { en: "Date", es: "Fecha" },

  "pager.previous": { en: "Previous", es: "Anterior" },
  "pager.next": { en: "Next", es: "Siguiente" },

  "pull.title": { en: "Pull history", es: "Historial de tiradas" },
  "pull.filterLabel": { en: "Filter pulls", es: "Filtrar tiradas" },
  "pull.all": { en: "All", es: "Todas" },
  "pull.empty": {
    en: "No pulls match this filter yet.",
    es: "Aún no hay tiradas que coincidan con este filtro.",
  },
  // Footer
  "footer.resources": { en: "Resources", es: "Recursos" },
  "footer.disclaimer": {
    en: "Genshin Impact and all related game assets are the property of HoYoVerse and their respective owners. This is an unofficial, fan-made project.",
    es: "Genshin Impact y todos los recursos del juego son propiedad de HoYoVerse y sus respectivos dueños. Este es un proyecto no oficial hecho por fans.",
  },
  "footer.support": { en: "Support", es: "Apoyo" },
  "footer.donate": { en: "Donate via PayPal", es: "Donar vía PayPal" },
  "footer.coffee": { en: "Buy me a coffee", es: "Invítame un café" },
  "footer.contact": { en: "Contact", es: "Contacto" },
  "footer.tagline": {
    en:
      "genshintracker is an unofficial fan-made website for Genshin Impact. All game assets and trademarks belong to their respective owners.",
    es:
      "genshintracker es un sitio no oficial hecho por fans de Genshin Impact. Todos los recursos y marcas del juego pertenecen a sus respectivos dueños.",
  },

  // Import page
  "import.title": { en: "Import Wish History", es: "Importar historial de deseos" },
  "import.subtitle": {
    en: "Follow these steps in order to import your Genshin Impact wish history.",
    es: "Sigue estos pasos en orden para importar tu historial de deseos de Genshin Impact.",
  },
  // Privacy / data notices shown under the Import page title
  "import.privacyNotice": {
    en: "IMPORTANT: This website does not collect any information about anyone. Your information is stored only in your browser. If you clear the cache, it will disappear.",
    es: "IMPORTANTE: Este sitio web no recolecta ninguna información sobre nadie, tu información se guarda en tu navegador. Si borras el caché se va a desaparecer.",
  },
  "import.reminderNotice": {
    en: "Reminder: Genshin's wish history only includes data from the last 6 months.",
    es: "Recordatorio de que el historial de genshin solo trae los datos de los ultimos 6 meses.",
  },
  "import.step1Title": {
    en: "This import currently works only on PC",
    es: "Esta importación actualmente solo funciona en PC",
  },
  "import.step1Body": {
    en: "The helper script requires desktop tools, so it cannot be used on mobile or console at the moment.",
    es: "El script de ayuda requiere herramientas de escritorio, por lo que de momento no se puede usar en móvil o consola.",
  },
  "import.step2Title": { en: "Open Genshin Impact", es: "Abre Genshin Impact" },
  "import.step2Body": {
    en: "Launch the game on your PC and log into your account.",
    es: "Inicia el juego en tu PC e inicia sesión con tu cuenta.",
  },
  "import.step3Title": { en: "Open your Wish history", es: "Abre tu historial de deseos" },
  "import.step3Body": {
    en: "Go to the Wish screen, open the wish history, and wait until it has fully loaded.",
    es: "Ve a la pantalla de Deseos, abre el historial de deseos y espera a que cargue por completo.",
  },
  "import.step4Title": { en: "Copy the following script", es: "Copia el siguiente script" },
  "import.step4Before": {
    en: "You can view the content of the script",
    es: "Puedes ver el contenido del script",
  },
  "import.here": { en: "here", es: "aquí" },
  "import.scriptAria": { en: "Helper script to copy", es: "Script de ayuda para copiar" },
  "import.step5Title": { en: "Check what the script does", es: "Comprueba qué hace el script" },
  "import.step5Body": {
    en: "Ask ChatGPT or another trusted AI whether this script is safe or could be harmful or dangerous to run before using it.",
    es: "Pregunta a ChatGPT u otra IA de confianza si este script es seguro o si podría ser dañino o peligroso de ejecutar antes de usarlo.",
  },
  "import.step6Title": { en: "Open PowerShell", es: "Abre PowerShell" },
  "import.step6Body": {
    en: "Open a PowerShell window from your PC's Start menu (or type “PowerShell” in the search box).",
    es: "Abre una ventana de PowerShell desde el menú de inicio de tu PC (o escribe “PowerShell” en el cuadro de búsqueda).",
  },
  "import.step7Title": { en: "Paste the script into PowerShell", es: "Pega el script en PowerShell" },
  "import.step7Body": {
    en: "Paste the script from step 4 into the PowerShell window and press Enter.",
    es: "Pega el script del paso 4 en la ventana de PowerShell y pulsa Enter.",
  },
  "import.step8Title": { en: "Paste the link here", es: "Pega el enlace aquí" },
  "import.step8Body": {
    en: "PowerShell returns a wish-history link and copies it to your clipboard automatically. Just paste it (Ctrl+V) in the field below, then click Import.",
    es: "PowerShell devuelve un enlace de historial de deseos y lo copia a tu portapapeles automáticamente. Solo pégalo (Ctrl+V) en el campo de abajo y haz clic en Importar.",
  },
  "import.step9Title": { en: "Go to the main page", es: "Ir a la página principal" },
  "import.step9Body": {
    en: "Once the import finishes, head back to the tracker to see your history, pity and statistics.",
    es: "Cuando termine la importación, vuelve al rastreador para ver tu historial, tu Pity y tus estadísticas.",
  },
  "import.step9Button": { en: "Go to the main page", es: "Ir a la página principal" },

  // Import form
  "form.placeholder": {
    en: "Paste the link PowerShell returned here",
    es: "Pega aquí el enlace que devolvió PowerShell",
  },
  "form.ariaLabel": { en: "Wish history URL", es: "URL del historial de deseos" },
  "form.import": { en: "Import", es: "Importar" },
  "form.importing": { en: "Importing…", es: "Importando…" },
  "form.completed": { en: "Import completed", es: "Importación completada" },
  "form.addedWish": { en: "new wish added", es: "nuevo deseo añadido" },
  "form.addedWishes": { en: "new wishes added", es: "nuevos deseos añadidos" },
  "form.already": { en: "already present", es: "ya presentes" },
  "form.duplicates": { en: "duplicates within this run", es: "duplicados en esta ejecución" },
  "form.invalid": { en: "unreadable records skipped", es: "registros ilegibles omitidos" },
  "form.noData": { en: "No data for banners:", es: "Sin datos para los banners:" },
  "form.warning": { en: "warning", es: "aviso" },
  "form.warnings": { en: "warnings", es: "avisos" },
  "form.duringImport": { en: "during import:", es: "durante la importación:" },
  "form.failed": { en: "Import failed.", es: "Error de importación." },

  // Copy button
  "copy.script": { en: "Copy script", es: "Copiar script" },
  "copy.copied": { en: "Copied", es: "Copiado" },
} as const satisfies Record<string, Entry>;

export type TranslationKey = keyof typeof messages;

export function translate(key: TranslationKey, lang: Language): string {
  return messages[key][lang];
}