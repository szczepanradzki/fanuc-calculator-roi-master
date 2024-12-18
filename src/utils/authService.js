import { BehaviorSubject } from "rxjs";
import { LoginUser } from "../graphql/mutations/login";
import { client } from "../graphql/client";

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem("currentUser")));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    }
};

function login(username, password) {
    return client.mutate({
        mutation: LoginUser,
        variables: {
            identifier: username,
            password: password
        }
    }).then(resp => {
        sessionStorage.setItem("currentUser", JSON.stringify(resp.data.login));
        currentUserSubject.next(resp.data.login);
        return true;
    }).catch(err => {
        let message = JSON.stringify(err);
        message = JSON.parse(message);
        alert(message.graphQLErrors[0].extensions.exception.data.message[0].messages[0].message);
    });
}

function logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("customer");
    currentUserSubject.next(null);
    return true;
}
