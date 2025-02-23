import { AxiosInstance } from 'axios';
// @ts-ignore
import ziggyRoute from 'ziggy-js';

declare global {
    var axios: AxiosInstance;

    var route: typeof ziggyRoute;
}
