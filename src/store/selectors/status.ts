import { PlaceDimension } from "../../sdk/models";
import { AppState } from "../reducers";

export const getPlaceDimension = (state: AppState): PlaceDimension => state.status.placeDimension;
