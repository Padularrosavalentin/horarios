document.getElementById('convertirBtn').addEventListener('click', () => {
    const textoInput = document.getElementById('fechaTextoInput').value.trim();

    if (!textoInput) {
        alert('Por favor, ingresa un texto con la fecha y hora.');
        return;
    }

    const meses = {
        enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
        julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12'
    };

    try {
        const textoMin = textoInput.toLowerCase();
        const regex = /(\d{1,2})\s+de\s+([a-zñáéíóú]+)\s+de\s+(\d{4})\s+(?:a\s+las\s+)?(\d{1,2}):(\d{2})/;
        const coincidencias = textoMin.match(regex);

        if (!coincidencias) {
            alert('escribi algo asi:\n"18 de junio de 2026 a las 18:05 horas"');
            return;
        }

        const dia = coincidencias[1].padStart(2, '0');
        const nombreMes = coincidencias[2];
        const anio = coincidencias[3];
        const hora = coincidencias[4].padStart(2, '0');
        const minuto = coincidencias[5];

        const numeroMes = meses[nombreMes];
        if (!numeroMes) {
            alert(`El mes "${nombreMes}" no es válido. Escríbelo completo en español.`);
            return;
        }

        const isoString = `${anio}-${numeroMes}-${dia}T${hora}:${minuto}:00[America/Argentina/Buenos_Aires]`;
        const fechaAr = Temporal.ZonedDateTime.from(isoString);

        const fechaMadrid = fechaAr.withTimeZone('Europe/Madrid');
        const fechaNY = fechaAr.withTimeZone('America/New_York');
        const fechaShanghai = fechaAr.withTimeZone('Asia/Shanghai');

        const formatearFecha = (zonedDateTime) => {
            const d = String(zonedDateTime.day).padStart(2, '0');
            const m = String(zonedDateTime.month).padStart(2, '0');
            const a = zonedDateTime.year;
            const h = String(zonedDateTime.hour).padStart(2, '0');
            const min = String(zonedDateTime.minute).padStart(2, '0');
            return `${d}/${m}/${a} - ${h}:${min} hs`;
        };

        document.getElementById('resMadrid').textContent = formatearFecha(fechaMadrid);
        document.getElementById('resNY').textContent = formatearFecha(fechaNY);
        document.getElementById('resShanghai').textContent = formatearFecha(fechaShanghai);

        document.getElementById('resultadosContainer').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Hubo un error al procesar el texto con la API Temporal.');
    }
});