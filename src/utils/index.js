export function isLoggedIn() {
    return !!localStorage.getItem('roles')
}
export function isArrayWithLength(arr) {
    return (Array.isArray(arr) && arr.length)
}
export function getAllowedRoutes(routes) {
    function intersect(a, b) {
        return a.filter(Set.prototype.has, new Set(b));
    }
    const roles = []
    roles.push(localStorage.getItem('roles'));
    return routes.filter(({ permission }) => {
        if (!permission) return true;
        else if (!isArrayWithLength(permission)) return true;
        else return intersect(permission, roles).length;
    });
}
export function isValidEmail(email) {
    let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)//eslint-disable-line
    return validEmailRegex.test(email)
}
export function isValidPhone(phone) {
    var reValidPhone = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
    return reValidPhone.test(phone);
}
export function isValidDate(date) {
    var reValidDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    return reValidDate.test(date);
}
export function isEmptyObject(object) {
    return Object.values(object).filter(value => value === "").length > 0
}
