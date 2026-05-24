-- Seed: Casas LYB (cliente inicial)
-- Colores basados en la identidad de marca de EBL / Casas LYB

INSERT INTO links.clients (
  slug, nombre, ciudad, anfitriones,
  brand_primary, brand_background, brand_accent,
  hero_titulo, hero_subtitulo,
  activo
) VALUES (
  'casas-lyb',
  'Casas LYB',
  'Costa del Sol',
  'Liz y Basi',
  '#15264E',
  '#F8F2E6',
  '#C8A064',
  'Bienvenidos a Casas LYB',
  'Toda la información que necesitas para tu estancia.',
  true
);

-- Secciones de Casas LYB
INSERT INTO links.sections (client_id, slug, titulo, icono, descripcion, contenido, orden)
VALUES
(
  (SELECT id FROM links.clients WHERE slug = 'casas-lyb'),
  'normativa',
  'Normativa de la vivienda',
  '📋',
  'Normas de uso y convivencia',
  E'# Normativa de la vivienda\n\nPor favor, ten en cuenta las siguientes normas durante tu estancia. Su cumplimiento garantiza una experiencia agradable para todos.\n\n## Normas generales\n\n- **Silencio** a partir de las 22:00h y hasta las 09:00h\n- Queda prohibido **fumar** en el interior del alojamiento\n- No se admiten **mascotas** sin autorización previa por escrito\n- El número máximo de huéspedes es el indicado en la reserva\n- Está prohibido organizar **fiestas o celebraciones** sin permiso expreso\n\n## Basura y reciclaje\n\n- La basura orgánica va en el **contenedor gris** al final de la calle\n- El vidrio en el **contenedor verde** de la esquina\n- Cartón y papel en el **contenedor azul**\n- Plásticos en el **contenedor amarillo**\n\n## Check-out\n\n- El check-out es antes de las **11:00h**\n- Por favor deja las llaves en el lugar indicado al llegar\n- Asegúrate de cerrar ventanas y apagar el aire acondicionado\n\nEn caso de cualquier duda, escríbenos por WhatsApp.',
  1
),
(
  (SELECT id FROM links.clients WHERE slug = 'casas-lyb'),
  'lugares',
  'Lugares de interés',
  '📍',
  'Qué visitar cerca de tu alojamiento',
  E'# Lugares de interés\n\nAquí tienes nuestras recomendaciones favoritas de la zona. ¡Pregúntanos cualquier cosa!\n\n## Cerca (a pie o muy próximo)\n\n- **Paseo marítimo** — ideal para el paseo de la tarde\n- **Playa** — a pocos minutos caminando\n- **Supermercado Mercadona** — el más cercano\n\n## A 15–20 minutos en coche\n\n- **Marbella centro** — casco antiguo, plaza de los naranjos y puerto\n- **Puerto Banús** — tiendas, restaurantes y ambiente nocturno\n- **Fuengirola** — paseo marítimo largo, mercado los martes\n\n## Excursiones (30–90 min)\n\n- **Ronda** (45 min) — imprescindible, el tajo y el puente nuevo\n- **Gibraltar** (60 min) — los monos, la roca y el duty free\n- **Nerja** (60 min) — cuevas de Nerja y balcón de Europa\n- **Granada** (90 min) — la Alhambra (¡reserva con antelación!)\n- **Caminito del Rey** (60 min) — senda espectacular por el desfiladero\n\n## Playas recomendadas\n\n- **Playa de La Víbora** — tranquila, ideal para familias\n- **Playa de Cabopino** — dunas, pinos y ambiente relajado\n- **Playa de Marbella** — chiringuitos y animación\n\n¿Quieres más info de algún sitio? Escríbenos 💬',
  2
),
(
  (SELECT id FROM links.clients WHERE slug = 'casas-lyb'),
  'resena',
  'Deja tu reseña',
  '⭐',
  'Tu opinión nos ayuda mucho',
  E'# Gracias por tu estancia\n\nEsperamos que hayas disfrutado de tu tiempo con nosotros.\n\nSi tu experiencia ha sido positiva, te agradeceríamos muchísimo que dejases una reseña — son muy importantes para que más viajeros puedan conocernos.\n\n¡Solo tarda 2 minutos y nos ayuda enormemente! 🙏',
  3
);

-- Links de la sección de reseña (Booking y Airbnb)
-- IMPORTANTE: actualiza las URLs reales desde el admin una vez tengas los listados activos
INSERT INTO links.links (section_id, titulo, url, descripcion, icono, orden)
VALUES
(
  (SELECT s.id FROM links.sections s JOIN links.clients c ON s.client_id = c.id WHERE c.slug = 'casas-lyb' AND s.slug = 'resena'),
  'Reseña en Booking',
  'https://www.booking.com',
  'Déjanos tu valoración en Booking.com',
  '🏨',
  1
),
(
  (SELECT s.id FROM links.sections s JOIN links.clients c ON s.client_id = c.id WHERE c.slug = 'casas-lyb' AND s.slug = 'resena'),
  'Reseña en Airbnb',
  'https://www.airbnb.com',
  'Comparte tu experiencia en Airbnb',
  '🏠',
  2
);
