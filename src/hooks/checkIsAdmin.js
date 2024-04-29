import jwt_decode from 'jwt-decode';

function checkIsAdmin() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return false;
    }

    const decoded = jwt_decode(accessToken);

    if (decoded.is_admin) {
        return true;
    }

    return false;
}

export default checkIsAdmin;

