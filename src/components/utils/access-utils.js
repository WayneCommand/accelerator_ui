import Fingerprint2 from "fingerprintjs2";

const { detect } = require('detect-browser');
const publicIp = require('public-ip');
const ipLocation = require("iplocation");
const jwt_decode = require('jwt-decode');

export const info = async () => {
    let browser = detect();
    let v4 = await publicIp.v4({
        onlyHttps: true
    });
    let location = await ipLocation(v4);

    return {
        browser: {
            name: browser.name,
            system: browser.os,
            type: browser.type,
            version: browser.version
        },
        ip: v4,
        location: {
            country: location.country.name,
            region: location.region.name,
            city: location.city
        }
    };
}

export const deviceId = async () => {
    return await Fingerprint2.getPromise({}).then(components => {
        let values = components.map(component => component.value)
        return Fingerprint2.x64hash128(values.join(''), 31)
    });
}

export const saveLogin = token => {
    let decode = jwt_decode(token);

    localStorage.setItem("token", token);
    localStorage.setItem("expireTime", Number.parseInt(decode.exp) * 1000);
}

export const getTokenInfo = () => {
    let token = localStorage.getItem("token");
    let expireTime = Number.parseInt(localStorage.getItem("expireTime"));
    return {
        token,
        expireTime
    }
}