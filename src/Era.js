export default class Era {
    constructor(name, nthYear) {
        this.name    = name;
        this.nthYear = nthYear;
    }

    getName() {
        return this.name;
    }

    getNthYear() {
        return this.nthYear;
    }

    format(format) {
        return format.replace(/:era/g, this.getName()).replace(/:nth/g, this.getNthYear());
    }

    toString() {
        return this.format(':era - :nth');
    }
}
