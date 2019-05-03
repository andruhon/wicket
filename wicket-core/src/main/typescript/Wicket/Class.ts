export function create() {
    return <Class> <unknown> function () {
        this.initialize.apply(this, arguments);
    }
}

interface Class {

    initialize(Class, [any]): void;

}