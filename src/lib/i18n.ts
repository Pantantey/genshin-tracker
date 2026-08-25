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
  "header.builds": { en: "Builds", es: "Builds" },

  // Builds page
  "builds.title": { en: "Builds", es: "Builds" },
  "builds.tabsLabel": { en: "Build sections", es: "Secciones del build" },
  "builds.filterElement": { en: "Element", es: "Elemento" },
  "builds.filterWeapon": { en: "Weapon type", es: "Tipo de arma" },
  "builds.search": { en: "Search by name", es: "Buscar por nombre" },
  "builds.all": { en: "All", es: "Todos" },
  "builds.empty": { en: "No characters match these filters.", es: "Ningún personaje coincide con estos filtros." },
  "builds.element": { en: "Element", es: "Elemento" },
  "builds.weaponType": { en: "Weapon", es: "Arma" },
  "builds.comingSoon": { en: "Coming soon", es: "Proximamente" },
  "builds.tab.character": { en: "Character", es: "Personaje" },
  "builds.tab.weapons": { en: "Best Weapons", es: "Mejores Armas" },
  "builds.tab.artifacts": { en: "Artifacts & Stats", es: "Artefactos y Stats" },
  "builds.tab.talents": { en: "Talents", es: "Talentos" },
  "builds.priorityStats": { en: "PRIORITY SUB-STATS", es: "SUB-ESTADÍSTICAS PRIORITARIAS" },
  "builds.recommendedStats": { en: "RECOMMENDED STATS", es: "ESTADÍSTICAS RECOMENDADAS" },
  "builds.bestArtifact": { en: "Best Artifact", es: "Mejor Artefacto" },
  "builds.statSand": { en: "Sands", es: "Reloj" },
  "builds.statGoblet": { en: "Goblet", es: "Cáliz" },
  "builds.statCirclet": { en: "Circlet", es: "Corona" },
  "builds.talentsTitle": { en: "RECOMMENDED TALENT LEVELS", es: "NIVELES DE TALENTO RECOMENDADOS" },
  "builds.talentNormal": { en: "Normal attack", es: "Ataque normal" },
  "builds.talentElemental": { en: "Elemental Skill", es: "Habilidad Elemental" },
  "builds.talentUltimate": { en: "Ultimate", es: "Definitiva" },
  "builds.bestOption": { en: "BEST OPTION", es: "MEJOR OPCIÓN" },

  // Weapons
  "weapons.absolution.mainStat": { en: "Main damage", es: "Daño principal" },
  "weapons.absolution.secondaryStat": { en: "Secondary damage", es: "Daño secundario" },
  "weapons.absolution.description": { en: "Small description of the weapon.", es: "Pequeña descripción del arma." },
  "weapons.engulfing_lightning.mainStat": { en: "ENERGY RECHARGE 55.1%", es: "RECARGA DE ENERGÍA 55.1%" },
  "weapons.engulfing_lightning.secondaryStat": { en: "ATK 608", es: "ATQ 608" },
  "weapons.engulfing_lightning.description": { en: "Turns Energy Recharge into a large attack bonus.", es: "Transforma la recarga de energía en una gran bonificación de ataque." },
  "weapons.symphonist_of_scents.mainStat": { en: "CRIT DMG 66.2%", es: "DAÑO CRÍTICO 66.2%" },
  "weapons.symphonist_of_scents.secondaryStat": { en: "ATK 608", es: "ATQ 608" },
  "weapons.symphonist_of_scents.description": { en: "Grants attack bonuses on and off the field.", es: "Otorga bonificaciones de ataque dentro y fuera del campo." },
  "weapons.skyward_spine.mainStat": { en: "ENERGY RECHARGE 36.8%", es: "RECARGA DE ENERGÍA 36.8%" },
  "weapons.skyward_spine.secondaryStat": { en: "ATK 674", es: "ATQ 674" },
  "weapons.skyward_spine.description": { en: "Increases Critical Rate and normal attack speed.", es: "Aumenta la probabilidad de crítico y la velocidad de ataque normal." },
  "weapons.favonius_lance.mainStat": { en: "ENERGY RECHARGE 30.6%", es: "RECARGA DE ENERGÍA 30.6%" },
  "weapons.favonius_lance.secondaryStat": { en: "ATK 565", es: "ATQ 565" },
  "weapons.favonius_lance.description": { en: "Creates elemental particles on a critical hit.", es: "Crea partículas elementales al asestar 1 golpe crítico." },
  "weapons.frostbreath.mainStat": { en: "ENERGY RECHARGE 45.9%", es: "RECARGA DE ENERGÍA 45.9%" },
  "weapons.frostbreath.secondaryStat": { en: "ATK 510", es: "ATQ 510" },
  "weapons.frostbreath.description": { en: "Increases ATK and regenerates elemental energy for other party members.", es: "Aumenta el ataque y regenera energía elemental para los demás miembros del equipo." },
  "weapons.crimson_moons_semblance.mainStat": { en: "CRIT RATE 22.1%", es: "PROB. CRÍTICO 22.1%" },
  "weapons.crimson_moons_semblance.secondaryStat": { en: "ATK 674", es: "ATQ 674" },
  "weapons.crimson_moons_semblance.description": { en: "Grants a damage increase based on the Bond of Life mechanic.", es: "Otorga un aumento de daño basado en la mecánica de Pacto Vital." },
  "weapons.staff_of_the_scarlet_sands.mainStat": { en: "CRIT RATE 44.1%", es: "PROB. CRÍTICO 44.1%" },
  "weapons.staff_of_the_scarlet_sands.secondaryStat": { en: "ATK 542", es: "ATQ 542" },
  "weapons.staff_of_the_scarlet_sands.description": { en: "Converts the wielder's Elemental Mastery into bonus ATK.", es: "Convierte la Maestría Elemental del portador en Ataque adicional." },
  "weapons.staff_of_homa.mainStat": { en: "CRIT DMG 66.2%", es: "DAÑO CRÍTICO 66.2%" },
  "weapons.staff_of_homa.secondaryStat": { en: "ATK 608", es: "ATQ 608" },
  "weapons.staff_of_homa.description": { en: "Increases Max HP and grants an ATK bonus based on a portion of the wielder's Max HP.", es: "Incrementa la Vida Máxima y otorga un bono de Ataque basado en una parte de la vida máxima del portador." },
  "weapons.primordial_jade_winged_spear.mainStat": { en: "CRIT RATE 20.1%", es: "PROB. CRÍTICO 20.1%" },
  "weapons.primordial_jade_winged_spear.secondaryStat": { en: "ATK 590", es: "ATQ 590" },
  "weapons.primordial_jade_winged_spear.description": { en: "Gains stacks on hit; deals bonus damage at max stacks.", es: "Otorga acumulaciones al golpear enemigos y causa daño adicional al llegar al máximo." },
  "weapons.missive_windspear.mainStat": { en: "ATK 41.3%", es: "ATQ 41.3%" },
  "weapons.missive_windspear.secondaryStat": { en: "ATK 510", es: "ATQ 510" },
  "weapons.missive_windspear.description": { en: "Increases ATK and Elemental Mastery when triggering an elemental reaction.", es: "Aumenta el ataque y la maestría elemental al causar una reacción elemental." },

  "weapons.whitelake_frostfeather.mainStat": { en: "CRIT RATE 22.1%", es: "PROB. CRÍTICO 22.1%" },
  "weapons.whitelake_frostfeather.secondaryStat": { en: "ATK 674", es: "ATQ 674" },
  "weapons.whitelake_frostfeather.description": { en: "Increases the wielder's ATK and grants Crit DMG and Energy when triggering stellar reactions.", es: "Aumenta el ataque del portador y otorga daño crítico y energía al activar reacciones estelares." },
  "weapons.primordial_jade_cutter.mainStat": { en: "CRIT RATE 44.1%", es: "PROB. CRÍTICO 44.1%" },
  "weapons.primordial_jade_cutter.secondaryStat": { en: "ATK 542", es: "ATQ 542" },
  "weapons.primordial_jade_cutter.description": { en: "Increases the character's Max HP and grants an ATK bonus based on part of their Max HP.", es: "Aumenta la Vida Máx. del personaje y otorga un bono de ataque basado en parte de su Vida Máx." },
  "weapons.azurelight.mainStat": { en: "CRIT RATE 22.1%", es: "PROB. CRÍTICO 22.1%" },
  "weapons.azurelight.secondaryStat": { en: "ATK 674", es: "ATQ 674" },
  "weapons.azurelight.description": { en: "Increases base ATK after using an Elemental Skill, raising ATK and Crit DMG further if the character has 0 elemental energy.", es: "Aumenta el ataque base tras usar una Habilidad Elemental, aumentando más el ATK y el daño crítico si el personaje tiene 0 de energía elemental." },
  "weapons.emberwell.mainStat": { en: "ELEMENTAL MASTERY 165", es: "MAESTRÍA ELEMENTAL 165" },
  "weapons.emberwell.secondaryStat": { en: "ATK 510", es: "ATQ 510" },
  "weapons.emberwell.description": { en: "Increases ATK and the damage of stellar reactions when triggered.", es: "Aumenta el Ataque y el daño de las reacciones estelares al activarla." },
  "weapons.finale_of_the_deep.mainStat": { en: "ATK 27.6%", es: "ATQ 27.6%" },
  "weapons.finale_of_the_deep.secondaryStat": { en: "ATK 565", es: "ATQ 565" },
  "weapons.finale_of_the_deep.description": { en: "Increases ATK and applies Bond of Life. Removing the Bond grants more ATK.", es: "Aumenta el Ataque y aplica Pacto Vital. Quitar el Pacto Vital otorga más ataque." },
  "weapons.a_teaspoon_of_transcendence.mainStat": { en: "CRIT DMG 44.1%", es: "DAÑO CRÍTICO 44.1%" },
  "weapons.a_teaspoon_of_transcendence.secondaryStat": { en: "ATK 674", es: "ATQ 674" },
  "weapons.a_teaspoon_of_transcendence.description": { en: "Increases ATK and boosts stellar reaction damage when using Charged Attacks.", es: "Aumenta el Ataque y potencia el daño de las reacciones estelares al usar Ataques Cargados." },
  "weapons.a_thousand_blazing_suns.mainStat": { en: "ATK 41.3%", es: "ATQ 41.3%" },
  "weapons.a_thousand_blazing_suns.secondaryStat": { en: "ATK 510", es: "ATQ 510" },
  "weapons.a_thousand_blazing_suns.description": { en: "Grants ATK and Crit DMG boosts that strengthen when using Nightsoul's Blessing.", es: "Otorga mejoras de ataque y daño crítico que se potencian al usar Bendición Noctámbula." },
  "weapons.redhorn_stonethresher.mainStat": { en: "CRIT RATE 11.0%", es: "PROB. CRÍTICO 11.0%" },
  "weapons.redhorn_stonethresher.secondaryStat": { en: "ATK 741", es: "ATQ 741" },
  "weapons.redhorn_stonethresher.description": { en: "Increases DEF. Defense increases the damage of normal and charged attacks.", es: "Aumenta la DEF. La defensa incrementa el daño de los ataques normales y cargados." },
  "weapons.mailed_flower.mainStat": { en: "ELEMENTAL MASTERY 110", es: "MAESTRÍA ELEMENTAL 110" },
  "weapons.mailed_flower.secondaryStat": { en: "ATK 510", es: "ATQ 510" },
  "weapons.mailed_flower.description": { en: "Increases the character's ATK and Elemental Mastery.", es: "Aumenta el Ataque y la Maestría Elemental del personaje." },
  "weapons.tidal_shadow.mainStat": { en: "ATK 41.3%", es: "ATQ 41.3%" },
  "weapons.tidal_shadow.secondaryStat": { en: "ATK 510", es: "ATQ 510" },
  "weapons.tidal_shadow.description": { en: "After receiving healing, the wielder's ATK increases.", es: "Tras recibir curación, el portador aumenta su Ataque." },

  // Weapon names
  "weapons.absolution.name": { en: "Absolution", es: "Expiadora" },
  "weapons.engulfing_lightning.name": { en: "Engulfing Lightning", es: "Luz del Segador" },
  "weapons.symphonist_of_scents.name": { en: "Symphonist of Scents", es: "Sinfonista de Aromas" },
  "weapons.skyward_spine.name": { en: "Skyward Spine", es: "Púa Celestial" },
  "weapons.favonius_lance.name": { en: "Favonius Lance", es: "Lanza de Favonius" },
  "weapons.frostbreath.name": { en: "Frostbreath", es: "Hálito Glacial" },
  "weapons.crimson_moons_semblance.name": { en: "Crimson Moon's Semblance", es: "Semblante de la Luna Carmesí" },
  "weapons.staff_of_the_scarlet_sands.name": { en: "Staff of the Scarlet Sands", es: "Báculo de las Arenas Escarlatas" },
  "weapons.staff_of_homa.name": { en: "Staff of Homa", es: "Báculo de Homa" },
  "weapons.primordial_jade_winged_spear.name": { en: "Primordial Jade Winged-Spear", es: "Halcón de Jade" },
  "weapons.missive_windspear.name": { en: "Missive Windspear", es: "Alabarda del Viento Epistolar" },
  "weapons.whitelake_frostfeather.name": { en: "Whitelake Frostfeather", es: "Pluma Invernal Lagoblanco" },
  "weapons.primordial_jade_cutter.name": { en: "Primordial Jade Cutter", es: "Cortador de Jade Primordial" },
  "weapons.azurelight.name": { en: "Azurelight", es: "Fulgor Cerúleo" },
  "weapons.emberwell.name": { en: "Emberwell", es: "Fuente de Ignición" },
  "weapons.finale_of_the_deep.name": { en: "Finale of the Deep", es: "Réquiem Abisal" },
  "weapons.a_teaspoon_of_transcendence.name": { en: "A Teaspoon of Transcendence", es: "Llave de la Trascendencia" },
  "weapons.a_thousand_blazing_suns.name": { en: "A Thousand Blazing Suns", es: "Mil Soles Abrasadores" },
  "weapons.redhorn_stonethresher.name": { en: "Redhorn Stonethresher", es: "Espadón Cornirrojo" },
  "weapons.mailed_flower.name": { en: "Mailed Flower", es: "Fierro Floriornado" },
  "weapons.tidal_shadow.name": { en: "Tidal Shadow", es: "Sombra de la Marea" },

  // Artifacts
  "artifacts.scholar.twoPieceBonus": { en: "2 piece: ", es: "2 piezas: " },
  "artifacts.scholar.fourPieceBonus": { en: "4 piece: ", es: "4 piezas: " },
  "artifacts.noblesse_oblige.twoPieceBonus": { en: "2 piece: Elemental Burst DMG +20%", es: "2 piezas: Daño de la definitiva +20%" },
  "artifacts.noblesse_oblige.fourPieceBonus": { en: "4 piece: Using an Ultimate increases all party members' ATK.", es: "4 piezas: Usar una Definitiva aumenta el ATQ de todos los miembros del equipo." },
  "artifacts.fragment_of_harmonic_whimsy.twoPieceBonus": { en: "2 piece: ATK +18%", es: "2 piezas: ATQ +18%" },
  "artifacts.fragment_of_harmonic_whimsy.fourPieceBonus": { en: "4 piece: Increases the damage dealt when increasing or decreasing the Bond of Life.", es: "4 piezas: Potencia el daño infligido al aumentar o disminuir el pacto vital." },
  "artifacts.heart_of_the_furnace.twoPieceBonus": { en: "2 piece: Increases ATK by 18%", es: "2 piezas: Aumenta el ATQ en un 18%" },
  "artifacts.heart_of_the_furnace.fourPieceBonus": { en: "4 piece: Increases the wielder's attack and boosts the stellar reaction damage of the whole team.", es: "4 piezas: Aumenta el ataque del portador y aumenta el daño de las reacciones estelares de todo el equipo." },
  "artifacts.Disenchantment_in_Deep_Shadow.twoPieceBonus": { en: "2 piece: Increases ATK by 18%", es: "2 piezas: Aumenta el ATQ en un 18%" },
  "artifacts.Disenchantment_in_Deep_Shadow.fourPieceBonus": { en: "4 piece: Increases Superconduct and Stellar Superconduct reaction damage.", es: "4 piezas: Aumenta el daño de la reacción de Superconductor y Superconductor Estelar." },

  // Artifact names
  "artifacts.scholar.name": { en: "Scholar", es: "Erudito" },
  "artifacts.noblesse_oblige.name": { en: "Noblesse Oblige", es: "Ritual Antiguo de la Nobleza" },
  "artifacts.fragment_of_harmonic_whimsy.name": { en: "Fragment of Harmonic Whimsy", es: "Fragmento de la Armonía Fantasiosa" },
  "artifacts.heart_of_the_furnace.name": { en: "Heart of the Furnace", es: "Corazón Forjado" },
  "artifacts.Disenchantment_in_Deep_Shadow.name": { en: "Disenchantment in Deep Shadow", es: "Desilusión Congelada en las Sombras" },

  // Elements
  "element.anemo": { en: "Anemo", es: "Anemo" },
  "element.cryo": { en: "Cryo", es: "Cryo" },
  "element.dendro": { en: "Dendro", es: "Dendro" },
  "element.electro": { en: "Electro", es: "Electro" },
  "element.geo": { en: "Geo", es: "Geo" },
  "element.hydro": { en: "Hydro", es: "Hydro" },
  "element.pyro": { en: "Pyro", es: "Pyro" },

  // Weapon types
  "weapon.bow": { en: "Bow", es: "Arco" },
  "weapon.catalyst": { en: "Catalyst", es: "Catalizador" },
  "weapon.claymore": { en: "Claymore", es: "Mandoble" },
  "weapon.polearm": { en: "Polearm", es: "Lanza" },
  "weapon.sword": { en: "Sword", es: "Espada" },

  // Banners
  "banner.character": { en: "Character Banner", es: "Banner de personaje" },
  "banner.weapon": { en: "Weapon Banner", es: "Banner de armas" },
  "banner.standard": { en: "Standard Banner", es: "Banner estándar" },
  "banner.tabsLabel": { en: "Wish banner", es: "Banner de deseos" },

  // Accounts (multi-account support)
  "account.selectLabel": { en: "Accounts", es: "Cuentas" },
  "account.editName": { en: "Edit account name", es: "Editar nombre de la cuenta" },
  "account.nameInput": { en: "Account name", es: "Nombre de la cuenta" },
  "account.addOrUpdate": { en: "Add or update", es: "Agregar o actualizar" },

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
  // Ko-fi support
  "ko-fi.title": {
    en: "Is Genshin-Info.site useful to you?",
    es: "¿Te resulta útil Genshin-Info.site?",
  },
  "ko-fi.body": {
    en: "It's free and your data stays local. If you want to help me keep the project updated and keep adding features, you can support it on Ko-fi.",
    es: "Es gratis y tus datos se mantienen localmente. Si quieres ayudarme a mantener el proyecto actualizado y seguir agregando funciones, puedes apoyarlo en Ko-fi.",
  },
  "ko-fi.link": { en: "Support Genshin-Info.site on Ko-fi", es: "Apoya Genshin-Info.site en Ko-fi" },
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
  "import.faq": {
    en: "Frequently Asked Questions",
    es: "Preguntas Frecuentes",
  },
  "import.faqTitle": {
    en: "Frequently asked questions",
    es: "Preguntas frecuentes",
  },
  "import.faqClose": {
    en: "Close",
    es: "Cerrar",
  },
  "import.faqQ1": {
    en: "How does it work?",
    es: "¿Cómo funciona?",
  },
  "import.faqA1": {
    en: "Everything runs in your browser. You paste your wish-history link, the tracker imports and stores it only on your device — your data never leaves your computer.",
    es: "Todo funciona en tu navegador. Pegas el enlace de tu historial de deseos y el rastreador lo importa y lo guarda solo en tu dispositivo: tus datos nunca salen de tu ordenador.",
  },
  "import.faqQ2": {
    en: "What information from my account do they keep?",
    es: "¿Qué información de mi cuenta guardan?",
  },
  "import.faqA2": {
    en: "genshin-info.site does not store any of your information, but your browser will remember your wish history as long as you don't clear your browser cache.",
    es: "genshin-info.site no guarda nada de tu información, pero tu navegador va a recordar el historial de tus deseos en caso de que no borres el caché de tu navegador.",
  },
  "import.faqQ3": {
    en: "How can I give you a Blessing of the Welkin Moon?",
    es: "¿Cómo puedo darte la Bendición de la Luna de Welkin?",
  },
  "import.faqA3": {
    en: "Go to lootbar and you can send me something using my UID. My UID is 605183325",
    es: "Ve a lootbar y puedes enviarme algo usando mi UID. Mi UID es 605183325",
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
  "import.step5Title": { en: "OPTIONAL: Check what the script does.", es: "OPCIONAL: Comprueba qué hace el script." },
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
  "form.newAccountTitle": { en: "New account", es: "Cuenta nueva" },
  "form.newAccountBody": {
    en: "UID {uid}. Do you want to add it to your tracker?",
    es: "UID {uid}. ¿Desea agregarla al rastreador?",
  },
  "form.accountExistsTitle": { en: "Account already exists", es: "Cuenta ya existente" },
  "form.accountExistsBody": {
    en: "UID {uid}. Do you want to update it?",
    es: "UID {uid}. ¿Desea actualizarla?",
  },
  "form.add": { en: "Add", es: "Agregar" },
  "form.update": { en: "Update", es: "Actualizar" },
  "form.cancel": { en: "Cancel", es: "Cancelar" },

  // Copy button
  "copy.script": { en: "Copy script", es: "Copiar script" },
  "copy.copied": { en: "Copied", es: "Copiado" },
} as const satisfies Record<string, Entry>;

export type TranslationKey = keyof typeof messages;

export function translate(key: TranslationKey, lang: Language): string {
  return messages[key][lang];
}