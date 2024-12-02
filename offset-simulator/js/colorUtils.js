const ColorUtils = {
    cmykToRgb(c, m, y, k) {
        c = c/100;
        m = m/100;
        y = y/100;
        k = k/100;
        
        let r = Math.round(255 * (1-c) * (1-k));
        let g = Math.round(255 * (1-m) * (1-k));
        let b = Math.round(255 * (1-y) * (1-k));
        
        return `rgb(${r}, ${g}, ${b})`;
    },

    calculateAccuracy(target, current) {
        const diff = Math.sqrt(
            Math.pow(target.c - current.c, 2) +
            Math.pow(target.m - current.m, 2) +
            Math.pow(target.y - current.y, 2) +
            Math.pow(target.k - current.k, 2)
        ) / 2;
        return Math.max(0, Math.min(100, 100 - diff));
    }
};