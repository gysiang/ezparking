import  getCarparks   from "../../helper";
import  allCarparks from '../../../carparks-all.json'
const { Result } = allCarparks;
const filteredList = getCarparks(Result);
export default filteredList;