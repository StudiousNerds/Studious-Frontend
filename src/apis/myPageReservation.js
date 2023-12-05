import { GET } from './api';

export const getMyPageReservation = async ({ token }) => {
    const { data } = await GET(
        '/reservations',
        token
    );
    return data;
}
