import { authenticationService } from "./authService";

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if(currentUser && currentUser.jwt) {
        return {Authorization: `Bearer ${currentUser.jwt}`};
    } else {
        return {};
    }
}
