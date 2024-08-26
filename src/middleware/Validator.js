export class Validator {
    static correo (correo) {
        if (typeof correo != 'string') throw new Error('Correo must be a String.')
        if (correo.search('@') < 0) throw new Error('The "@" is missing.')
    }

    static password (pass) {
        if (typeof pass != 'string') throw new Error('Password must be a String.')
        if (pass.length < 8) throw new Error('The password must be at least 8 characters long')
    }
}