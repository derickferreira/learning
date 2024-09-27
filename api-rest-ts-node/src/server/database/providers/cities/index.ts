import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./getById";
import * as updateById from "./updateById";
import * as deleteById from "./deleteById";

export const CitiesProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
};
