export type RoleType = "student" | "demo" | "lecturer";
export const rolesAsc = ["student", "demo", "lecturer"];

export const isAboveRole = (userRole: RoleType, checkAbove: RoleType) => {
    return rolesAsc.indexOf(userRole) >= rolesAsc.indexOf(checkAbove);
}


