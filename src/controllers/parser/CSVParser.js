export class CSVParser {
    static parse(content) {
        const rows = content.split('\r\n')
        let count = 0

        rows.forEach((row) => {
            if (row === '') {
                rows.splice(count, 1)
            }

            count += 1
        })
        rows.splice(0, 1)

        const csvData = []
        rows.forEach((element) => {
            const data = element.split(';')

            const final = {
                id: Number(data[0]),
                nombre: data[1],
                cantidad_disponible: Number(data[2])
            }

            csvData.push(final)
        })

        return csvData
    }
}