import req from '../../plugins/requests';

export default {
    mySafety(obj){
        return req.get("/user/my_safety", obj);
    },
    verifyPassword(obj) {
        return req.post("/user/verify_password", obj)
    },
    changePassword(obj) {
        return req.post("/user/change_password", obj)
    },
    verifyRecoveryEmail(obj){
        return req.post("/user/verify_recovery_email", obj);
    },
    updateRecoveryEmail(obj){
        return req.post("/user/update_recovery_email", obj);
    },
    updateRecoveryPhone(obj){
        return req.post("/user/update_recovery_phone", obj);
    },
    devices(obj){
        return req.get("/device/devices", obj);
    },
    deleteDevice(obj){
        return req.post("/device/delete/" + obj.deviceId, obj);
    },
    updateDeviceName(obj){
        return req.post("/device/update/name", obj);
    }

}