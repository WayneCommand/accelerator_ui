const { detect } = require('detect-browser');
const publicIp = require('public-ip');
const ipLocation = require("iplocation");

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
            country: location.country.code,
            city: location.region.code
        }
    };
}