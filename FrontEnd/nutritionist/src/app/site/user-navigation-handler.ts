import { User, RoleName } from '../models/user.model';


export function dashboardUrl(user: User) {
    const redirectUrl = [];
    switch (user.role) {
        case RoleName.ROLE_USER:
            redirectUrl.push('menu');
            break;
        default:
            return;
    }
    return redirectUrl;
}
