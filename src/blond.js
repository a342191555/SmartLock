exports.pass= function (masterKey, time) {
    masterKey = masterKey.split('');
    time = time.split('');
    var a1 = new Array(4), a2 = new Array(8), a3 = new Array(8), a4 = new Array(8);

    for (var n = 0; n < 10; n += 1) {
        if (masterKey[n] >= 0) {
            masterKey[n] = parseInt(masterKey[n]);
        } else {
            masterKey[n] = 10;
        }
    }

    a4[0] = parseInt(time[0]);
    a4[1] = parseInt(time[1]);
    a4[2] = parseInt(time[2]);
    a4[3] = parseInt(time[3]);
    a4[4] = parseInt(masterKey[8]);
    a4[5] = parseInt(masterKey[9]);
    a4[6] = 0;
    a4[7] = 1;

    for (var n = 0; n < 8; n++) {
        a3[n] = masterKey[n] + a4[n];
    }

    for (var n = 0; n < 8; n++) {
        a2[n] = parseInt(time[n + 4]);
    }

    var l1 = 0;
    for (var n = 0; n < 8; n++) {
        var l2 = 1;
        for (var m = 0; m < 7 - n; m++) {
            l2 *= 10;
        }
        l1 += a4[n] * l2;
    }

    var l2 = 0;
    for (var n = 0; n < 8; n++) {
        var l3 = 1;
        for (var m = 0; m < 7 - n; m++) {
            l3 *= 10;
        }
        l2 += a2[n] * l3;
    }

    a3[0] += a3[4];
    a3[1] += a3[5];
    a3[2] += a3[6];
    a3[3] += a3[7];

    a2[0] += a2[4] + a3[0];
    a2[1] += a2[5] + a3[1];
    a2[2] += a2[6] + a3[2];
    a2[3] += a2[7] + a3[3];

    a1[0] = a2[0];
    a1[1] = a2[1];
    a1[2] = a2[2];
    a1[3] = a2[3];

    var i1 = a1[1] ^ a1[2] ^ a1[3];
    var i2 = a1[0] ^ a1[2] ^ a1[3];
    var i3 = a1[0] ^ a1[1] ^ a1[3];
    var i4 = a1[0] ^ a1[1] ^ a1[2];
    i1 = a1[0] ^ a1[1] ^ i1;
    i2 = a1[1] ^ a1[2] ^ i2;
    i3 = a1[2] ^ a1[3] ^ i3;
    i4 = a1[0] ^ a1[3] ^ i4;
    i1 = a1[0] ^ a1[2] ^ i1;
    i2 = a1[1] ^ a1[3] ^ i2;
    i3 = a1[0] ^ a1[2] ^ i3;
    i4 = a1[1] ^ a1[3] ^ i4;
    a1[0] = a1[0] ^ (a1[1] ^ a1[2] ^ a1[3]);
    var i = a1[0] ^ i1;
    var j = a1[0] ^ i2;
    var k = a1[0] ^ i3;
    var m = a1[0] ^ i4;
    a1[0] = i;
    a1[1] = j;
    a1[2] = k;
    a1[3] = m;
    a3[0] += a1[0] * a2[0] + a2[4] & 0xFF;
    a3[1] += a1[1] * a2[1] + a2[5] & 0xFF;
    a3[2] += a1[2] * a2[1] + a2[6] & 0xFF;
    a3[3] += a1[3] * a2[3] + a2[7] & 0xFF;
    a3[0] = a3[0] & 0xFF;
    a3[1] = a3[1] & 0xFF;
    a3[2] = a3[2] & 0xFF;
    a3[3] = a3[3] & 0xFF;
    a4[0] += a3[0] * a2[3] + a2[0] & 0xFF;
    a4[1] += a3[1] * a4[0] + a2[1] & 0xFF;
    a4[2] += a3[2] * a4[1] + a2[2] & 0xFF;
    a4[3] += a3[3] * a4[2] + a2[3] & 0xFF;
    a4[0] = a4[0] & 0xFF;
    a4[1] = a4[1] & 0xFF;
    a4[2] = a4[2] & 0xFF;
    a4[3] = a4[3] & 0xFF;
    l1 = (((a4[0] << 8 & 0xFFFFFFFF) + a4[1] << 8 & 0xFFFFFFFF) + a4[2] << 8 & 0xFFFFFFFF) + a4[3] + l2 + l1 & 0x4FFFFFF;
    l1 = l1 + "";

    return new Array(8 - l1.length + 1).join("0") + l1;
};