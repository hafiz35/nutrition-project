import { User, RoleName } from '../models/user.model';


export function dashboardUrl(user: User) {
    const redirectUrl = [];
    switch (user.role) {
        case RoleName.ROLE_USER:
            redirectUrl.push('user-dashboard');
            break;
        case RoleName.ROLE_ADMIN:
            redirectUrl.push('admin-dashboard');
            break;
        default:
            return;
    }
    return redirectUrl;
}
