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