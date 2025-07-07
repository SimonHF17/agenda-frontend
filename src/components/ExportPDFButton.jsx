import jsPDF from 'jspdf';

const PrinterIcon = () => (
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 text-green-700 shadow transition mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <rect x="6" y="9" width="12" height="7" rx="2" fill="#34d399" stroke="#047857" strokeWidth="1.5"/>
      <rect x="8" y="16" width="8" height="3" rx="1" fill="#d1fae5" stroke="#047857" strokeWidth="1.2"/>
      <rect x="7" y="4" width="10" height="5" rx="1" fill="#fff" stroke="#047857" strokeWidth="1.5"/>
      <circle cx="17" cy="12" r="1" fill="#047857" />
    </svg>
  </span>
);

const ExportPDFButton = ({ contacts }) => {
  const handleExportPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Configuraciones de página
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 12;
    const columnWidth = (pageWidth - (margin * 4)) / 3;
    const columnSpacing = margin;
    
    // Posiciones de las columnas
    const columnas = [
      { x: margin, width: columnWidth },
      { x: margin + columnWidth + columnSpacing, width: columnWidth },
      { x: margin + (columnWidth + columnSpacing) * 2, width: columnWidth }
    ];
    
    // Título principal
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Agenda Telefónica', pageWidth / 2, 18, { align: 'center' });
    
    // Fecha
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, pageWidth / 2, 26, { align: 'center' });
    
    // Línea separadora
    pdf.setLineWidth(0.3);
    pdf.line(margin, 32, pageWidth - margin, 32);
    
    // Remover duplicados y agrupar por departamento
    const contactosUnicos = contacts.reduce((acc, contacto) => {
      const key = `${contacto.nombre}-${contacto.apellido}-${contacto.extension}`;
      if (!acc.find(c => `${c.nombre}-${c.apellido}-${c.extension}` === key)) {
        acc.push(contacto);
      }
      return acc;
    }, []);
    
    const contactosPorDepartamento = contactosUnicos.reduce((acc, contacto) => {
      const dept = contacto.departamento || 'Sin Departamento';
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(contacto);
      return acc;
    }, {});
    
    // Ordenar departamentos y contactos
    const departamentosOrdenados = Object.keys(contactosPorDepartamento)
      .sort()
      .map(dept => ({
        nombre: dept,
        contactos: contactosPorDepartamento[dept].sort((a, b) => 
          `${a.nombre} ${a.apellido}`.localeCompare(`${b.nombre} ${b.apellido}`)
        )
      }));
    
    // Calcular altura necesaria por departamento
    const calcularAlturaDepartamento = (departamento) => {
      const alturaHeader = 10;
      const alturaContacto = 6;
      const espacioExtra = 6;
      return alturaHeader + (departamento.contactos.length * alturaContacto) + espacioExtra;
    };
    
    // Distribuir departamentos en 3 columnas de manera más equilibrada
    const distribuirEnColumnas = () => {
      const columnasDistribucion = [[], [], []];
      const alturasColumnas = [0, 0, 0];
      
      // Crear array con departamentos y sus tamaños
      const departamentosConTamaño = departamentosOrdenados.map(dept => ({
        ...dept,
        altura: calcularAlturaDepartamento(dept)
      }));
      
      // Ordenar por tamaño (más grandes primero) para mejor distribución
      departamentosConTamaño.sort((a, b) => b.altura - a.altura);
      
      // Distribuir usando algoritmo greedy mejorado
      departamentosConTamaño.forEach(departamento => {
        // Encontrar la columna con menor altura
        const indiceMenorAltura = alturasColumnas.indexOf(Math.min(...alturasColumnas));
        
        columnasDistribucion[indiceMenorAltura].push(departamento);
        alturasColumnas[indiceMenorAltura] += departamento.altura;
      });
      
      return columnasDistribucion;
    };
    
    const columnasDistribuidas = distribuirEnColumnas();
    const startY = 38;
    const maxColumnHeight = pageHeight - startY - 25;
    
    // Función para dibujar viñeta circular (solucionando problema de codificación)
    const dibujarVinetaCircular = (x, y) => {
      pdf.setFillColor(0, 0, 0);
      pdf.circle(x, y, 1.5, 'F');
    };
    
    // Función para dibujar viñeta de flecha
    const dibujarVinetaFlecha = (x, y) => {
      pdf.setFillColor(0, 0, 0);
      // Dibujar triángulo como flecha
      pdf.triangle(x, y - 1, x + 2, y, x, y + 1, 'F');
    };
    
    // Dibujar cada columna
    columnasDistribuidas.forEach((departamentosEnColumna, colIndex) => {
      if (departamentosEnColumna.length === 0) return;
      
      let currentY = startY;
      const colX = columnas[colIndex].x;
      const colWidth = columnas[colIndex].width;
      
      departamentosEnColumna.forEach((departamento) => {
        // Verificar si necesitamos nueva página
        if (currentY + departamento.altura > maxColumnHeight) {
          return; // Saltar a siguiente página (implementar si es necesario)
        }
        
        // Calcular altura real del departamento
        const alturaReal = departamento.altura - 2;
        
        // Dibujar borde del departamento
        pdf.setDrawColor(100, 100, 100);
        pdf.setLineWidth(0.5);
        pdf.rect(colX, currentY, colWidth, alturaReal);
        
        // Header del departamento con fondo gris
        pdf.setFillColor(245, 245, 245);
        pdf.rect(colX, currentY, colWidth, 8, 'F');
        
        // Línea separadora del header
        pdf.setDrawColor(150, 150, 150);
        pdf.setLineWidth(0.3);
        pdf.line(colX, currentY + 8, colX + colWidth, currentY + 8);
        
        // Viñeta circular para departamento
        dibujarVinetaCircular(colX + 4, currentY + 4.5);
        
        // Nombre del departamento
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        
        // Ajustar nombre del departamento al ancho disponible
        let nombreDept = departamento.nombre;
        const maxWidthDept = colWidth - 12;
        
        while (pdf.getTextWidth(nombreDept) > maxWidthDept && nombreDept.length > 3) {
          nombreDept = nombreDept.slice(0, -4) + '...';
        }
        
        pdf.text(nombreDept, colX + 7, currentY + 5.5);
        
        // Contactos
        let contactoY = currentY + 14;
        
        departamento.contactos.forEach(contacto => {
          // Viñeta de flecha para contactos
          dibujarVinetaFlecha(colX + 4, contactoY - 1);
          
          // Preparar texto del contacto
          const nombreCompleto = `${contacto.nombre} ${contacto.apellido}`;
          const extension = contacto.extension || 'N/A';
          let textoContacto = `${nombreCompleto} - ${extension}`;
          
          // Ajustar texto al ancho de la columna
          const maxWidthContacto = colWidth - 12;
          
          // Si el texto es muy largo, priorizar nombre y extensión
          if (pdf.getTextWidth(textoContacto) > maxWidthContacto) {
            // Intentar solo con nombre y extensión
            textoContacto = `${nombreCompleto.split(' ')[0]} ${nombreCompleto.split(' ')[1] || ''} - ${extension}`;
            
            // Si aún es muy largo, truncar el nombre
            while (pdf.getTextWidth(textoContacto) > maxWidthContacto && textoContacto.length > 10) {
              const partes = textoContacto.split(' - ');
              const nombre = partes[0];
              const ext = partes[1];
              
              if (nombre.length > 8) {
                const nombreTruncado = nombre.slice(0, -4) + '...';
                textoContacto = `${nombreTruncado} - ${ext}`;
              } else {
                break;
              }
            }
          }
          
          // Escribir el contacto
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8);
          pdf.text(textoContacto, colX + 8, contactoY);
          
          contactoY += 6;
        });
        
        currentY += alturaReal + 3; // Espacio entre departamentos
      });
    });
    
    // Pie de página con estadísticas
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `Total de contactos: ${contactosUnicos.length} | Departamentos: ${departamentosOrdenados.length}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
    
    // Descargar PDF
    pdf.save(`agenda-columnas-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <button
      onClick={handleExportPDF}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      title="Exportar a PDF (3 Columnas)"
    >
      <PrinterIcon />
      <span className="hidden sm:inline">Exportar PDF</span>
    </button>
  );
};

export default ExportPDFButton;