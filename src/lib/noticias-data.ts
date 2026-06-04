/** Datos mock de noticias — fuente única para listado y artículos interiores */

export interface Noticia {
  id: number
  slug: string
  category: string
  categoryColor: string
  date: string
  title: string
  excerpt: string
  imageUrl: string
  readTime: string
  author: string
  authorRole: string
  content: string
}

export const noticias: Noticia[] = [
  {
    id: 1,
    slug: 'sistema-quirurgico-da-vinci-xi',
    category: 'Tecnología',
    categoryColor: 'text-primary bg-primary/10 border-primary/20',
    date: '18 May, 2026',
    title: 'Aura Medical integra el sistema quirúrgico Da Vinci Xi',
    excerpt: 'Nuestra unidad de cirugía robótica incorpora la última generación del sistema Da Vinci, permitiendo intervenciones con una precisión submilimétrica y tiempos de recuperación hasta un 60% menores.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    readTime: '3 min',
    author: 'Dr. Marcos Torres',
    authorRole: 'Jefe de Cirugía Robótica',
    content: `
Aura Medical da un paso decisivo en la transformación de la cirugía mínimamente invasiva en México con la incorporación del sistema quirúrgico **Da Vinci Xi** a nuestra Unidad de Cirugía Robótica. Este equipo, considerado el estándar de oro mundial en robótica quirúrgica, redefine los límites de la precisión clínica y abre nuevas posibilidades para nuestros pacientes.

## ¿Qué es el sistema Da Vinci Xi?

El Da Vinci Xi es la cuarta generación del sistema quirúrgico Da Vinci, desarrollado por Intuitive Surgical. A diferencia de sus predecesores, el modelo Xi cuenta con brazos más delgados y de mayor alcance, una cámara de alta definición en 3D con visión aumentada, y un sistema de posicionamiento más ágil que permite al cirujano abordar múltiples cuadrantes del cuerpo sin necesidad de reposicionar al paciente.

## Ventajas para el paciente

Las intervenciones realizadas con Da Vinci Xi presentan beneficios comprobados frente a la cirugía abierta convencional:

- **Incisiones mínimas**: Las herramientas robóticas operan a través de pequeñas incisiones de 8 mm, reduciendo drásticamente el trauma tisular.
- **Recuperación acelerada**: Los tiempos de hospitalización se reducen hasta un 60%, permitiendo que los pacientes retomen su vida cotidiana en días, no semanas.
- **Menor dolor postoperatorio**: La precisión del sistema minimiza el daño a tejidos circundantes, lo que se traduce en una menor necesidad de analgésicos.
- **Menor riesgo de infección**: Las incisiones reducidas disminuyen significativamente la exposición a agentes patógenos.

## Especialidades beneficiadas

El Da Vinci Xi amplía las capacidades de nuestros especialistas en múltiples áreas:

**Oncología**: Prostatectomía radical, nefrectomía parcial, resección de tumores abdominales y pélvicos con márgenes quirúrgicos más precisos.

**Ginecología**: Histerectomía, miomectomía y cirugía de endometriosis con preservación de la función reproductiva.

**Cirugía General**: Colecistectomía, hernioplastia y cirugía colorrectal con mínima invasión.

**Urología**: Tratamiento de cálculos renales complejos, reconstrucción de vías urinarias y cirugía de incontinencia.

## Un equipo preparado

La integración del Da Vinci Xi no se limita a la adquisición del equipo. Nuestro equipo de cirujanos ha completado un programa de certificación internacional de 18 meses que incluye entrenamiento en simuladores, observación quirúrgica con expertos mundiales y supervisión en las primeras intervenciones reales.

"La robótica no reemplaza al cirujano; potencia sus capacidades. Con Da Vinci Xi, mis manos tienen la estabilidad y la amplificación necesarias para intervenir en espacios donde antes era imposible llegar con tanta precisión", comentó el Dr. Marcos Torres, Jefe de Cirugía Robótica de Aura Medical.

## Disponibilidad

El sistema Da Vinci Xi ya está operativo en nuestro Quirófano Robótico de última generación. Los pacientes que requieran una evaluación para cirugía mínimamente invasiva pueden solicitar una consulta con nuestro equipo de cirujanos robóticos a través del módulo de Agendar Cita.
    `.trim(),
  },
  {
    id: 2,
    slug: 'dr-vargas-fellow-sociedad-americana-corazon',
    category: 'Especialistas',
    categoryColor: 'text-secondary bg-secondary/10 border-secondary/20',
    date: '05 May, 2026',
    title: 'Dr. Vargas recibe la certificación Fellow de la Sociedad Americana del Corazón',
    excerpt: 'El Dr. Alejandro Vargas, jefe de nuestro Instituto del Corazón, fue reconocido por la AHA como Fellow por sus contribuciones a la cardiología intervencionista y su trayectoria clínica de excelencia.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop',
    readTime: '2 min',
    author: 'Comunicación Institucional',
    authorRole: 'Aura Medical',
    content: `
El Instituto del Corazón de Aura Medical celebra un reconocimiento de talla internacional: el **Dr. Alejandro Vargas**, cardiólogo intervencionista y jefe del instituto, ha sido designado **Fellow of the American Heart Association (FAHA)**, una distinción que lo coloca entre los profesionales de cardiología más reconocidos del continente americano.

## ¿Qué significa ser Fellow de la AHA?

La designación FAHA es otorgada por la Asociación Americana del Corazón a profesionales de la salud cardiovascular que han demostrado un compromiso sostenido con la excelencia clínica, la investigación científica y la educación médica. Menos del 3% de los cardiólogos en ejercicio en Latinoamérica ostentan esta distinción.

Para recibir la designación, los candidatos son evaluados por un comité científico que analiza su producción académica, su contribución a la formación de nuevos especialistas y el impacto de su práctica clínica en la comunidad médica.

## Trayectoria del Dr. Vargas

El Dr. Alejandro Vargas cuenta con más de 18 años de experiencia en cardiología clínica e intervencionista. Realizó su formación de postgrado en el Hospital de la Universidad de Texas y completó una subespecialización en intervencionismo coronario complejo en el Instituto Nacional de Cardiología de México.

En Aura Medical, el Dr. Vargas lidera un equipo de 12 cardiólogos y ha supervisado más de 2,400 procedimientos de hemodinamia, incluyendo angioplastias complejas, implante de válvulas aórticas por catéter (TAVI) y cierre percutáneo de comunicaciones interauriculares.

## Contribuciones a la investigación

El Dr. Vargas es coautor de 23 publicaciones en revistas científicas indexadas, entre ellas el **Journal of the American College of Cardiology** y **Circulation**. Su línea de investigación se enfoca en la detección precoz de cardiopatías isquémicas mediante biomarcadores de nueva generación y en el uso de inteligencia artificial para el análisis de electrocardiogramas.

"Este reconocimiento pertenece a todo el equipo del Instituto del Corazón. Sin el apoyo de mis colegas, enfermeras y técnicos, ningún logro individual sería posible. Lo que más me enorgullece no es la distinción, sino los pacientes que han podido volver a casa con sus familias", expresó el Dr. Vargas al recibir la noticia.

## Para nuestros pacientes

Si usted o un familiar requiere evaluación cardiológica, el equipo del Instituto del Corazón de Aura Medical ofrece consultas de primera vez y estudios de diagnóstico no invasivo. Agenda tu cita directamente desde nuestra plataforma.
    `.trim(),
  },
  {
    id: 3,
    slug: 'apertura-unidad-medicina-preventiva',
    category: 'Institucional',
    categoryColor: 'text-tertiary bg-tertiary/10 border-tertiary/20',
    date: '22 Abr, 2026',
    title: 'Apertura de la nueva Unidad de Medicina Preventiva y Bienestar',
    excerpt: 'Inauguramos un espacio dedicado a la detección temprana y la salud integral, con programas de check-up ejecutivo, pruebas genómicas y asesoría nutricional personalizada bajo techo.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    readTime: '4 min',
    author: 'Dra. Sofía Valerio',
    authorRole: 'Directora de Medicina Preventiva',
    content: `
Aura Medical abre las puertas de su nueva **Unidad de Medicina Preventiva y Bienestar**, un espacio diseñado con una filosofía distinta: atender al paciente antes de que la enfermedad aparezca, no después. Esta unidad representa nuestra apuesta más ambiciosa por transformar el modelo de atención médica en México, pasando de un enfoque reactivo a uno proactivo y personalizado.

## Un espacio diseñado para la salud integral

La Unidad de Medicina Preventiva y Bienestar ocupa 1,200 m² distribuidos en un ambiente pensado para la comodidad y la privacidad. El espacio incluye consultorios de evaluación integral, sala de pruebas de esfuerzo cardiovascular, laboratorio de análisis genómicos, área de composición corporal avanzada y suite de asesoría nutricional.

Cada rincón del espacio fue diseñado para reducir la ansiedad clínica: iluminación natural, acabados cálidos y un flujo de atención donde el paciente siempre conoce su siguiente paso.

## Programas disponibles desde el primer día

### Check-up Ejecutivo Básico
Evaluación de 4 horas que incluye biometría hemática completa, química sanguínea de 30 elementos, perfil tiroideo, electrocardiograma en reposo, espirometría, evaluación oftalmológica y asesoría con médico internista. Ideal para adultos de 30 a 50 años sin factores de riesgo conocidos.

### Check-up Ejecutivo Premium
Evaluación de 8 horas que amplía el panel básico con tomografía computada de coronarias (Score de calcio), colonoscopia virtual, marcadores tumorales seleccionados, evaluación neurológica cognitiva y consulta con nutriólogo clínico. Diseñado para ejecutivos y pacientes con historia familiar de enfermedades crónicas.

### Perfil Genómico Preventivo
Análisis del ADN del paciente para identificar predisposición genética a más de 80 condiciones de salud, incluyendo ciertos tipos de cáncer, enfermedades cardiovasculares, diabetes tipo 2 y trastornos del metabolismo. El reporte incluye una sesión de asesoramiento genético con nuestro especialista certificado.

### Programa de Bienestar Ejecutivo Continuo
Para quienes desean un acompañamiento preventivo a lo largo del año: evaluaciones trimestrales, acceso prioritario a especialistas, monitoreo de biomarcadores clave y ajuste del plan de bienestar según los resultados.

## El equipo que lo hace posible

La Dra. Sofía Valerio, Directora de la unidad y especialista en Medicina Interna con subespecialización en Medicina del Estilo de Vida, encabeza un equipo multidisciplinario que incluye cardiólogos, endocrinólogos, genetistas, nutriólogos clínicos y psicólogos de la salud.

"La mejor enfermedad es la que nunca ocurre. La medicina preventiva no es un lujo; es la inversión de mayor retorno que una persona puede hacer por su calidad de vida", afirma la Dra. Valerio.

## Cómo acceder

Los programas de la Unidad de Medicina Preventiva y Bienestar están disponibles tanto para miembros del Aura Premium Club como para pacientes particulares. Para reservar un check-up, contacta a nuestro equipo de coordinación médica o agenda directamente a través de nuestra plataforma.
    `.trim(),
  },
]

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug)
}
