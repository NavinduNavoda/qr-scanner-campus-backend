export const rolesAsc = ["student", "demo", "lecturer"];
export const isAboveRole = (userRole, checkAbove) => {
    return rolesAsc.indexOf(userRole) >= rolesAsc.indexOf(checkAbove);
};
