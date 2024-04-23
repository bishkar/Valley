import jwt_decode from 'jwt-decode';

export default function checkAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return false;
    }

    const decoded = jwt_decode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        return false;
    }

    return true;
}