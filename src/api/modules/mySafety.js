import req from '../../plugins/requests';

export default {
    mySafety(obj){
        return req.get("/user/my_safety", obj);
    }
}