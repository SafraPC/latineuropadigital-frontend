//Will export consts with mock data.
export const ActivityBrench = [
  "Administración de empresas",
  "Abogados",
  "Asesoría de empresas",
  "Asesor Financiero",
  "Atención a clientes",
  "Arquitectura e Design de Interiores ",
  "Agricultura",
  "Audio – Edición & Producción ",
  "Calidad, producción ",
  "Comercial y ventas",
  "Consultoría",
  "Contabilidad",
  "Design & Creación",
  "Educación y formación",
  "Finanzas y banca",
  "Fotografía & Video ",
  "Idiomas",
  "Informática y telecomunicaciones",
  "Ingenieros y técnicos",
  "Inmobiliario y construcción",
  "Recursos humanos",
  "Sector Farmacéutico",
  "Salud & Fitness",
  "Vendas & Marketing",
  "Web, Móvil & Software",
];

//Transform
export const ActivityObject = [];
ActivityBrench.forEach((item)=>{
    ActivityObject.push({label:item,value:item});
  });
