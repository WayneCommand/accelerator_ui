import req from '../../plugins/requests';

export default {
    loginByPassword(obj){
        return req.post("/login", obj);
    }
}