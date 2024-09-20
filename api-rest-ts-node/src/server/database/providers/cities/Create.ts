//  interface from database/models
import { ICity } from "../../models";

export const create = async (
    city: Omit<ICity, "id">
): Promise<number | Error> => {
    return 1;
    return Error("");
};

// https://www.youtube.com/watch?v=m3O3VF_VVpw&list=PL29TaWXah3iaaXDFPgTHiFMBF6wQahurP&index=25
// 5:00 but restart the video
